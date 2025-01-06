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

  private getConfigPath(client: string): string {
    switch (client) {
      case 'claude':
        return path.join(
          os.homedir(),
          'Library',
          'Application Support',
          'Claude',
          'claude_desktop_config.json'
        )
      case 'continue':
        return path.join(
          os.homedir(),
          '.continue',
          'config.json'
        )
      default:
        throw new Error(`Unsupported client: ${client}`)
    }
  }

  private async installMCPServer(configPath: string, serverName: string, client: string): Promise<void> {
    let config: any = {}

    try {
      // Check if file exists
      await fs.access(configPath)
      // Read and parse the config file
      const configContent = await fs.readFile(configPath, 'utf-8')
      config = JSON.parse(configContent)
    } catch (error: unknown) {
      if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
        this.log('🆕  Initializing new configuration file...')
        // Create directory if it doesn't exist
        await fs.mkdir(path.dirname(configPath), { recursive: true })
        // Create empty config
        config = {}
      } else {
        throw error // Re-throw if it's not a missing file error
      }
    }

    // Get server configuration from registry
    const server = await this.validateServer(serverName)
    const serverConfig = server.config

    // Handle runtime arguments if they exist
    let finalArgs = [...serverConfig.args]
    if (serverConfig.runtimeArgs) {
      const runtimeArg = serverConfig.runtimeArgs
      let answer: any

      // Special case for filesystem-ref server
      let defaultValue = runtimeArg.default
      if (serverName === 'filesystem-ref' && Array.isArray(defaultValue)) {
        defaultValue = defaultValue.map(path =>
          path.replace('username', os.userInfo().username)
        )
      }

      if (runtimeArg.multiple) {
        // First get the default path
        answer = await inquirer.input({
          message: runtimeArg.description,
          default: Array.isArray(defaultValue) ? defaultValue.join(', ') : defaultValue,
        })
        let paths = answer.split(',').map((s: string) => s.trim())

        // Keep asking for additional paths
        while (true) {
          const additionalPath = await inquirer.input({
            message: "Add another allowed directory path? (press Enter to finish)",
            default: "",
          })

          if (!additionalPath.trim()) {
            break
          }

          paths.push(additionalPath.trim())
        }

        answer = paths
      } else {
        answer = await inquirer.input({
          message: runtimeArg.description,
          default: defaultValue,
        })
      }

      // Add runtime arguments to args array
      if (Array.isArray(answer)) {
        finalArgs.push(...answer)
      } else {
        finalArgs.push(answer)
      }
    }

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
      // Only add non-empty values to answers
      if (answer.trim()) {
        answers[key] = answer
      }
    }

    // Update the config based on client type
    if (client === 'claude') {
      config.mcpServers = config.mcpServers || {}
      config.mcpServers[serverName] = {
        command: serverConfig.command,
        args: finalArgs,
        env: answers
      }
    } else if (client === 'continue') {
      // Initialize experimental if it doesn't exist
      if (!config.experimental) {
        config.experimental = {}
      }

      // Always set useTools to true
      config.experimental.useTools = true

      // Initialize modelContextProtocolServers if it doesn't exist
      config.experimental.modelContextProtocolServers = config.experimental.modelContextProtocolServers || []

      const serverTransport = {
        type: 'stdio',
        command: serverConfig.command,
        args: finalArgs,
        env: answers
      }

      // Find if server already exists in the array
      const existingServerIndex = config.experimental.modelContextProtocolServers.findIndex(
        (s: any) => s.transport.command === serverConfig.command &&
                   JSON.stringify(s.transport.args) === JSON.stringify(finalArgs)
      )

      if (existingServerIndex >= 0) {
        config.experimental.modelContextProtocolServers[existingServerIndex].transport = serverTransport
      } else {
        config.experimental.modelContextProtocolServers.push({
          transport: serverTransport
        })
      }
    }

    // Write the updated config back to file
    await fs.writeFile(configPath, JSON.stringify(config, null, 2))

    this.log(`🛠️  Successfully installed ${serverName}`)
  }

  private async installOnMacOS(serverName: string, client: string): Promise<void> {
    const configPath = this.getConfigPath(client)
    try {
      await this.installMCPServer(configPath, serverName, client)
    } catch (error: unknown) {
      if (error instanceof Error) {
        if ('code' in error && error.code === 'ENOENT') {
          this.error(`Config file not found at ${configPath}. Is ${client} installed?`)
        } else {
          this.error(`Error reading config: ${error.message}`)
        }
      } else {
        this.error('An unknown error occurred')
      }
    }
  }

  private async installOnWindows(serverName: string, client: string): Promise<void> {
    // TODO: Implement Windows-specific installation logic
    throw new Error('Windows installation not implemented yet')
  }
}
