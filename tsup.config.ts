import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/types/index.ts',
    'src/schemas/index.ts'
  ],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.js' : '.cjs',
    }
  },
});