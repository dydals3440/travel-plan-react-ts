import { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

interface Props {
  variant?: 'primary' | 'action';
}

export default function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & Props) {
  return (
    <button
      className={cn(
        classes[variant],
        'text-16 font-medium rounded-6',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

const classes = {
  primary: 'bg-black text-[#ffffff] disabled:bg-gray200 py-14',
  action: 'py-6 px-8 rounded-10 bg-main/10 text-14 font-medium text-main mr-5',
};
