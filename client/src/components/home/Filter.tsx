import { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

interface Props {
  active: boolean;
}

export default function Filter({
  className,
  children,
  active,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & Props) {
  // padding click 영역
  return (
    <button
      className={cn(
        'text-20 border-b-3 p-14',
        {
          'border-b-main text-main font-semibold': active,
          'border-b-transparent text-gray500 font-medium': !active,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
