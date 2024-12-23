import {z} from 'zod'

export const EnvVariable = z.object({
  description: z.string(),
  required: z.boolean().default(true).optional(),
})

export const MCPConfig = z.object({
  command: z.string(),
  args: z.array(z.string()),
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
  }),
  license: z.string().optional(),
  runtime: z.enum(['node', 'python', 'go', 'other']),
  config: MCPConfig,
})

// Infer types from schemas
export type MCPServerType = z.infer<typeof MCPServer>
