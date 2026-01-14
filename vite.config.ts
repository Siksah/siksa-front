/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// const isProduction = process.env.NODE_ENV === 'production';

// https://vite.dev/config/
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(dirname, "./src"),
    },
  },
  // 로컬 개발용 프록시 설정 추가
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // 백엔드 주소
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''), // /api/answer -> /answer 로 변경
      },
    },
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
  },
  // build: {
  //   minify: 'terser',  // 코드 압축 시 terser 사용
  //   terserOptions: {
  //     compress: {
  //       drop_console: isProduction,   // production에서만 console 제거
  //       // drop_debugger: isProduction,  // production에서 debugger 제거
  //     },
  //     format: {
  //       comments: false, // 주석 제거
  //     },
  //   },
  // },
});
