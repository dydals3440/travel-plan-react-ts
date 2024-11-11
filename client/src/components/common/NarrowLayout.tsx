import { PropsWithChildren } from 'react';
import cn from 'classnames';

interface Props {
  className?: string;
}

export default function NarrowLayout({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <div className={cn('max-w-[655px] w-full mx-auto', className)}>
      {children}
    </div>
  );
}
