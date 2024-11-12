import { FunctionComponent } from 'react';
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

// ModalState 인터페이스는 모달 컴포넌트 배열을 정의합니다.
// 각 모달 컴포넌트는 onClose라는 콜백 함수를 props로 받습니다.
interface ModalState {
  modals: FunctionComponent<{ onClose: () => void }>[];
}

// ModalAction 타입은 모달을 열고 닫는 두 가지 액션을 정의합니다.
// openModal은 모달 컴포넌트를 받아서 모달 배열에 추가합니다.
// closeModal은 인덱스를 받아서 해당 인덱스의 모달을 배열에서 제거합니다.
type ModalAction = {
  openModal: (modal: FunctionComponent<{ onClose: () => void }>) => void;
  closeModal: (index: number) => void;
};

// useModalStore는 Zustand 라이브러리를 사용하여 모달 상태와 액션을 관리하는 훅을 생성합니다.
export const useModalStore = create<ModalState & ModalAction>()((set) => ({
  // 초기 모달 배열은 빈 배열로 설정됩니다.
  modals: [],

  // openModal 함수는 새로운 모달을 받아서 현재 모달 배열에 추가합니다.
  openModal: (modal) => set((state) => ({ modals: [...state.modals, modal] })),

  // closeModal 함수는 인덱스를 받아서 해당 인덱스의 모달을 배열에서 제거합니다.
  closeModal: (index) =>
    set((state) => ({ modals: state.modals.filter((_, i) => i !== index) })),
}));
