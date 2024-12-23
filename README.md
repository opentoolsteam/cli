opentools
=================

The easiest way to install MCP servers


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/opentools.svg)](https://npmjs.org/package/opentools)
[![Downloads/week](https://img.shields.io/npm/dw/opentools.svg)](https://npmjs.org/package/opentools)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g opentools
$ opentools COMMAND
running command...
$ opentools (--version)
opentools/0.0.4 darwin-arm64 node-v22.10.0
$ opentools --help [COMMAND]
USAGE
  $ opentools COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`opentools help [COMMAND]`](#opentools-help-command)
* [`opentools plugins`](#opentools-plugins)
* [`opentools plugins:add PLUGIN`](#opentools-pluginsadd-plugin)
* [`opentools plugins:inspect PLUGIN...`](#opentools-pluginsinspect-plugin)
* [`opentools plugins:install PLUGIN`](#opentools-pluginsinstall-plugin)
* [`opentools plugins:link PATH`](#opentools-pluginslink-path)
* [`opentools plugins:remove [PLUGIN]`](#opentools-pluginsremove-plugin)
* [`opentools plugins:reset`](#opentools-pluginsreset)
* [`opentools plugins:uninstall [PLUGIN]`](#opentools-pluginsuninstall-plugin)
* [`opentools plugins:unlink [PLUGIN]`](#opentools-pluginsunlink-plugin)
* [`opentools plugins:update`](#opentools-pluginsupdate)

## `opentools help [COMMAND]`

Display help for opentools.

```
USAGE
  $ opentools help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for opentools.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.19/src/commands/help.ts)_

## `opentools plugins`

List installed plugins.

```
USAGE
  $ opentools plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ opentools plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.22/src/commands/plugins/index.ts)_

## `opentools plugins:add PLUGIN`

Installs a plugin into opentools.

```
USAGE
  $ opentools plugins:add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into opentools.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the OPENTOOLS_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the OPENTOOLS_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ opentools plugins:add

EXAMPLES
  Install a plugin from npm registry.

    $ opentools plugins:add myplugin

  Install a plugin from a github url.

    $ opentools plugins:add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ opentools plugins:add someuser/someplugin
```

## `opentools plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ opentools plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ opentools plugins:inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.22/src/commands/plugins/inspect.ts)_

## `opentools plugins:install PLUGIN`

Installs a plugin into opentools.

```
USAGE
  $ opentools plugins:install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into opentools.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the OPENTOOLS_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the OPENTOOLS_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ opentools plugins:add

EXAMPLES
  Install a plugin from npm registry.

    $ opentools plugins:install myplugin

  Install a plugin from a github url.

    $ opentools plugins:install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ opentools plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.22/src/commands/plugins/install.ts)_

## `opentools plugins:link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ opentools plugins:link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ opentools plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.22/src/commands/plugins/link.ts)_

## `opentools plugins:remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ opentools plugins:remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ opentools plugins:unlink
  $ opentools plugins:remove

EXAMPLES
  $ opentools plugins:remove myplugin
```

## `opentools plugins:reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ opentools plugins:reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.22/src/commands/plugins/reset.ts)_

## `opentools plugins:uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ opentools plugins:uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ opentools plugins:unlink
  $ opentools plugins:remove

EXAMPLES
  $ opentools plugins:uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.22/src/commands/plugins/uninstall.ts)_

## `opentools plugins:unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ opentools plugins:unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ opentools plugins:unlink
  $ opentools plugins:remove

EXAMPLES
  $ opentools plugins:unlink myplugin
```

## `opentools plugins:update`

Update installed plugins.

```
USAGE
  $ opentools plugins:update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.22/src/commands/plugins/update.ts)_
<!-- commandsstop -->
