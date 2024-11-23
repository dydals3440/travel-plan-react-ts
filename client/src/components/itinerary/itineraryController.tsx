import { PlanState, usePlanStore } from '@/store';
import ControllerHeader from '../shared/PlanControllerHeader';
import Tabs from '@/components/common/Tabs';
import DayItineraryView from './DayItineraryView';
import ItineraryMapContainer from './ItineraryMapContainer';
import { ItineraryItem } from '../../../../server/types';

interface Props {
  itinerary: ItineraryItem[][];
}

export default function ItineraryController({ itinerary }: Props) {
  const { startDate, endDate, plannedAccommodations } = usePlanStore();

  return (
    <div className='h-full'>
      <Tabs
        className='h-full'
        tabs={itinerary.map((day, idx) => ({
          title: `${idx + 1}일차`,
          content: () => (
            <div className='h-full flex flex-1'>
              <div className='px-24 py-30 flex flex-col gap-y-18 overflow-y-hidden h-full flex-shrink-0'>
                <ControllerHeader startDate={startDate} endDate={endDate} />
                <DayItineraryView plannedPlaces={day} />
              </div>
              <ItineraryMapContainer
                plannedPlaces={day}
                accommodation={plannedAccommodations[idx]!}
              />
            </div>
          ),
        }))}
      />
    </div>
  );
}
