import {Args, Command, Flags} from '@oclif/core'
import * as fs from 'fs/promises'
import * as path from 'path'
import * as os from 'os'

export default class Uninstall extends Command {
  static override args = {
    server: Args.string({
      description: 'name of the MCP server to uninstall',
      required: true,
    }),
  }

  static override description = 'Uninstall an MCP server'

  static override examples = [
    '<%= config.bin %> <%= command.id %> server-name',
    '<%= config.bin %> <%= command.id %> server-name --client claude',
  ]

  static override flags = {
    client: Flags.string({
      char: 'c',
      description: 'Uninstall the MCP server from this client',
      options: ['claude', 'continue'],
      default: 'claude',
    }),
  }

  static aliases = ['un']

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Uninstall)

    // Detect operating system
    const platform = process.platform

    if (platform !== 'darwin' && platform !== 'win32') {
      this.error('This command is only supported on macOS and Windows')
      return
    }

    this.log(`Uninstalling MCP server: ${args.server}`)
    this.log(`Platform: ${platform === 'darwin' ? 'macOS' : 'Windows'}`)
    this.log(`Client: ${flags.client}`)

    try {
      if (platform === 'darwin') {
        await this.uninstallOnMacOS(args.server, flags.client)
      } else {
        await this.uninstallOnWindows(args.server, flags.client)
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.error(`Failed to uninstall server: ${error.message}`)
      } else {
        this.error('An unknown error occurred during uninstallation')
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
    } else {
      // TODO: Handle 'continue' client case
      throw new Error('Continue client uninstallation not implemented yet')
    }
  }

  private async uninstallOnWindows(serverName: string, client: string): Promise<void> {
    // TODO: Implement Windows-specific uninstallation logic
    throw new Error('Windows uninstallation not implemented yet')
  }
}
