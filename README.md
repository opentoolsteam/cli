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
opentools/0.0.7 darwin-arm64 node-v22.10.0
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

_See code: [src/commands/install.ts](https://github.com/opentoolsteam/cli/blob/v0.0.7/src/commands/install.ts)_
<!-- commandsstop -->
