import { usePlanStore } from '@/store';
import Button from '../common/Button';
import Modal, { ModalBackdrop, ModalPanel } from '../common/Modal';
import TravelDateSelector from './TravelDateSelector';

// Modal 적은 이유, 컴포넌트 이름으로 알 수 있게
export default function TravelPeriodModal() {
  const { startDate, endDate, setStartDate, setEndDate, setStatus } =
    usePlanStore();

  // start / end date를 설정
  // 이 속성들을, 트래블 데이트 셀렉터에 주입
  // 직접 스테이트를 관리하느 ㄴ것이아닌, 페리오드 모달에 꺼내둔이유,
  // 페리오드 모달을 컨테이너 컴포넌트로 만드록, 트레플 데이트 셀렉터를 오직 UI만 연동하도록 하기 위해, (프레제네이션 컴포넌트)
  const handleChangeDates = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleComplete = () => {
    setStatus('planning');
  };

  return (
    <Modal>
      <ModalBackdrop />
      <ModalPanel className='text-center'>
        <h2 className='text-32 font-semibold mb-18'>
          여행 기간이 어떻게 되시나요?
        </h2>
        {/* 150% -> 1.5 */}
        <p className='text-15 leading-[1.5]'>
          * 여행 일자는 최대 10일까지 설정 가능합니다. <br /> 현재 여행
          기간(여행지 도착 날짜, 여행지 출발 날짜)으로 입력해 주세요.
        </p>
        <div className='mb-32'>
          <TravelDateSelector
            startDate={startDate}
            endDate={endDate}
            onChange={handleChangeDates}
          />
        </div>
        <div className='text-right'>
          {/* 버튼은 인라인 속성, 텍스트 얼라인 센터가 적용됨. */}
          <Button
            onClick={handleComplete}
            className='px-42'
            disabled={!startDate || !endDate}
          >
            선택
          </Button>
        </div>
      </ModalPanel>
    </Modal>
  );
}
