import {z} from 'zod'

export const EnvVariable = z.object({
  description: z.string(),
  required: z.boolean().default(true).optional(),
})

export const MCPServerRuntimeArg = z.object({
  description: z.string(),
  default: z.any().optional(),
  multiple: z.boolean().optional().default(false),
})

export const MCPServerConfig = z.object({
  command: z.string(),
  args: z.array(z.string()),
  runtimeArgs: MCPServerRuntimeArg.optional(),
  env: z.record(z.string(), EnvVariable),
})

export const MCPServer = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  description: z.string(),
  publisher: z.object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    name: z.string(),
    url: z.string().url(),
  }),
  isOfficial: z.boolean().default(false),
  sourceUrl: z.string().url(),
  distribution: z.object({
    type: z.enum(['npm', 'pip', 'source']),
    package: z.string().optional(),
    source: z.object({
      path: z.string(),
      binary: z.string()
    }).optional(),
  }),
  license: z.string().optional(),
  runtime: z.enum(['node', 'python', 'go', 'other']),
  config: MCPServerConfig,
})

// Infer types from schemas
export type MCPServerType = z.infer<typeof MCPServer>
