import {Meta, StoryObj} from '@storybook/nextjs';
import {userEvent, within} from '@storybook/testing-library'; // 模拟用户操作
import Button from './index';
import {expect} from '@storybook/jest';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        disabled: { control: 'boolean' },
        onClick: { action: 'clicked' },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 1. 基础点击交互故事
export const Clickable: Story = {
    args: {
        label: '点击我',
    },
    // play 函数：定义交互步骤（会在 Storybook 中自动执行并展示）
    play: async ({ canvasElement }) => {
        // 获取组件所在的 DOM 容器
        const canvas = within(canvasElement);

        // 模拟用户点击按钮
        await userEvent.click(canvas.getByText('点击我'));
    },
};

// 2. 禁用状态交互故事（测试点击是否被阻止）
export const Disabled: Story = {
    args: {
        label: '禁用按钮',
        disabled: true,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByText('禁用按钮');

        // 验证按钮是否禁用
        await expect(button).toBeDisabled();

        // 尝试点击禁用按钮（不会触发 onClick）
        await userEvent.click(button);
    },
};
