import { addDays, differenceInDays } from 'date-fns';
import { FunctionComponent } from 'react';
import { create } from 'zustand';
import { Place } from './types';

export interface PlanState {
  // 시작 날짜
  startDate: Date | null;
  // 일정 종료 날짜
  endDate: Date | null;
  //
  status: 'period_edit' | 'planning';
  //
  dailyTimes: { startTime: string; endTime: string; date: Date }[];
  // 장소의 이름을, 아래에 저장
  plannedPlaces: {
    place: Place;
    duration: number; // minutes
  }[];
  plannedAccommodations: Array<Place | null>;
}

type Action = {
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  setStatus: (status: PlanState['status']) => void;
  setDailyTime: (
    index: number,
    time: string,
    type: 'startTime' | 'endTime'
  ) => void;
  // planned action
  addPlannedPlace: (place: Place, duration: number) => void;
  removedPlannedPlace: (index: number) => void;
  setDurationForPlannedPlace: (index: number, duration: number) => void;
  addPlannedAccommodation: (place: Place) => void;
  removePlannedAccommodation: (index: number) => void;
};

// 타입 추론을 취해 create<State>() 이렇게 한번 함수를 실행시키고
// 그 다음에 리듀서를 넘기면 됨
export const usePlanStore = create<PlanState & Action>()((set, get) => ({
  startDate: null,
  endDate: null,
  status: 'period_edit',
  dailyTimes: [],
  plannedPlaces: [],
  plannedAccommodations: [],
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => {
    if (date) {
      // getter 함수를 통해서, startDate를 가져옴
      const startDate = get().startDate!;
      // 총 날짜를 계산
      const diff = differenceInDays(date, startDate) + 1;
      const dailyTimes = Array.from({ length: diff }, (_, i) => {
        return {
          startTime: '10:00',
          endTime: '22:00',
          date: addDays(startDate, i),
        };
      });
      set({
        dailyTimes,
        endDate: date,
        plannedAccommodations: Array.from({ length: diff - 1 }, () => null),
      });
    } else {
      set({
        endDate: date,
        // dailyTimes를 돌면서, 테이블 생성
        dailyTimes: [],
        plannedAccommodations: [],
      });
    }
  },
  setStatus: (status) => set({ status }),
  setDailyTime: (index, time, type) => {
    set((state) => ({
      dailyTimes: state.dailyTimes.map((dailyTime, i) =>
        i === index ? { ...dailyTime, [type]: time } : dailyTime
      ),
    }));
  },
  addPlannedPlace: (place: Place, duration: number) =>
    set((prev) => ({
      plannedPlaces: [...prev.plannedPlaces, { place, duration }],
    })),
  removedPlannedPlace: (index: number) =>
    set((prev) => ({
      plannedPlaces: prev.plannedPlaces.filter((_, i) => i !== index),
    })),
  setDurationForPlannedPlace: (index: number, duration: number) =>
    set((prev) => ({
      plannedPlaces: prev.plannedPlaces.map((place, i) =>
        i === index ? { ...place, duration } : place
      ),
    })),
  addPlannedAccommodation: (place: Place) =>
    set((prev) => {
      // 현재 저장된 데이터가 null인 첫번쨰 인덱스
      const index = prev.plannedAccommodations.findIndex((p) => p === null);
      // null인 데이터를 못찾음, 기존 데이터와 동일 (장소리스트 추가되지 않게))
      if (index === -1) return prev;
      return {
        plannedAccommodations: prev.plannedAccommodations.map((p, i) =>
          i === index ? place : p
        ),
      };
    }),
  removePlannedAccommodation: (index: number) =>
    set((prev) => ({
      plannedAccommodations: prev.plannedAccommodations.map((p, i) =>
        i === index ? null : p
      ),
    })),
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
  clearModals: () => void;
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

  clearModals: () => set({ modals: [] }),
}));
