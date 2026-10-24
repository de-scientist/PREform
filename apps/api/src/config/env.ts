import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { config as loadDotenv } from 'dotenv';
import { z } from 'zod';

const envFiles = [
  resolve(process.cwd(), '.env'),
  resolve(process.cwd(), '..', '..', '.env'),
];
const envFile = envFiles.find(existsSync);

if (envFile) {
  loadDotenv({ path: envFile });
}

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  WEB_ORIGIN: z.string().url().default('http://localhost:3000'),
  DATABASE_URL: z
    .string()
    .url()
    .refine(
      (value) =>
        ['postgres:', 'postgresql:'].includes(new URL(value).protocol),
      'DATABASE_URL must use PostgreSQL',
    ),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((issue) => `${issue.path.join('.') || 'environment'}: ${issue.message}`)
    .join('; ');
  throw new Error(`Invalid environment configuration: ${issues}`);
}

export const env = parsed.data;
