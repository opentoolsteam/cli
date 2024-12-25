import {Command, Flags} from '@oclif/core'
import * as fs from 'fs/promises'
import * as path from 'path'
import * as os from 'os'
import { servers } from '../data/servers/index.js'

export default class List extends Command {
  static override description = 'List installed servers for the specified client'

  static override examples = [
    '<%= config.bin %> list',
    '<%= config.bin %> list --client=continue',
  ]

  static override flags = {
    client: Flags.string({
      char: 'c',
      description: 'client to check (claude or continue)',
      default: 'claude',
      options: ['claude', 'continue'],
    }),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(List)

    if (flags.client === 'claude') {
      await this.listClaudeServers()
    } else {
      // TODO: Implement other clients
      throw new Error(`${flags.client} client not implemented yet`)
    }
  }

  private async listClaudeServers(): Promise<void> {
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

      this.log(`MCP servers installed on Claude Desktop (${configPath}):`)

      if (validServers.length === 0) {
        this.log('No valid servers installed')
        return
      }

      // Print servers in a tree-like format
      validServers.forEach((serverId, index) => {
        const prefix = index === validServers.length - 1 ? '└── ' : '├── '
        const link = `\u001B]8;;https://opentools.computer/registry/${serverId}\u0007${serverId}\u001B]8;;\u0007`
        this.log(`${prefix}${link}`)
      })

    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
        this.error(`Config file not found at ${configPath}. Is Claude Desktop installed?`)
      } else {
        this.error(`Failed to read config: ${error instanceof Error ? error.message : String(error)}`)
      }
    }
  }
}
