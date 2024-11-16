import { usePlanStore } from '@/store';
import DailyTimeSelector from './DailyTimeSelector';
import PlanControllerHeader from './PlanControllerHeader';
import PlanSteps from './PlanSteps';

export default function PlanController() {
  const { startDate, endDate } = usePlanStore();
  return (
    <div className='h-full flex'>
      <PlanSteps />

      <div className='px-24 py-30 flex flex-col gap-y-18'>
        <PlanControllerHeader startDate={startDate} endDate={endDate} />
        <DailyTimeSelector />
      </div>
    </div>
  );
}
