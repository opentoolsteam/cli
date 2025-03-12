import {Args, Command, Flags} from '@oclif/core'
import * as fs from 'node:fs/promises'
import * as os from 'node:os'
import * as path from 'node:path'

import { servers } from '../data/servers/index.js'
interface MCPServerTransport {
  transport: {
    args: string[];
    command: string;
    env?: Record<string, string>;
    type?: string;
  };
}
export default class Uninstall extends Command {
  static aliases = ['un']

  static override args = {
    firstServer: Args.string({
      description: 'name of the MCP server to uninstall',
      required: true,
    }),
  }  // Allow variable length arguments

  static completion: (options: { argv: string[] }) => Promise<string[]> = async ({ argv }) => {
    const input = argv.at(-1) || ''

    try {
      const claudeConfigPath = path.join(
        os.homedir(),
        'Library',
        'Application Support',
        'Claude',
        'claude_desktop_config.json'
      )
      const continueConfigPath = path.join(
        os.homedir(),
        '.continue',
        'config.json'
      )

      const installedServers = new Set<string>()

      try {
        const claudeConfig = JSON.parse(await fs.readFile(claudeConfigPath, 'utf8'))
        if (claudeConfig.mcpServers) {
          for (const id of Object.keys(claudeConfig.mcpServers)
            .filter(id => claudeConfig.mcpServers[id].status !== 'unknown')) {
            installedServers.add(id)
          }
        }
      } catch {
        // Ignore errors reading Claude config
      }

      try {
        const continueConfig = JSON.parse(await fs.readFile(continueConfigPath, 'utf8'))
        if (continueConfig.experimental?.modelContextProtocolServers) {
          for (const s of continueConfig.experimental.modelContextProtocolServers) {
            const server = servers.find(srv =>
              s.transport.command === srv.config.command &&
              JSON.stringify(s.transport.args.slice(0, srv.config.args.length)) === JSON.stringify(srv.config.args)
            )
            if (server) {
              installedServers.add(server.id)
            }
          }
        }
      } catch {
        // Ignore errors reading Continue config
      }

      const matches = [...installedServers].filter(id =>
        id.toLowerCase().startsWith(input.toLowerCase())
      )

      return matches
    } catch {
      return []
    }
  }

  static override description = 'Uninstall one or more MCP servers'

  static override examples = [
    '<%= config.bin %> <%= command.id %> server-name',
    '<%= config.bin %> <%= command.id %> server-name1 server-name2 --client claude',
  ]

  static override flags = {
    client: Flags.string({
      char: 'c',
      default: 'claude',
      description: 'Uninstall the MCP servers from this client',
      options: ['claude', 'continue'],
    }),
  }

  static override strict = false

  public async run(): Promise<void> {
    const {argv, flags} = await this.parse(Uninstall)
    const serverNames = argv as string[]

    const {platform} = process

    if (platform !== 'darwin' && platform !== 'win32') {
      this.error('This command is only supported on macOS and Windows')
      return
    }

    // First validate all server IDs exist in our known servers list
    const invalidServer = serverNames.find(serverName => !servers.some(server => server.id === serverName))
    if (invalidServer) {
      this.error(`Server "${invalidServer}" is not a valid server ID`)
      return
    }

    // Then check if any servers are in an unknown state
    if (flags.client === 'claude') {
      try {
        const configPath = path.join(
          os.homedir(),
          'Library',
          'Application Support',
          'Claude',
          'claude_desktop_config.json'
        )
        const configContent = await fs.readFile(configPath, 'utf8')
        const config = JSON.parse(configContent) as { mcpServers?: Record<string, { status?: string }> }

        // Process all servers at once to avoid await in loop
        const unknownServer = serverNames.find(serverName =>
          config.mcpServers?.[serverName]?.status === 'unknown'
        )

        if (unknownServer) {
          this.error(`Cannot uninstall "${unknownServer}" because it is in an unknown state. Please try reinstalling it first.`)
          return
        }
      } catch {
        // If we can't read the config, we'll let the actual uninstall handle the error
      }
    }

    this.log(`Platform: ${platform === 'darwin' ? 'macOS' : 'Windows'}`)
    this.log(`Client: ${flags.client}`)

    // Process servers sequentially
    const uninstallServer = async (serverName: string) => {
      this.log(`\nUninstalling MCP server: ${serverName}`)
      return platform === 'darwin' ?
        this.uninstallOnMacOS(serverName, flags.client) :
        this.uninstallOnWindows(serverName, flags.client)
    }

    try {
      await Promise.all(serverNames.map(name => uninstallServer(name)))
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.error(`Failed to uninstall server: ${error.message}`)
      } else {
        this.error('An unknown error occurred during installation')
      }
    }
  }

  private async uninstallOnMacOS(serverName: string, client: string): Promise<void> {
    if (client === 'claude') {
      const configPath = path.join(
        os.homedir(),
        'Library',
        'Application Support',
        'Claude',
        'claude_desktop_config.json'
      )

      try {
        await fs.access(configPath)

        const configContent = await fs.readFile(configPath, 'utf8')
        const config = JSON.parse(configContent) as { mcpServers?: Record<string, unknown> }

        if (!config.mcpServers || !config.mcpServers[serverName]) {
          this.error(`Server "${serverName}" is not installed`)
          return
        }

        delete config.mcpServers[serverName]

        await fs.writeFile(configPath, JSON.stringify(config, null, 2))

        this.log(`🗑️  Successfully uninstalled ${serverName}`)

      } catch (error: unknown) {
        if (error instanceof Error) {
          if ('code' in error && error.code === 'ENOENT') {
            this.error(`Config file not found at ${configPath}. Is Claude Desktop installed?`)
          } else {
            this.error(`Error reading config: ${error.message}`)
          }
        } else {
          this.error('An unknown error occurred')
        }
      }
    } else if (client === 'continue') {
      const configPath = path.join(
        os.homedir(),
        '.continue',
        'config.json'
      )

      try {
        await fs.access(configPath)

        const configContent = await fs.readFile(configPath, 'utf8')
        const config = JSON.parse(configContent)

        if (!config.experimental?.modelContextProtocolServers?.length) {
          this.error(`No MCP servers are installed`)
          return
        }

        const serverIndex = config.experimental.modelContextProtocolServers.findIndex((s: MCPServerTransport) => {
          const server = servers.find(srv => srv.id === serverName)
          if (!server) return false

          return s.transport.command === server.config.command &&
                 JSON.stringify(s.transport.args.slice(0, server.config.args.length)) === JSON.stringify(server.config.args)
        })

        if (serverIndex === -1) {
          this.error(`Server "${serverName}" is not installed`)
          return
        }

        config.experimental.modelContextProtocolServers.splice(serverIndex, 1)

        await fs.writeFile(configPath, JSON.stringify(config, null, 2))

        this.log(`🗑️  Successfully uninstalled ${serverName}`)

      } catch (error: unknown) {
        if (error instanceof Error) {
          if ('code' in error && error.code === 'ENOENT') {
            this.error(`Config file not found at ${configPath}. Is Continue installed?`)
          } else {
            this.error(`Error reading config: ${error.message}`)
          }
        } else {
          this.error('An unknown error occurred')
        }
      }
    }
  }

  private async uninstallOnWindows(_serverName: string, _client: string): Promise<void> {
    throw new Error('Windows uninstallation not implemented yet')
  }
}
