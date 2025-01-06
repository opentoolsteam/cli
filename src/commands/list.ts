import {Command, Flags} from '@oclif/core'
import * as fs from 'fs/promises'
import * as path from 'path'
import * as os from 'os'
import { servers } from '../data/servers/index.js'

export default class List extends Command {
  private clientDisplayNames: Record<string, string> = {
    'claude': 'Claude Desktop',
    'continue': 'Continue'
  }

  static override description = 'List installed servers across all clients'

  static override examples = [
    '<%= config.bin %> list',
    '<%= config.bin %> list --client=claude',
    '<%= config.bin %> list --client=continue',
  ]

  static override flags = {
    client: Flags.string({
      char: 'c',
      description: 'Only show servers for this client',
      options: ['claude', 'continue'],
      required: false,
    }),
  }

  static aliases = ['ls']

  public async run(): Promise<void> {
    const {flags} = await this.parse(List)

    let foundServers = false
    const trackServers = (found: boolean) => {
      foundServers = foundServers || found
    }

    if (flags.client === 'claude') {
      trackServers(await this.listClaudeServers())
    } else if (flags.client === 'continue') {
      trackServers(await this.listContinueServers())
    } else {
      // If no client specified, show all
      trackServers(await this.listClaudeServers().catch(() => false)) // Ignore errors
      trackServers(await this.listContinueServers().catch(() => false)) // Ignore errors
    }

    if (!foundServers) {
      if (flags.client) {
        const clientName = this.clientDisplayNames[flags.client]
        this.log(`No MCP servers currently installed on ${clientName}.`)
      } else {
        this.log('No MCP servers currently installed.')
      }
    }
  }

  private async listClaudeServers(): Promise<boolean> {
    const configPath = path.join(
      os.homedir(),
      'Library',
      'Application Support',
      'Claude',
      'claude_desktop_config.json'
    )

    try {
      const configContent = await fs.readFile(configPath, 'utf-8')
      const config = JSON.parse(configContent)
      const installedServers = Object.keys(config.mcpServers || {})

      // Filter to only include servers that exist in the registry
      const validServers = installedServers.filter(serverId =>
        servers.some(s => s.id === serverId)
      )

      // Only output if there are valid servers
      if (validServers.length > 0) {
        this.log(`\n${this.clientDisplayNames['claude']}`)
        // Print servers in a tree-like format
        validServers.forEach((serverId, index) => {
          const prefix = index === validServers.length - 1 ? '└── ' : '├── '
          const link = `\u001B]8;;https://opentools.computer/registry/${serverId}\u0007${serverId}\u001B]8;;\u0007`
          this.log(`${prefix}${link}`)
        })
        return true
      }
      return false

    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
        // Don't output anything if client not installed
        return false
      } else {
        throw error
      }
    }
  }

  private async listContinueServers(): Promise<boolean> {
    const configPath = path.join(
      os.homedir(),
      '.continue',
      'config.json'
    )

    try {
      const configContent = await fs.readFile(configPath, 'utf-8')
      const config = JSON.parse(configContent)

      // Get installed servers from the experimental.modelContextProtocolServers array
      const installedServers = config.experimental?.modelContextProtocolServers || []

      // Map installed servers back to their IDs by matching command and args
      const validServers = servers
        .filter(registryServer =>
          installedServers.some((installed: { transport: { command: string, args: string[] } }) =>
            installed.transport.command === registryServer.config.command &&
            JSON.stringify(installed.transport.args.slice(0, registryServer.config.args.length)) === JSON.stringify(registryServer.config.args)
          )
        )
        .map(s => s.id)

      // Only output if there are valid servers
      if (validServers.length > 0) {
        this.log(`\n${this.clientDisplayNames['continue']}`)
        // Print servers in a tree-like format
        validServers.forEach((serverId, index) => {
          const prefix = index === validServers.length - 1 ? '└── ' : '├── '
          const link = `\u001B]8;;https://opentools.computer/registry/${serverId}\u0007${serverId}\u001B]8;;\u0007`
          this.log(`${prefix}${link}`)
        })
        return true
      }
      return false

    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
        // Don't output anything if client not installed
        return false
      } else {
        throw error
      }
    }
  }
}
