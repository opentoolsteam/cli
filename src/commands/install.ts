import {Args, Command, Flags} from '@oclif/core'

export default class Install extends Command {
  static args = {
    package_name: Args.string({
      description: 'package to install',
      required: true,
    }),
  }

  static description = 'Install a package'

  static examples = [
    '<%= config.bin %> <%= command.id %> package-name',
  ]

  static flags = {
    force: Flags.boolean({char: 'f'}),
    name: Flags.string({char: 'n', description: 'name to print'}),
  }

  static aliases = ['i']

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Install)

    const name = flags.name ?? 'world'
    this.log(`hello ${name} from /Users/qin/Projects/cli/src/commands/install.ts!`)
    if (args.package_name && flags.force) {
      this.log(`you input --force and --package_name: ${args.package_name}`)
    }
  }
}
