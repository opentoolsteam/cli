import type { MCPServerType } from '../types.js'

export const servers: MCPServerType[] = [
  {
    id: "aws-kb-retrieval-server-ref",
    name: "AWS Knowledge Base",
    description: "Retrieval from AWS Knowledge Base using Bedrock Agent Runtime. A Model Context Protocol reference server.",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    isOfficial: false,
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/aws-kb-retrieval-server",
    distribution: {
      type: "npm",
      package: "@modelcontextprotocol/server-aws-kb-retrieval",
    },
    license: "MIT",
    runtime: "node",
    config: {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-aws-kb-retrieval"],
      env: {
        "AWS_ACCESS_KEY_ID": {
          description: "Your AWS access key ID.",
        },
        "AWS_SECRET_ACCESS_KEY": {
          description: "Your AWS secret access key.",
        },
        "AWS_REGION": {
          description: "Your AWS region.",
        },
      }
    }
  },
  {
    id: "axiom",
    name: "Axiom",
    description: "Query and analyze your Axiom logs, traces, and all other event data in natural language",
    publisher: {
      id: "axiomhq",
      name: "Axiom, Inc.",
      url: "https://axiom.co",
    },
    isOfficial: true,
    sourceUrl: "https://github.com/axiomhq/mcp-server-axiom",
    distribution: {
      type: "source",
    },
    license: "MIT",
    runtime: "go",
    config: {
      command: "",
      args: [],
      env: {
        "AXIOM_TOKEN": {
          description: "Your Axiom token.",
        },
        "AXIOM_URL": {
          description: "Your Axiom URL.",
        },
        "AXIOM_ORG_ID": {
          description: "Your Axiom organization ID.",
        },
        "AXIOM_QUERY_RATE": {
          description: "The rate limit for queries.",
          required: false,
        },
        "AXIOM_QUERY_BURST": {
          description: "The burst limit for queries.",
          required: false,
        },
        "AXIOM_DATASETS_RATE": {
          description: "The rate limit for datasets.",
          required: false,
        },
        "AXIOM_DATASETS_BURST": {
          description: "The burst limit for datasets.",
          required: false,
        },
      }
    }
  },
  {
    id: "brave-search-ref",
    name: "Brave Search",
    description: "Web and local search using Brave's Search API. A Model Context Protocol reference server.",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    isOfficial: false,
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search",
    distribution: {
      type: "npm",
      package: "@modelcontextprotocol/server-brave-search",
    },
    license: "MIT",
    runtime: "node",
    config: {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-brave-search"],
      env: {
        "BRAVE_API_KEY": {
          description: "Your Brave Search API key. See: https://brave.com/search/api",
        }
      }
    }
  },
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
  },
  {
    id: "everart-ref",
    name: "EverArt",
    description: "AI image generation using various models using EverArt. A Model Context Protocol reference server.",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    isOfficial: false,
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/everart",
    distribution: {
      type: "npm",
      package: "@modelcontextprotocol/server-everart",
    },
    license: "MIT",
    runtime: "node",
    config: {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-everart"],
      env: {
        "EVERART_API_KEY": {
          description: "Your EverArt API key. Find it at: https://www.everart.ai/api",
        }
      }
    }
  },
  {
    id: "everything-ref",
    name: "Everything",
    description: "This MCP server attempts to exercise all the features of the MCP protocol. It is not intended to be a useful server, but rather a test server for builders of MCP clients. A Model Context Protocol reference server.",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    isOfficial: false,
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/everything",
    distribution: {
      type: "npm",
      package: "@modelcontextprotocol/server-everything",
    },
    license: "MIT",
    runtime: "node",
    config: {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-everything"],
      env: {}
    }
  },
  {
    id: "fetch-ref",
    name: "Fetch",
    description: "Web content fetching and conversion for efficient LLM usage. A Model Context Protocol reference server.",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    isOfficial: false,
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/fetch",
    distribution: {
      type: "pip",
    },
    license: "MIT",
    runtime: "python",
    config: {
      command: "uvx",
      args: ["mcp-server-fetch"],
      env: {}
    }
  },
  {
    id: "filesystem-ref",
    name: "Filesystem",
    description: "Local filesystem access with configurable allowed paths. A Model Context Protocol reference server.",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    isOfficial: false,
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem",
    distribution: {
      type: "npm",
      package: "@modelcontextprotocol/server-filesystem",
    },
    license: "MIT",
    runtime: "node",
    config: {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-filesystem"],
      runtimeArgs: {
        description: "Directories that the server will be allowed to access",
        default: ["/Users/username/Desktop"],
        multiple: true
      },
      env: {}
    }
  },
  {
    id: "stagehand",
    name: "Stagehand by Browserbase",
    description: "This server enables LLMs to interact with web pages, perform actions, extract data, and observe possible actions in a real browser environment",
    publisher: {
      id: "browserbase",
      name: "Browserbase Inc.",
      url: "https://www.browserbase.com/",
    },
    isOfficial: true,
    sourceUrl: "https://github.com/browserbase/mcp-server-browserbase/tree/main/stagehand",
    distribution: {
      type: 'npm',
      package: '@browserbasehq/mcp-stagehand',
    },
    license: "MIT",
    runtime: "node",
    config: {
      command: 'npx',
      args: ['-y', '@browserbasehq/mcp-stagehand'],
      env: {
        'BROWSERBASE_API_KEY': {
          description: 'Your Browserbase API key. Find it at: https://www.browserbase.com/settings',
        },
        'BROWSERBASE_PROJECT_ID': {
          description: 'Your Browserbase project ID. Find it at: https://www.browserbase.com/settings',
        },
        'OPENAI_API_KEY': {
          description: 'Your OpenAI API key. Find it at: https://platform.openai.com/api-keys',
        },
      }
    }
  },
]
