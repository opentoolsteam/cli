import {Args, Command, Flags} from '@oclif/core'
import * as fs from 'fs/promises'
import * as path from 'path'
import * as os from 'os'
import {z} from 'zod'
import * as inquirer from '@inquirer/prompts'

const EnvVariable = z.object({
  description: z.string(),
  required: z.boolean().default(true).optional(),
})

const MCPConfig = z.record(
  z.string(),
  z.object({
    command: z.string(),
    args: z.array(z.string()),
    env: z.record(z.string(), EnvVariable),
  }),
)

const MCPServer = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  description: z.string(),
  publisher: z.object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    name: z.string(),
    url: z.string().url(),
  }),
  isOfficial: z.boolean().default(false),
  sourceUrl: z.string().url(),
  distribution: z.object({
    type: z.enum(['npm', 'pip']),
    package: z.string(),
  }).optional(),
  license: z.string().optional(),
  runtime: z.enum(['node', 'python', 'other']),
  config: MCPConfig,
})

// Infer types from schemas
type MCPServerType = z.infer<typeof MCPServer>

export default class Install extends Command {
  // Mock function to simulate registry API
  private async fetchRegistry(): Promise<MCPServerType[]> {
    // Mock data
    return [
      {
        id: 'browserbase',
        name: 'Browserbase',
        description: 'Automate browser interactions in the cloud (e.g. web navigation, data extraction, form filling, and more)',
        publisher: {
          id: 'browserbase',
          name: 'Browserbase Inc.',
          url: 'https://www.browserbase.com/',
        },
        isOfficial: true,
        sourceUrl: 'https://github.com/browserbase/mcp-server-browserbase/tree/main/browserbase',
        distribution: {
          type: 'npm',
          package: '@browserbasehq/mcp-browserbase',
        },
        license: 'MIT',
        runtime: 'node',
        config: {
          '@browserbasehq/mcp-browserbase': {
            command: 'npx',
            args: ['-y', '@browserbasehq/mcp-browserbase'],
            env: {
              'BROWSERBASE_API_KEY': {
                description: 'Your Browserbase API key. Find it at: https://www.browserbase.com/settings',
              },
              'BROWSERBASE_PROJECT_ID': {
                description: 'Your Browserbase project ID. Find it at: https://www.browserbase.com/settings',
              },
            }
          }
        }
      },
    ]
  }

  private async validateServer(serverName: string): Promise<MCPServerType> {
    try {
      const servers = await this.fetchRegistry()
      const server = servers.find(s => s.id === serverName)
      if (!server) {
        this.error(`Server "${serverName}" not found in registry`)
      }
      return server
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.error(`Failed to validate server: ${error.message}`)
      } else {
        this.error('An unknown error occurred during server validation')
      }
    }
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

        // Get the first (and only) key from the config object
        const packageKey = Object.keys(server.config)[0]
        const serverConfig = server.config[packageKey]

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
