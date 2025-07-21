/// <reference types='vitest'/>
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import externalGlobals from 'rollup-plugin-external-globals';

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      tsconfigPaths(),
      externalGlobals(mode === 'production' ? { './mocks/msw/browsers': '{}' } : {}),
    ],
    build: {
      sourcemap: true,
    },
    server: {
      host: true,
      port: 5173,
      headers: {
        'Service-Worker-Allowed': '/',
      },
    },
    test: {
      watch: false,
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest.setup.ts',
      coverage: {
        all: true,
        reportOnFailure: true,
        provider: 'v8',
        reporter: ['text', 'html', 'json', ['lcov', { projectRoot: './' }]],
        include: ['src'],
        exclude: ['src/**/*.d.ts', 'src/mocks'],
      },
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  };
});
