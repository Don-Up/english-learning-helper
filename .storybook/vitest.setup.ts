import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";
import { setProjectAnnotations } from '@storybook/nextjs'; // 改为从 nextjs 导入
import * as projectAnnotations from './preview';

// 保持原有逻辑，确保测试时应用配置
setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);