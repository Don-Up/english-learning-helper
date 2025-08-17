import type { StorybookConfig } from "@storybook/nextjs"; // 类型改为 nextjs

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs", // 切换为 Webpack 版本的框架
    options: {}
  },
  staticDirs: [
    "../public" // 修正路径分隔符（使用 / 而非 \，跨平台兼容）
  ]
};
export default config;
