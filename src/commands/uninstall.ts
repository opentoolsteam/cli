import {Args, Command, Flags} from '@oclif/core'
import * as fs from 'fs/promises'
import * as path from 'path'
import * as os from 'os'
import { servers } from '../data/servers/index.js'
import type { MCPServerType } from '../data/types.js'

export default class Uninstall extends Command {
  static override args = {
    firstServer: Args.string({
      description: 'name of the MCP server to uninstall',
      required: true,
    }),
  }

  static override strict = false  // Allow variable length arguments

  static override description = 'Uninstall one or more MCP servers'

  static override examples = [
    '<%= config.bin %> <%= command.id %> server-name',
    '<%= config.bin %> <%= command.id %> server-name1 server-name2 --client claude',
  ]

  static override flags = {
    client: Flags.string({
      char: 'c',
      description: 'Uninstall the MCP servers from this client',
      options: ['claude', 'continue'],
      default: 'claude',
    }),
  }

  static aliases = ['un']

  // Add completion support
  static completion: (options: { argv: string[] }) => Promise<string[]> = async ({ argv }) => {
    const input = argv[argv.length - 1] || ''

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

      // Get Claude Desktop servers
      try {
        const claudeConfig = JSON.parse(await fs.readFile(claudeConfigPath, 'utf-8'))
        if (claudeConfig.mcpServers) {
          Object.keys(claudeConfig.mcpServers)
            .filter(id => claudeConfig.mcpServers[id].status !== 'unknown')
            .forEach(id => installedServers.add(id))
        }
      } catch (error) {
        // Ignore errors reading Claude config
      }

      // Get Continue servers
      try {
        const continueConfig = JSON.parse(await fs.readFile(continueConfigPath, 'utf-8'))
        if (continueConfig.experimental?.modelContextProtocolServers) {
          continueConfig.experimental.modelContextProtocolServers.forEach((s: any) => {
            // Find matching server by command and args
            const server: MCPServerType | undefined = servers.find(srv =>
              s.transport.command === srv.config.command &&
              JSON.stringify(s.transport.args.slice(0, srv.config.args.length)) === JSON.stringify(srv.config.args)
            )
            if (server) {
              installedServers.add(server.id)
            }
          })
        }
      } catch (error) {
        // Ignore errors reading Continue config
      }

      // Filter by input prefix if provided
      const matches = Array.from(installedServers).filter(id =>
        id.toLowerCase().startsWith(input.toLowerCase())
      )

      return matches
    } catch (error) {
      return []
    }
  }

  public async run(): Promise<void> {
    const {argv, flags} = await this.parse(Uninstall)
    const serverNames = argv as string[]

    const platform = process.platform

    if (platform !== 'darwin' && platform !== 'win32') {
      this.error('This command is only supported on macOS and Windows')
      return
    }

    // First validate all server IDs exist in our known servers list
    for (const serverName of serverNames) {
      const serverExists = servers.some(server => server.id === serverName)
      if (!serverExists) {
        this.error(`Server "${serverName}" is not a valid server ID`)
        return
      }
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
        const configContent = await fs.readFile(configPath, 'utf-8')
        const config = JSON.parse(configContent)

        for (const serverName of serverNames) {
          if (config.mcpServers?.[serverName]?.status === 'unknown') {
            this.error(`Cannot uninstall "${serverName}" because it is in an unknown state. Please try reinstalling it first.`)
            return
          }
        }
      } catch (error) {
        // If we can't read the config, we'll let the actual uninstall handle the error
      }
    }

    this.log(`Platform: ${platform === 'darwin' ? 'macOS' : 'Windows'}`)
    this.log(`Client: ${flags.client}`)

    // Process servers sequentially
    for (const serverName of serverNames) {
      this.log(`\nUninstalling MCP server: ${serverName}`)

      try {
        if (platform === 'darwin') {
          await this.uninstallOnMacOS(serverName, flags.client)
        } else {
          await this.uninstallOnWindows(serverName, flags.client)
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.error(`Failed to uninstall server "${serverName}": ${error.message}`)
          // Stop processing remaining servers on first failure
          return
        } else {
          this.error(`An unknown error occurred during uninstallation of "${serverName}"`)
          return
        }
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
        // Check if file exists
        await fs.access(configPath)

        // Read and parse the config file
        const configContent = await fs.readFile(configPath, 'utf-8')
        const config = JSON.parse(configContent)

        // Check if mcpServers exists and has the server
        if (!config.mcpServers || !config.mcpServers[serverName]) {
          this.error(`Server "${serverName}" is not installed`)
          return
        }

        // Remove the server from config
        delete config.mcpServers[serverName]

        // Write the updated config back to file
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
        // Check if file exists
        await fs.access(configPath)

        // Read and parse the config file
        const configContent = await fs.readFile(configPath, 'utf-8')
        const config = JSON.parse(configContent)

        // Check if experimental and modelContextProtocolServers exist
        if (!config.experimental?.modelContextProtocolServers?.length) {
          this.error(`No MCP servers are installed`)
          return
        }

        // Find the server in the array by matching command and args that would have been used during installation
        const serverIndex = config.experimental.modelContextProtocolServers.findIndex((s: any) => {
          const server = servers.find(srv => srv.id === serverName)
          if (!server) return false

          return s.transport.command === server.config.command &&
                 JSON.stringify(s.transport.args.slice(0, server.config.args.length)) === JSON.stringify(server.config.args)
        })

        if (serverIndex === -1) {
          this.error(`Server "${serverName}" is not installed`)
          return
        }

        // Remove the server from the array
        config.experimental.modelContextProtocolServers.splice(serverIndex, 1)

        // Write the updated config back to file
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

  private async uninstallOnWindows(serverName: string, client: string): Promise<void> {
    // TODO: Implement Windows-specific uninstallation logic
    throw new Error('Windows uninstallation not implemented yet')
  }
}
