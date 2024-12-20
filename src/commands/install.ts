import {Args, Command, Flags} from '@oclif/core'

export default class Install extends Command {
  static args = {
    server: Args.string({
      description: 'name of the MCP server to install',
      required: true,
    }),
  }

  static description = 'Install a MCP server'

  static examples = [
    '<%= config.bin %> <%= command.id %> server-name',
    '<%= config.bin %> <%= command.id %> server-name --client claude',
    '<%= config.bin %> <%= command.id %> server-name --client continue',
  ]

  static flags = {
    client: Flags.string({
      char: 'c',
      description: 'Target MCP client for server installation',
      options: ['claude', 'continue'],
      default: 'claude',
    }),
  }

  static aliases = ['i']

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Install)

    this.log(`Installing MCP server: ${args.server}\nwith client: ${flags.client}`)
  }
}
