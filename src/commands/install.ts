import {Args, Command, Flags} from '@oclif/core'
import * as fs from 'fs/promises'
import * as path from 'path'
import * as os from 'os'
import * as inquirer from '@inquirer/prompts'
import { servers } from '../data/servers/index.js'
import type { MCPServerType } from '../data/types.js'

export default class Install extends Command {
  private async validateServer(serverName: string): Promise<MCPServerType> {
    const server = servers.find(s => s.id === serverName)
    if (!server) {
      this.error(`Server "${serverName}" not found in registry`)
    }
    if (server.distribution?.type === 'source') {
      this.error(`Server "${serverName}" is a source distribution and cannot via OpenTools (for now). To install, please visit ${server.sourceUrl}`)
    }
    return server
  }

  static args = {
    server: Args.string({
      description: 'name of the MCP server to install',
      required: true,
    }),
  }

  static description = 'Install an MCP server'

  static examples = [
    '<%= config.bin %> <%= command.id %> server-name',
    '<%= config.bin %> <%= command.id %> server-name --client claude',
    '<%= config.bin %> <%= command.id %> server-name --client continue',
  ]

  static flags = {
    client: Flags.string({
      char: 'c',
      description: 'Install the MCP server to this client',
      options: ['claude', 'continue'],
      default: 'claude',
    }),
  }

  static aliases = ['i']

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Install)

    // Validate server exists in registry
    const server = await this.validateServer(args.server)

    // Detect operating system
    const platform = process.platform

    if (platform !== 'darwin' && platform !== 'win32') {
      this.error('This command is only supported on macOS and Windows')
      return
    }

    this.log(`Installing MCP server: ${args.server}`)
    this.log(`Platform: ${platform === 'darwin' ? 'macOS' : 'Windows'}`)
    this.log(`Client: ${flags.client}`)

    try {
      if (platform === 'darwin') {
        await this.installOnMacOS(args.server, flags.client)
      } else {
        await this.installOnWindows(args.server, flags.client)
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.error(`Failed to install server: ${error.message}`)
      } else {
        this.error('An unknown error occurred during installation')
      }
    }
  }

  private async installOnMacOS(serverName: string, client: string): Promise<void> {
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

        // Get server configuration from registry
        const server = await this.validateServer(serverName)
        const serverConfig = server.config

        // Collect environment variables
        const envVars = serverConfig.env
        const answers: Record<string, string> = {}

        for (const [key, value] of Object.entries(envVars)) {
          const answer = await inquirer.input({
            message: value.description,
            validate: (input: string) => {
              if (value.required !== false && !input) {
                return `${key} is required`
              }
              return true
            }
          })
          answers[key] = answer
        }

        // Update the config with the new server and environment variables
        config.mcpServers = config.mcpServers || {}
        config.mcpServers[serverName] = {
          command: serverConfig.command,
          args: serverConfig.args,
          env: answers
        }

        // Write the updated config back to file
        await fs.writeFile(configPath, JSON.stringify(config, null, 2))

        this.log(`Successfully installed ${serverName} with environment variables`)

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
      throw new Error('Continue client installation not implemented yet')
    }
  }

  private async installOnWindows(serverName: string, client: string): Promise<void> {
    // TODO: Implement Windows-specific installation logic
    throw new Error('Windows installation not implemented yet')
  }
}
