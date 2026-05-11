import { type ButtonHTMLAttributes, memo, type ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  isLoading?: boolean;
}

export const Button = memo((props: ButtonProps) => {
  const {
    className = '',
    children,
    isLoading,
    disabled,
    ...otherProps
  } = props;
  return (
    <button
      type="button"
      className={`${styles.btn} ${className}`}
      disabled={disabled || isLoading}
      {...otherProps}
    >
      {isLoading ? (
        <span className={styles.loader}>Loading...</span>
      ) : (
        children
      )}
    </button>
  );
});
