import {z} from 'zod'

export const EnvVariable = z.object({
  description: z.string(),
  required: z.boolean().default(true).optional(),
})

export const MCPServerRuntimeArg = z.object({
  default: z.any().optional(),
  description: z.string(),
  multiple: z.boolean().optional().default(false),
})

export const MCPServerConfig = z.object({
  args: z.array(z.string()),
  command: z.string(),
  env: z.record(z.string(), EnvVariable),
  runtimeArgs: MCPServerRuntimeArg.optional(),
})

export const MCPServer = z.object({
  config: MCPServerConfig,
  description: z.string(),
  distribution: z.object({
    package: z.string().optional(),
    source: z.object({
      binary: z.string(),
      path: z.string()
    }).optional(),
    type: z.enum(['npm', 'pip', 'source']),
  }),
  id: z.string().regex(/^[\da-z-]+$/),
  isOfficial: z.boolean().default(false),
  license: z.string().optional(),
  name: z.string(),
  publisher: z.object({
    id: z.string().regex(/^[\da-z-]+$/),
    name: z.string(),
    url: z.string().url(),
  }),
  runtime: z.enum(['node', 'python', 'go', 'other']),
  sourceUrl: z.string().url(),
})

// Infer types from schemas
export type MCPServerType = z.infer<typeof MCPServer>
