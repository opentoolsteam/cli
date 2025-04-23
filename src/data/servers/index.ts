import type { MCPServerType } from '../types.js'

export const servers: MCPServerType[] = [
  {
    config:
      {
        args: ['artemis-mcp'],
        command: 'uvx',
        env: {
          ARTEMIS_API_KEY: {
            description: 'Your Artemis API key from https://app.artemis.xyz/settings.',
          }
        }
    },
    description: 'Pull the latest fundamental crypto data from Artemis natively into your favorite chatbot interface.',
    distribution: {
      package: 'artemis-mcp',
      type: 'pip',
    },
    id: 'artemis',
    isOfficial: true,
    license: 'MIT',
    name: 'Artemis Analytics',
    publisher: {
      id: 'Artemis-xyz',
      name: 'Artemis Analytics Inc.',
      url: 'https://www.artemis.xyz/',
    },
    runtime: 'python',
    sourceUrl: 'https://github.com/Artemis-xyz/artemis-mcp'
  },
  {
    config: {
      args: ["-y", "@modelcontextprotocol/server-aws-kb-retrieval"],
      command: "npx",
      env: {
        "AWS_ACCESS_KEY_ID": {
          description: "Your AWS access key ID.",
        },
        "AWS_REGION": {
          description: "Your AWS region.",
        },
        "AWS_SECRET_ACCESS_KEY": {
          description: "Your AWS secret access key.",
        },
      }
    },
    description: "Retrieval from AWS Knowledge Base using Bedrock Agent Runtime. A Model Context Protocol reference server.",
    distribution: {
      package: "@modelcontextprotocol/server-aws-kb-retrieval",
      type: "npm",
    },
    id: "aws-kb-retrieval-server-ref",
    isOfficial: false,
    license: "MIT",
    name: "AWS Knowledge Base",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    runtime: "node",
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/aws-kb-retrieval-server"
  },
  {
    config: {
      args: [],
      command: "${HOME}/go/bin/axiom-mcp", // eslint-disable-line no-template-curly-in-string
      env: {
        "AXIOM_DATASETS_BURST": {
          description: "The burst limit for datasets.",
          required: false,
        },
        "AXIOM_DATASETS_RATE": {
          description: "The rate limit for datasets.",
          required: false,
        },
        "AXIOM_ORG_ID": {
          description: "Your Axiom organization ID.",
        },
        "AXIOM_QUERY_BURST": {
          description: "The burst limit for queries.",
          required: false,
        },
        "AXIOM_QUERY_RATE": {
          description: "The rate limit for queries.",
          required: false,
        },
        "AXIOM_TOKEN": {
          description: "Your Axiom token.",
        },
        "AXIOM_URL": {
          description: "Your Axiom URL.",
        },
      }
    },
    description: "Query and analyze your Axiom logs, traces, and all other event data in natural language",
    distribution: {
      source: {
        binary: "axiom-mcp",
        path: "github.com/axiomhq/axiom-mcp@latest"
      },
      type: "source"
    },
    id: "axiom",
    isOfficial: true,
    license: "MIT",
    name: "Axiom",
    publisher: {
      id: "axiomhq",
      name: "Axiom, Inc.",
      url: "https://axiom.co",
    },
    runtime: "go",
    sourceUrl: "https://github.com/axiomhq/mcp-server-axiom"
  },
  {
    config: {
      args: ["-y", "@modelcontextprotocol/server-brave-search"],
      command: "npx",
      env: {
        "BRAVE_API_KEY": {
          description: "Your Brave Search API key. See: https://brave.com/search/api",
        }
      }
    },
    description: "Web and local search using Brave's Search API. A Model Context Protocol reference server.",
    distribution: {
      package: "@modelcontextprotocol/server-brave-search",
      type: "npm",
    },
    id: "brave-search-ref",
    isOfficial: false,
    license: "MIT",
    name: "Brave Search",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    runtime: "node",
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search"
  },
  {
    config: {
      args: ["-y", "@browserbasehq/mcp-browserbase"],
      command: "npx",
      env: {
        "BROWSERBASE_API_KEY": {
          description: "Your Browserbase API key. Find it at: https://www.browserbase.com/settings",
        },
        "BROWSERBASE_PROJECT_ID": {
          description: "Your Browserbase project ID. Find it at: https://www.browserbase.com/settings",
        },
      }
    },
    description: "Automate browser interactions in the cloud (e.g. web navigation, data extraction, form filling, and more)",
    distribution: {
      package: "@browserbasehq/mcp-browserbase",
      type: "npm",
    },
    id: "browserbase",
    isOfficial: true,
    license: "MIT",
    name: "Browserbase",
    publisher: {
      id: "browserbase",
      name: "Browserbase Inc.",
      url: "https://www.browserbase.com/",
    },
    runtime: "node",
    sourceUrl: "https://github.com/browserbase/mcp-server-browserbase/tree/main/browserbase"
  },
  {
    config: {
      args: ["chakra-mcp"],
      command: "uvx",
      env: {
        "db_session_key": {
          description: "Your Chakra database session key. Find it at: https://console.chakra.dev/settings",
        }
      }
    },
    description: "Integrate data from the open data marketplace and your organization natively into chat.",
    distribution: {
      package: "chakra-mcp",
      type: "pip",
    },
    id: "chakra",
    isOfficial: true,
    license: "MIT",
    name: "Chakra",
    publisher: {
      id: "Chakra-Network",
      name: "Chakra Digital Labs, Inc.",
      url: "https://chakra.dev/",
    },
    runtime: "python",
    sourceUrl: "https://github.com/Chakra-Network/mcp-server"
  },
  {
    config: {
      args: ["-y", "@modelcontextprotocol/server-everart"],
      command: "npx",
      env: {
        "EVERART_API_KEY": {
          description: "Your EverArt API key. Find it at: https://www.everart.ai/api",
        }
      }
    },
    description: "AI image generation using various models using EverArt. A Model Context Protocol reference server.",
    distribution: {
      package: "@modelcontextprotocol/server-everart",
      type: "npm",
    },
    id: "everart-ref",
    isOfficial: false,
    license: "MIT",
    name: "EverArt",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    runtime: "node",
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/everart"
  },
  {
    config: {
      args: ["-y", "@modelcontextprotocol/server-everything"],
      command: "npx",
      env: {}
    },
    description: "This MCP server attempts to exercise all the features of the MCP protocol. It is not intended to be a useful server, but rather a test server for builders of MCP clients. A Model Context Protocol reference server.",
    distribution: {
      package: "@modelcontextprotocol/server-everything",
      type: "npm",
    },
    id: "everything-ref",
    isOfficial: false,
    license: "MIT",
    name: "Everything",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    runtime: "node",
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/everything"
  },
  {
    config: {
      args: ["-y", "exa-mcp-server"],
      command: "npx",
      env: {
        "EXA_API_KEY": {
          description: "Your Exa API key. Find it at: https://dashboard.exa.ai/api-keys",
        }
      }
    },
    description: "This setup allows AI models to get real-time web information in a safe and controlled way.",
    distribution: {
      package: "exa-mcp-server",
      type: "npm",
    },
    id: "exa",
    isOfficial: true,
    name: "Exa Search",
    publisher: {
      id: "exa-labs",
      name: "Exa Labs, Inc.",
      url: "https://exa.ai",
    },
    runtime: "node",
    sourceUrl: "https://github.com/exa-labs/exa-mcp-server"
  },
  {
    config: {
      args: ["mcp-server-fetch"],
      command: "uvx",
      env: {}
    },
    description: "Web content fetching and conversion for efficient LLM usage. A Model Context Protocol reference server.",
    distribution: {
      package: "mcp-server-fetch",
      type: "pip",
    },
    id: "fetch-ref",
    isOfficial: false,
    license: "MIT",
    name: "Fetch",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    runtime: "python",
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/fetch"
  },
  {
    config: {
      args: ["-y", "@modelcontextprotocol/server-filesystem"],
      command: "npx",
      env: {},
      runtimeArgs: {
        default: ["/Users/username/Desktop"],
        description: "Directories that the server will be allowed to access",
        multiple: true
      }
    },
    description: "Local filesystem access with configurable allowed paths. A Model Context Protocol reference server.",
    distribution: {
      package: "@modelcontextprotocol/server-filesystem",
      type: "npm",
    },
    id: "filesystem-ref",
    isOfficial: false,
    license: "MIT",
    name: "Filesystem",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    runtime: "node",
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem"
  },
  {
    config: {
      args: ["-y", "@modelcontextprotocol/server-gdrive"],
      command: "npx",
      env: {}
    },
    description: "File access and search capabilities for Google Drive. A Model Context Protocol reference server.",
    distribution: {
      package: "@modelcontextprotocol/server-gdrive",
      type: "npm",
    },
    id: "gdrive-ref",
    isOfficial: false,
    license: "MIT",
    name: "Google Drive",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    runtime: "node",
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/gdrive"
  },
  {
    config: {
      args: ["mcp-server-git", "--repository"],
      command: "uvx",
      env: {},
      runtimeArgs: {
        default: ["path/to/git/repo"],
        description: "Filepath to the Git repository",
        multiple: false
      }
    },
    description: "Tools to read, search, and manipulate Git repositories. A Model Context Protocol reference server.",
    distribution: {
      package: "mcp-server-git",
      type: "pip",
    },
    id: "git-ref",
    isOfficial: false,
    license: "MIT",
    name: "Git",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    runtime: "python",
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/git"
  },
  {
    config: {
      args: ["-y", "@modelcontextprotocol/server-github"],
      command: "npx",
      env: {
        "GITHUB_PERSONAL_ACCESS_TOKEN": {
          description: "Your GitHub Personal Access Token. Find it at: https://github.com/settings/tokens",
        }
      }
    },
    description: "GitHub repository access and management. A Model Context Protocol reference server.",
    distribution: {
      package: "@modelcontextprotocol/server-github",
      type: "npm",
    },
    id: "github-ref",
    isOfficial: false,
    license: "MIT",
    name: "GitHub",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    runtime: "node",
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/github"
  },
  {
    config: {
      args: ["-y", "@modelcontextprotocol/server-gitlab"],
      command: "npx",
      env: {
        "GITLAB_API_URL": {
          description: "GitLab API URL. Optional, defaults to gitlab.com, configure for self-hosted instances.",
          required: false
        },
        "GITLAB_PERSONAL_ACCESS_TOKEN": {
          description: "Your GitLab Personal Access Token. See: https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html",
        }
      }
    },
    description: "GitLab project access and management. A Model Context Protocol reference server.",
    distribution: {
      package: "@modelcontextprotocol/server-gitlab",
      type: "npm",
    },
    id: "gitlab-ref",
    isOfficial: false,
    license: "MIT",
    name: "GitLab",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    runtime: "node",
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/gitlab"
  },
  {
    config: {
      args: ["-y", "@modelcontextprotocol/server-google-maps"],
      command: "npx",
      env: {
        "GOOGLE_MAPS_API_KEY": {
          description: "Your Google Maps API key. Find it at: https://console.cloud.google.com/google/maps-apis/credentials",
        }
      }
    },
    description: "Google Maps location services, directions, and place details. A Model Context Protocol reference server.",
    distribution: {
      package: "@modelcontextprotocol/server-google-maps",
      type: "npm",
    },
    id: "google-maps-ref",
    isOfficial: false,
    license: "MIT",
    name: "Google Maps",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    runtime: "node",
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/google-maps"
  },
  {
    config: {
      args: ["-y", "@modelcontextprotocol/server-memory"],
      command: "npx",
      env: {}
    },
    description: "Knowledge graph-based persistent memory system. A Model Context Protocol reference server.",
    distribution: {
      package: "@modelcontextprotocol/server-memory",
      type: "npm",
    },
    id: "memory-ref",
    isOfficial: false,
    license: "MIT",
    name: "Memory",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    runtime: "node",
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/memory"
  },
  {
    config: {
      args: ["-y", "@executeautomation/playwright-mcp-server"],
      command: "npx",
      env: {}
    },
    description: "This server enables LLMs to interact with web pages, take screenshots, and execute JavaScript in a real browser environment using Playwright.",
    distribution: {
      package: "@executeautomation/playwright-mcp-server",
      type: "npm",
    },
    id: "playwright-mcp-server",
    isOfficial: false,
    license: "MIT",
    name: "Playwright",
    publisher: {
      id: "executeautomation",
      name: "ExecuteAutomation",
      url: "https://github.com/executeautomation",
    },
    runtime: "node",
    sourceUrl: "https://github.com/executeautomation/mcp-playwright"
  },
  {
    config: {
      args: ["-y", "@modelcontextprotocol/server-postgres"],
      command: "npx",
      env: {},
      runtimeArgs: {
        default: ["postgresql://localhost/mydb"],
        description: "PostgreSQL connection string (Replace /mydb with your database name)",
        multiple: false
      }
    },
    description: "Read-only local PostgreSQL database access with schema inspection. A Model Context Protocol reference server.",
    distribution: {
      package: "@modelcontextprotocol/server-postgres",
      type: "npm",
    },
    id: "postgres-ref",
    isOfficial: false,
    license: "MIT",
    name: "PostgreSQL",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    runtime: "node",
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/postgres"
  },
  {
    config: {
      args: ["-y", "@modelcontextprotocol/server-puppeteer"],
      command: "npx",
      env: {}
    },
    description: "Browser automation and web scraping using Puppeteer. A Model Context Protocol reference server.",
    distribution: {
      package: "@modelcontextprotocol/server-puppeteer",
      type: "npm",
    },
    id: "puppeteer-ref",
    isOfficial: false,
    license: "MIT",
    name: "Puppeteer",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    runtime: "node",
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer"
  },
  {
    config: {
      args: ["mcp-server-sentry", "--auth-token"],
      command: "uvx",
      env: {},
      runtimeArgs: {
        default: ["YOUR_SENTRY_TOKEN"],
        description: "Your Sentry authentication token",
        multiple: false
      }
    },
    description: "Retrieving and analyzing issues from Sentry.io. A Model Context Protocol reference server.",
    distribution: {
      package: "mcp-server-sentry",
      type: "pip",
    },
    id: "sentry-ref",
    isOfficial: false,
    license: "MIT",
    name: "Sentry",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    runtime: "python",
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/sentry"
  },
  {
    config: {
      args: ["-y", "@modelcontextprotocol/server-sequential-thinking"],
      command: "npx",
      env: {}
    },
    description: "Dynamic and reflective problem-solving through thought sequences. A Model Context Protocol reference server.",
    distribution: {
      package: "@modelcontextprotocol/server-sequential-thinking",
      type: "npm",
    },
    id: "sequential-thinking-ref",
    isOfficial: false,
    license: "MIT",
    name: "Sequential Thinking",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    runtime: "node",
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking"
  },
  {
    config: {
      args: ["-y", "@modelcontextprotocol/server-slack"],
      command: "npx",
      env: {
        "SLACK_BOT_TOKEN": {
          description: "Your Slack bot token. Find it at: https://api.slack.com/apps",
        },
        "SLACK_TEAM_ID": {
          description: "Your Slack team/workspace ID, See: https://slack.com/help/articles/221769328-Locate-your-Slack-URL-or-ID#find-your-workspace-or-org-id",
        }
      }
    },
    description: "Slack channel management and messaging capabilities. A Model Context Protocol reference server.",
    distribution: {
      package: "@modelcontextprotocol/server-slack",
      type: "npm",
    },
    id: "slack-ref",
    isOfficial: false,
    license: "MIT",
    name: "Slack",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    runtime: "node",
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/slack"
  },
  {
    config: {
      args: ["mcp-server-sqlite", "--db-path"],
      command: "uvx",
      env: {},
      runtimeArgs: {
        default: ["~/test.db"],
        description: "Path to your SQLite database file",
        multiple: false
      }
    },
    description: "Local SQLite database interaction and business intelligence capabilities. A Model Context Protocol reference server.",
    distribution: {
      package: "mcp-server-sqlite",
      type: "pip",
    },
    id: "sqlite-ref",
    isOfficial: false,
    license: "MIT",
    name: "SQLite",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    runtime: "python",
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite"
  },
  {
    config: {
      args: ['-y', '@browserbasehq/mcp-stagehand'],
      command: 'npx',
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
    },
    description: "This server enables LLMs to interact with web pages, perform actions, extract data, and observe possible actions in a real browser environment",
    distribution: {
      package: '@browserbasehq/mcp-stagehand',
      type: 'npm',
    },
    id: "stagehand",
    isOfficial: true,
    license: "MIT",
    name: "Stagehand by Browserbase",
    publisher: {
      id: "browserbase",
      name: "Browserbase Inc.",
      url: "https://www.browserbase.com/",
    },
    runtime: "node",
    sourceUrl: "https://github.com/browserbase/mcp-server-browserbase/tree/main/stagehand"
  },
  {
    config: {
      args: ["mcp-server-time"],
      command: "uvx",
      env: {}
    },
    description: "Time and timezone conversion capabilities. A Model Context Protocol reference server.",
    distribution: {
      package: "mcp-server-time",
      type: "pip",
    },
    id: "time-ref",
    isOfficial: false,
    license: "MIT",
    name: "Time",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    runtime: "python",
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/time"
  },
  {
    config: {
      args: ["-y", "@alanagoyal/mcp-server@latest"],
      command: "npx",
      env: {}
    },
    description: "a model context protocol (mcp) server that provides ai assistants with information about alana goyal and basecase, based on alanagoyal.com and basecase.vc. the server integrates with popular ai development environments like windsurf and cursor.",
    distribution: {
      package: "@alanagoyal/mcp-server",
      type: "npm",
    },
    id: "alanagoyal",
    isOfficial: false,
    license: "ISC",
    name: "Alana Goyal",
    publisher: {
      id: "alanagoyal",
      name: "Alana Goyal",
      url: "https://alanagoyal.com/",
    },
    runtime: "node",
    sourceUrl: "https://github.com/alanagoyal/mcp-server"
  },
]
