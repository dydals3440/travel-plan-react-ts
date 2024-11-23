import PlannedAccommodationList from './PlannedAccommodationList';
import { usePlanStore } from '@/store';

export default function AccommodationController() {
  const { plannedAccommodations, removePlannedAccommodation, startDate } =
    usePlanStore();

  const plannedAccommodationLength =
    plannedAccommodations.filter(Boolean).length;

  // 중복 제거
  const accommodationCount = new Set(plannedAccommodations).size;

  return (
    <>
      {/* 블락과 상관없이 */}
      <div className='flex flex-col text-left'>
        <h5 className='flex items-end mb-13'>
          <span className='text-30 font-medium tracking-[0.3px] mr-8'>
            {accommodationCount}
          </span>
          <span className='text-15 tracking-[0.15px] mb-4'>
            {plannedAccommodationLength}일 / {plannedAccommodations.length}일
          </span>
        </h5>

        <PlannedAccommodationList
          plannedAccommodations={plannedAccommodations}
          onDeletePlace={removePlannedAccommodation}
          startDate={startDate!}
        />
      </div>
    </>
  );
}
