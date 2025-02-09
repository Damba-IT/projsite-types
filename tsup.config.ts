import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/types/index.ts',
    'src/schemas/index.ts'
  ],
  format: ['esm'],
  dts: {
    compilerOptions: {
      moduleResolution: "node",
      skipLibCheck: true,
      types: ["node"]
    }
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  target: 'node18',
  platform: 'node'
}); 