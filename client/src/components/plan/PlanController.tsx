import { usePlanStore } from '@/store';
import DailyTimeController from './DailyTimeController';
import PlanControllerHeader from './PlanControllerHeader';
import Wizard from '../common/Wizard';
import PlaceController from './PlaceController';
import PlaceContainer from './PlaceContainer';
import AccommodationContainer from './AccommodationContainer';
import AccommodationController from './AccommodationController';

export default function PlanController() {
  const { startDate, endDate } = usePlanStore();
  return (
    <div className='h-full flex'>
      <Wizard
        steps={[
          {
            title: '날짜 확인',
            content: ({ onNext }) => (
              <div className='px-24 py-30 flex flex-col gap-y-18 overflow-y-hidden h-full'>
                <PlanControllerHeader startDate={startDate} endDate={endDate} />
                <DailyTimeController onCompleted={onNext} />
              </div>
            ),
          },
          {
            title: '장소 선택',
            content: () => (
              <div className='flex'>
                <div className='px-24 py-30 flex flex-col gap-y-18 overflow-y-hidden h-full'>
                  <PlanControllerHeader
                    startDate={startDate}
                    endDate={endDate}
                  />
                  <div className='h-full'>
                    <div className='p-14 border-b-3 border-b-main mb-18'>
                      <h4 className='text-18 font-semibold text-main'>
                        장소 선택
                      </h4>
                    </div>
                    <PlaceContainer />
                  </div>
                </div>
                <div className='px-24 py-30'>
                  <PlaceController />
                </div>
              </div>
            ),
          },
          {
            title: '숙소 선택',
            content: () => (
              <div className='flex'>
                <div className='px-24 py-30 flex flex-col gap-y-18 overflow-y-hidden h-full'>
                  <PlanControllerHeader
                    startDate={startDate}
                    endDate={endDate}
                  />
                  <div className='h-full'>
                    <div className='p-14 border-b-3 border-b-main mb-18'>
                      <h4 className='text-18 font-semibold text-main'>
                        숙소 선택
                      </h4>
                    </div>
                    <AccommodationContainer />
                  </div>
                </div>
                <div className='px-24 py-30'>
                  <AccommodationController />
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

// function Layout({
//   children,
//   startDate,
//   endDate,
// }: PropsWithChildren<{ startDate: Date | null; endDate: Date | null }>) {
//   return (
//     <div className='px-24 py-30 flex flex-col gap-y-18 overflow-y-hidden h-full'>
//       <PlanControllerHeader startDate={startDate} endDate={endDate} />
//       {children}
//     </div>
//   );
// }
