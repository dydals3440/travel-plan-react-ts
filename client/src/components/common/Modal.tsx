// 이 컴포넌트들은, 오직 UI 표시에 대한 역할만 담당, Presentational Component로 구성

import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

// state / business logic X
export default function Modal({ children }: PropsWithChildren) {
  // 컴포넌트 트리 유지, 돔은 다른데 표시하고 싶은 경우 유용
  return createPortal(
    <div className='fixed inset-0 w-full h-full'>{children}</div>,
    document.getElementById('modal-root')!
  );
}

// Backdrop 모달 뒤의 Dimmed 된 영역
export function ModalBackdrop() {
  return (
    <div className='fixed inset-0 w-full h-full -z-10 bg-[rgba(1,1,1,0.50)]' />
  );
}

export function ModalPanel({ children }: PropsWithChildren) {
  return (
    <div className='fixed inset-0 flex items-center justify-center'>
      {children}
    </div>
  );
}
