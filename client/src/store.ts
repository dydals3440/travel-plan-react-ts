import { create } from 'zustand';

interface State {
  // 시작 날짜
  startDate: Date | null;
  // 일정 종료 날짜
  endDate: Date | null;
}

type Action = {
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
};

// 타입 추론을 취해 create<State>() 이렇게 한번 함수를 실행시키고
// 그 다음에 리듀서를 넘기면 됨
export const store = create<State & Action>()((set) => ({
  startDate: null,
  endDate: null,
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
}));
