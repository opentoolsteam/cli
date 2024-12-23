import type { MCPServerType } from '../types.js'

export const servers: MCPServerType[] = [
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
]