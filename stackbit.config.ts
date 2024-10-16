import { defineStackbitConfig } from '@stackbit/types';

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'custom',
  nodeVersion: '18',
  contentSources: [
    {
      name: 'content',
      type: 'files',
      rootPath: 'content',
    },
  ],
  devCommand: 'npm run dev',
  buildCommand: 'npm run build',
  deployCommand: 'npm run deploy',
  publishDir: 'dist',
});