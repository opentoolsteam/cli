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
      package: "mcp-server-fetch",
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
    id: "gdrive-ref",
    name: "Google Drive",
    description: "File access and search capabilities for Google Drive. A Model Context Protocol reference server.",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    isOfficial: false,
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/gdrive",
    distribution: {
      type: "npm",
      package: "@modelcontextprotocol/server-gdrive",
    },
    license: "MIT",
    runtime: "node",
    config: {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-gdrive"],
      env: {}
    }
  },
  {
    id: "git-ref",
    name: "Git",
    description: "Tools to read, search, and manipulate Git repositories. A Model Context Protocol reference server.",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    isOfficial: false,
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/git",
    distribution: {
      type: "pip",
      package: "mcp-server-git",
    },
    license: "MIT",
    runtime: "python",
    config: {
      command: "uvx",
      args: ["mcp-server-git", "--repository"],
      runtimeArgs: {
        description: "Filepath to the Git repository",
        default: ["path/to/git/repo"],
        multiple: false
      },
      env: {}
    }
  },
  {
    id: "github-ref",
    name: "GitHub",
    description: "GitHub repository access and management. A Model Context Protocol reference server.",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    isOfficial: false,
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/github",
    distribution: {
      type: "npm",
      package: "@modelcontextprotocol/server-github",
    },
    license: "MIT",
    runtime: "node",
    config: {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-github"],
      env: {
        "GITHUB_PERSONAL_ACCESS_TOKEN": {
          description: "Your GitHub Personal Access Token. Find it at: https://github.com/settings/tokens",
        }
      }
    }
  },
  {
    id: "gitlab-ref",
    name: "GitLab",
    description: "GitLab project access and management. A Model Context Protocol reference server.",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    isOfficial: false,
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/gitlab",
    distribution: {
      type: "npm",
      package: "@modelcontextprotocol/server-gitlab",
    },
    license: "MIT",
    runtime: "node",
    config: {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-gitlab"],
      env: {
        "GITLAB_PERSONAL_ACCESS_TOKEN": {
          description: "Your GitLab Personal Access Token. See: https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html",
        },
        "GITLAB_API_URL": {
          description: "GitLab API URL. Optional, defaults to gitlab.com, configure for self-hosted instances.",
          required: false
        }
      }
    }
  },
  {
    id: "google-maps-ref",
    name: "Google Maps",
    description: "Google Maps location services, directions, and place details. A Model Context Protocol reference server.",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    isOfficial: false,
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/google-maps",
    distribution: {
      type: "npm",
      package: "@modelcontextprotocol/server-google-maps",
    },
    license: "MIT",
    runtime: "node",
    config: {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-google-maps"],
      env: {
        "GOOGLE_MAPS_API_KEY": {
          description: "Your Google Maps API key. Find it at: https://console.cloud.google.com/google/maps-apis/credentials",
        }
      }
    }
  },
  {
    id: "memory-ref",
    name: "Memory",
    description: "Knowledge graph-based persistent memory system. A Model Context Protocol reference server.",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    isOfficial: false,
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/memory",
    distribution: {
      type: "npm",
      package: "@modelcontextprotocol/server-memory",
    },
    license: "MIT",
    runtime: "node",
    config: {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-memory"],
      env: {}
    }
  },
  {
    id: "postgres-ref",
    name: "PostgreSQL",
    description: "Read-only local PostgreSQL database access with schema inspection. A Model Context Protocol reference server.",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    isOfficial: false,
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/postgres",
    distribution: {
      type: "npm",
      package: "@modelcontextprotocol/server-postgres",
    },
    license: "MIT",
    runtime: "node",
    config: {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-postgres"],
      runtimeArgs: {
        description: "PostgreSQL connection string (Replace /mydb with your database name)",
        default: ["postgresql://localhost/mydb"],
        multiple: false
      },
      env: {}
    }
  },
  {
    id: "puppeteer-ref",
    name: "Puppeteer",
    description: "Browser automation and web scraping using Puppeteer. A Model Context Protocol reference server.",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    isOfficial: false,
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer",
    distribution: {
      type: "npm",
      package: "@modelcontextprotocol/server-puppeteer",
    },
    license: "MIT",
    runtime: "node",
    config: {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-puppeteer"],
      env: {}
    }
  },
  {
    id: "sentry-ref",
    name: "Sentry",
    description: "Retrieving and analyzing issues from Sentry.io. A Model Context Protocol reference server.",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    isOfficial: false,
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/sentry",
    distribution: {
      type: "pip",
      package: "mcp-server-sentry",
    },
    license: "MIT",
    runtime: "python",
    config: {
      command: "uvx",
      args: ["mcp-server-sentry", "--auth-token"],
      runtimeArgs: {
        description: "Your Sentry authentication token",
        default: ["YOUR_SENTRY_TOKEN"],
        multiple: false
      },
      env: {}
    }
  },
  {
    id: "sequential-thinking-ref",
    name: "Sequential Thinking",
    description: "Dynamic and reflective problem-solving through thought sequences. A Model Context Protocol reference server.",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    isOfficial: false,
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking",
    distribution: {
      type: "npm",
      package: "@modelcontextprotocol/server-sequential-thinking",
    },
    license: "MIT",
    runtime: "node",
    config: {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-sequential-thinking"],
      env: {}
    }
  },
  {
    id: "slack-ref",
    name: "Slack",
    description: "Slack channel management and messaging capabilities. A Model Context Protocol reference server.",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    isOfficial: false,
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/slack",
    distribution: {
      type: "npm",
      package: "@modelcontextprotocol/server-slack",
    },
    license: "MIT",
    runtime: "node",
    config: {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-slack"],
      env: {
        "SLACK_BOT_TOKEN": {
          description: "Your Slack bot token. Find it at: https://api.slack.com/apps",
        },
        "SLACK_TEAM_ID": {
          description: "Your Slack team/workspace ID, See: https://slack.com/help/articles/221769328-Locate-your-Slack-URL-or-ID#find-your-workspace-or-org-id",
        }
      }
    }
  },
  {
    id: "sqlite-ref",
    name: "SQLite",
    description: "Local SQLite database interaction and business intelligence capabilities. A Model Context Protocol reference server.",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    isOfficial: false,
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite",
    distribution: {
      type: "pip",
      package: "mcp-server-sqlite",
    },
    license: "MIT",
    runtime: "python",
    config: {
      command: "uvx",
      args: ["mcp-server-sqlite", "--db-path"],
      runtimeArgs: {
        description: "Path to your SQLite database file",
        default: ["~/test.db"],
        multiple: false
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
  {
    id: "time-ref",
    name: "Time",
    description: "Time and timezone conversion capabilities. A Model Context Protocol reference server.",
    publisher: {
      id: "modelcontextprotocol",
      name: "Anthropic, PBC",
      url: "https://modelcontextprotocol.io/",
    },
    isOfficial: false,
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/time",
    distribution: {
      type: "pip",
      package: "mcp-server-time",
    },
    license: "MIT",
    runtime: "python",
    config: {
      command: "uvx",
      args: ["mcp-server-time"],
      env: {}
    }
  },
]
