import { useRef } from 'react';

export default function useThrottle() {
  // timer를 저장하는 ref
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (callback: () => void, ms: number) => {
    // timer.current가 있는 경우에만
    if (timer.current) {
      return;
    }
    timer.current = setTimeout(() => {
      callback();
      timer.current = null;
    }, ms);
  };
}
