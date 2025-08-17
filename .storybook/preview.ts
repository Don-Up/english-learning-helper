import type { Preview } from '@storybook/nextjs'; // 类型改为 nextjs

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo' // 保持原有 a11y 配置
    }
  },
};

export default preview;