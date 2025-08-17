import React from 'react';
import './index.css';

// 定义按钮的属性类型
interface ButtonProps {
    // 按钮文本
    label: string;
    // 点击事件回调
    onClick?: () => void;
    // 按钮类型（样式变体）
    variant?: 'primary' | 'secondary';
    // 是否禁用
    disabled?: boolean;
    // 是否处于加载状态
    isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
                                           label,
                                           onClick,
                                           variant = 'primary',
                                           disabled = false,
                                           isLoading = false,
                                       }) => {
    return (
        <button
            className={`button ${variant} ${disabled ? 'disabled' : ''} ${isLoading ? 'loading' : ''}`}
            onClick={onClick}
            disabled={disabled || isLoading}
        >
            {isLoading ? <span className="spinner">🔄</span> : null}
            <span className="label">{label}</span>
        </button>
    );
};

export default Button;
