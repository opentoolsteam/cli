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
opentools/0.0.8 darwin-arm64 node-v22.10.0
$ opentools --help [COMMAND]
USAGE
  $ opentools COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`opentools help [COMMAND]`](#opentools-help-command)
* [`opentools i SERVER`](#opentools-i-server)
* [`opentools install SERVER`](#opentools-install-server)
* [`opentools list`](#opentools-list)
* [`opentools un SERVER`](#opentools-un-server)
* [`opentools uninstall SERVER`](#opentools-uninstall-server)

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

## `opentools i SERVER`

Install an MCP server

```
USAGE
  $ opentools i SERVER [-c claude|continue]

ARGUMENTS
  SERVER  name of the MCP server to install

FLAGS
  -c, --client=<option>  [default: claude] Install the MCP server to this client
                         <options: claude|continue>

DESCRIPTION
  Install an MCP server

ALIASES
  $ opentools i

EXAMPLES
  $ opentools i server-name

  $ opentools i server-name --client claude

  $ opentools i server-name --client continue
```

## `opentools install SERVER`

Install an MCP server

```
USAGE
  $ opentools install SERVER [-c claude|continue]

ARGUMENTS
  SERVER  name of the MCP server to install

FLAGS
  -c, --client=<option>  [default: claude] Install the MCP server to this client
                         <options: claude|continue>

DESCRIPTION
  Install an MCP server

ALIASES
  $ opentools i

EXAMPLES
  $ opentools install server-name

  $ opentools install server-name --client claude

  $ opentools install server-name --client continue
```

_See code: [src/commands/install.ts](https://github.com/opentoolsteam/cli/blob/v0.0.8/src/commands/install.ts)_

## `opentools list`

List installed servers for the specified client

```
USAGE
  $ opentools list [-c claude|continue]

FLAGS
  -c, --client=<option>  [default: claude] client to check (claude or continue)
                         <options: claude|continue>

DESCRIPTION
  List installed servers for the specified client

EXAMPLES
  $ opentools list

  $ opentools list --client=continue
```

_See code: [src/commands/list.ts](https://github.com/opentoolsteam/cli/blob/v0.0.8/src/commands/list.ts)_

## `opentools un SERVER`

Uninstall an MCP server

```
USAGE
  $ opentools un SERVER [-c claude|continue]

ARGUMENTS
  SERVER  name of the MCP server to uninstall

FLAGS
  -c, --client=<option>  [default: claude] Uninstall the MCP server from this client
                         <options: claude|continue>

DESCRIPTION
  Uninstall an MCP server

ALIASES
  $ opentools un

EXAMPLES
  $ opentools un server-name

  $ opentools un server-name --client claude
```

## `opentools uninstall SERVER`

Uninstall an MCP server

```
USAGE
  $ opentools uninstall SERVER [-c claude|continue]

ARGUMENTS
  SERVER  name of the MCP server to uninstall

FLAGS
  -c, --client=<option>  [default: claude] Uninstall the MCP server from this client
                         <options: claude|continue>

DESCRIPTION
  Uninstall an MCP server

ALIASES
  $ opentools un

EXAMPLES
  $ opentools uninstall server-name

  $ opentools uninstall server-name --client claude
```

_See code: [src/commands/uninstall.ts](https://github.com/opentoolsteam/cli/blob/v0.0.8/src/commands/uninstall.ts)_
<!-- commandsstop -->
