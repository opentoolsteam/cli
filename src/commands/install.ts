import * as inquirer from '@inquirer/prompts'
import {Args, Command, Flags} from '@oclif/core'
import { exec, execFile } from 'node:child_process'
import * as fs from 'node:fs/promises'
import * as os from 'node:os'
import * as path from 'node:path'
import { promisify } from 'node:util'

import type { MCPServerType } from '../data/types.js'

import { servers } from '../data/servers/index.js'

const execAsync = promisify(exec)

interface ConfigServer {
  args: string[];
  command: string;
  env: Record<string, string>;
}

interface ConfigType {
  experimental?: {
    modelContextProtocolServers?: Array<{
      transport: { type: string } & ConfigServer;
    }>;
    useTools?: boolean;
  };
  mcpServers?: Record<string, ConfigServer>;
}

type ConfigTarget = { args: string[]; command: string; type: 'command' } | { path: string; type: 'file' };

export default class Install extends Command {
  static aliases = ['i']

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
    '<%= config.bin %> <%= command.id %> server-name --client vscode',
    '<%= config.bin %> <%= command.id %> server-name --client vscode-insiders',
  ]

  static flags = {
    client: Flags.string({
      char: 'c',
      default: 'claude',
      description: 'Install the MCP server to this client',
      options: ['claude', 'continue', 'vscode', 'vscode-insiders'],
    }),
  }

  private clientDisplayNames: Record<string, string> = {
    'claude': 'Claude Desktop',
    'continue': 'Continue'
  }

  private clientProcessNames: Record<string, string> = {
    'claude': 'Claude',
    'continue': 'Continue'
  }

  private CLIENTS_REQUIRING_RESTART: string[] = ['claude']

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Install)

    // Validate server exists in registry
    await this.validateServer(args.server)

    // Detect operating system
    const {platform} = process

    if (platform !== 'darwin' && platform !== 'win32') {
      this.error('This command is only supported on macOS and Windows')
      return
    }

    this.log(`Installing MCP server: ${args.server}`)
    this.log(`Platform: ${platform === 'darwin' ? 'macOS' : 'Windows'}`)
    this.log(`Client: ${flags.client}`)

    try {
      await (platform === 'darwin' ? this.installOnMacOS(args.server, flags.client) : this.installOnWindows(args.server, flags.client));

      // After successful installation, prompt for restart
      if (this.CLIENTS_REQUIRING_RESTART.includes(flags.client)) {
        await this.promptForRestart(flags.client)
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.error(`Failed to install server: ${error.message}`)
      } else {
        this.error('An unknown error occurred during installation')
      }
    }
  }

  private addServerToConfig(client: string, serverName: string, config: ConfigType, serverConfig: ConfigServer): void {
    if (client === 'claude') {
      config.mcpServers = config.mcpServers || {}
      config.mcpServers[serverName] = serverConfig
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
        ...serverConfig,
        type: 'stdio'
      }

      // Find if server already exists in the array
      const existingServerIndex = config.experimental.modelContextProtocolServers.findIndex(
        (s) => s.transport.command === serverConfig.command &&
               JSON.stringify(s.transport.args) === JSON.stringify(serverConfig.args)
      )

      if (existingServerIndex >= 0) {
        config.experimental.modelContextProtocolServers[existingServerIndex].transport = serverTransport
      } else {
        config.experimental.modelContextProtocolServers.push({
          transport: serverTransport
        })
      }
    }
  }

  private async addServerViaCommand(command: string, args: string[], serverName: string, serverConfig: ConfigServer): Promise<void> {
    const json = JSON.stringify({ ...serverConfig, name: serverName })
    return  new Promise<void>((resolve, reject) => {
      const child = execFile(command, [...args, json], (err, stdout, stderr) => {
        if (err) {
          reject(err)
        } else if (child.exitCode === 0) {
          resolve()
        } else {
          reject(new Error(`running ${command}: ${stderr.toString() || stdout.toString()}`))
        }
      })
    })
  }

  private getConfigTarget(client: string, platform: 'macos' | 'win'): ConfigTarget {
    switch (client) {
      case 'claude': {
        if (platform === 'win') {
          throw new Error('Windows installation not implemented yet')
        }

        return {
          path: path.join(
            os.homedir(),
            'Library',
            'Application Support',
            'Claude',
            'claude_desktop_config.json'
          ),
          type: 'file',
        }
      }

      case 'continue': {
        if (platform === 'win') {
          throw new Error('Windows installation not implemented yet')
        }

        return {
          path: path.join(
            os.homedir(),
            '.continue',
            'config.json'
          ),
          type: 'file',
        }
      }

      case 'vscode': {
        return { args: ['--add-mcp'], command: platform === 'win' ? 'code.cmd' : 'code', type: 'command' }
      }

      case 'vscode-insiders': {
        return { args: ['--add-mcp'], command: platform === 'win' ? 'code-insiders.cmd' : 'code-insiders', type: 'command' }
      }

      default: {
        throw new Error(`Unsupported client: ${client}`)
      }
    }
  }

  private async installMCPServer(configTarget: ConfigTarget, serverName: string, client: string): Promise<void> {

    let config: ConfigType = {}

    if (configTarget.type === 'file') {
      try {
          // Check if file exists
          await fs.access(configTarget.path)
          // Read and parse the config file
          const configContent = await fs.readFile(configTarget.path, 'utf8')
          config = JSON.parse(configContent)
      } catch (error: unknown) {
        if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
          this.log('🆕  Initializing new configuration file...')
          // Create directory if it doesn't exist
          await fs.mkdir(path.dirname(configTarget.path), { recursive: true })
          // Create empty config
          config = {}
        } else {
          throw error
        }
      }
    }

    // Get server configuration from registry
    const server = await this.validateServer(serverName)
    const serverConfig = server.config

    // Handle runtime arguments if they exist
    const finalArgs = [...serverConfig.args]
    if (serverConfig.runtimeArgs) {
      const runtimeArg = serverConfig.runtimeArgs
      let answer: string | string[]

      // Special case for filesystem-ref server
      let defaultValue = runtimeArg.default
      if (serverName === 'filesystem-ref' && Array.isArray(defaultValue)) {
        defaultValue = defaultValue.map(path =>
          path.replace('username', os.userInfo().username)
        )
      }

      if (runtimeArg.multiple) {
        // First get the default path
        const initialAnswer = await inquirer.input({
          default: Array.isArray(defaultValue) ? defaultValue.join(', ') : defaultValue,
          message: runtimeArg.description,
        })
        const paths = initialAnswer.split(',').map((s: string) => s.trim())

        // Keep asking for additional paths until empty input
        const getAdditionalPaths = async (): Promise<string[]> => {
          const additionalPaths: string[] = []
          let input = await inquirer.input({
            default: "",
            message: "Add another allowed directory path? (press Enter to finish)",
          })

          while (input.trim()) {
            additionalPaths.push(input.trim())
            // eslint-disable-next-line no-await-in-loop
            input = await inquirer.input({
              default: "",
              message: "Add another allowed directory path? (press Enter to finish)",
            })
          }

          return additionalPaths
        }

        const additionalPaths = await getAdditionalPaths()
        paths.push(...additionalPaths)

        answer = paths
      } else {
        answer = await inquirer.input({
          default: defaultValue,
          message: runtimeArg.description,
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
      // eslint-disable-next-line no-await-in-loop
      const answer = await inquirer.input({
        message: value.description,
        validate(input: string) {
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


    const finalConfig: ConfigServer = {
      args: finalArgs,
      command: serverConfig.command,
      env: answers,
    }

    if (configTarget.type === 'file') {
      // Update the config based on client type
      this.addServerToConfig(client, serverName, config, finalConfig)
      // Write the updated config back to file
      await fs.writeFile(configTarget.path, JSON.stringify(config, null, 2))
    } else {
      await this.addServerViaCommand(configTarget.command, configTarget.args, serverName, finalConfig)
    }


    this.log(`🛠️  Successfully installed ${serverName}`)
  }

  private installOnMacOS(serverName: string, client: string): Promise<void> {
    return this.installUsingConfig(this.getConfigTarget(client, 'macos'), serverName, client)
  }

  private async installOnWindows(serverName: string, client: string): Promise<void> {
    return this.installUsingConfig(this.getConfigTarget(client, 'win'), serverName, client)
  }

  private async installUsingConfig(configTarget: ConfigTarget, serverName: string, client: string): Promise<void> {
    try {
      await this.installMCPServer(configTarget, serverName, client)
    } catch (error: unknown) {
      if (error instanceof Error) {
        if ('code' in error && error.code === 'ENOENT') {
          if (configTarget.type === 'file') {
            this.error(`Config file not found at ${configTarget.path}. Is ${client} installed?`)
          } else {
            this.error(`Command not found '${configTarget.command}'. Is ${client} installed?`)
          }
        } else {
          this.error(`Error reading config: ${error.message}`)
        }
      } else {
        this.error('An unknown error occurred')
      }
    }
  }

  private async promptForRestart(client: string): Promise<void> {
    const answer = await inquirer.confirm({
      default: true,
      message: `Would you like to restart ${this.clientDisplayNames[client]} to apply changes?`,
    })

    if (answer) {
      this.log(`Restarting ${this.clientDisplayNames[client]}...`)
      await this.restartClient(client)
    }
  }

  private async restartClient(client: string): Promise<void> {
    const processName = this.clientProcessNames[client]
    if (!processName) {
      throw new Error(`Unknown client: ${client}`)
    }

    const sleep = (ms: number) => new Promise(resolve => { setTimeout(resolve, ms) })

    try {
      const {platform} = process
      if (platform === 'darwin') {
        if (client === 'continue') {
          await this.restartContinueClient()
        } else {
          // For other clients like Claude, use the normal process
          await execAsync(`killall "${processName}"`)
          await sleep(2000)
          await execAsync(`open -a "${processName}"`)
          this.log(`✨ ${this.clientDisplayNames[client]} has been restarted`)
        }
      } else if (platform === 'win32') {
        if (client === 'continue') {
          await this.restartContinueClientWindows()
        } else {
          // For other clients
          await execAsync(`taskkill /F /IM "${processName}.exe" && start "" "${processName}.exe"`)
          this.log(`✨ ${this.clientDisplayNames[client]} has been restarted`)
        }
      } else {
        throw new Error('This command is only supported on macOS and Windows')
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Check if the error is just that no matching processes were found
        if (error.message.includes('No matching processes') || error.message.includes('not found')) {
          this.error(`${this.clientDisplayNames[client]} does not appear to be running`)
        } else {
          this.error(`Failed to restart ${this.clientDisplayNames[client]}: ${error.message}`)
        }
      } else {
        this.error(`Failed to restart ${this.clientDisplayNames[client]}`)
      }
    }
  }

  private async restartContinueClient(): Promise<void> {
    const sleep = (ms: number) => new Promise(resolve => { setTimeout(resolve, ms) })

    try {
      // First, find VS Code's installation location
      const findVSCode = await execAsync('mdfind "kMDItemCFBundleIdentifier == \'com.microsoft.VSCode\'" | head -n1')
      const vscodePath = findVSCode.stdout.trim()

      if (vscodePath) {
        const electronPath = path.join(vscodePath, 'Contents/MacOS/Electron')
        // Check if VS Code is running using the found path
        const vscodeProcesses = await execAsync(`pgrep -fl "${electronPath}"`)
        if (vscodeProcesses.stdout.trim().length > 0) {
          // Use pkill with full path to ensure we only kill VS Code's Electron
          await execAsync(`pkill -f "${electronPath}"`)
          await sleep(2000)
          await execAsync(`open -a "Visual Studio Code"`)
          this.log(`✨ Continue (VS Code) has been restarted`)
          return
        }
      }
    } catch {
      // VS Code not found or error in detection, try JetBrains
      try {
        const jetbrainsProcesses = await execAsync('pgrep -fl "IntelliJ IDEA.app"')
        if (jetbrainsProcesses.stdout.trim().length > 0) {
          await execAsync(`killall "idea"`)
          await sleep(2000)
          await execAsync(`open -a "IntelliJ IDEA"`)
          this.log(`✨ Continue (IntelliJ IDEA) has been restarted`)
          return
        }
      } catch {
        // JetBrains not found
      }
    }

    throw new Error('Could not detect running IDE (VS Code or JetBrains) for Continue')
  }

  private async restartContinueClientWindows(): Promise<void> {
    try {
      const vscodeProcess = await execAsync('tasklist /FI "IMAGENAME eq Code.exe" /FO CSV /NH')
      if (vscodeProcess.stdout.includes('Code.exe')) {
        await execAsync('taskkill /F /IM "Code.exe" && start "" "Visual Studio Code"')
        this.log(`✨ VS Code has been restarted`)
        return
      }

      const jetbrainsProcess = await execAsync('tasklist /FI "IMAGENAME eq idea64.exe" /FO CSV /NH')
      if (jetbrainsProcess.stdout.includes('idea64.exe')) {
        await execAsync('taskkill /F /IM "idea64.exe" && start "" "IntelliJ IDEA"')
        this.log(`✨ IntelliJ IDEA has been restarted`)
        return
      }
    } catch {
      // Process detection failed
    }

    throw new Error('Could not detect running IDE (VS Code or JetBrains) for Continue')
  }

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
}
