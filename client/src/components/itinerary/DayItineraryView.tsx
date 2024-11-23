import PlaceCategory from '../common/PlaceCategory';
import SubwayIcon from '@/assets/icons/train.svg?react';
import { ItineraryItem } from '../../../../server/types';

interface Props {
  plannedPlaces: ItineraryItem[];
}

export default function DayItineraryView({ plannedPlaces }: Props) {
  return (
    <div className='flex flex-col gap-y-50'>
      {plannedPlaces.map(({ place, startTime, endTime }) => (
        // shrink 0 -> 현재 차지하고있는 basis라는 크기 이하로, 줄어들지 않게 하는 속성이다. thumbnail 자체가, 나머지 children의 크기때문에 넘쳤을 때, thumbnail이 줄어드는게 아니라, 나머지가 줄어듬.
        // thumbnail이 다른 children들이 크기가 넘치더라도, basis크기를 절대 유지하도록함
        <div className='flex w-[253px] pl-29 relative before:absolute before:top-35 before:w-1 before:left-15 before:block before:bg-gray200 before:h-69 last:before:h-0'>
          <SubwayIcon className='absolute top-0 left-0' />
          <div className='flex-1 flex flex-col gap-y-8 text-left'>
            <p className='text-14 text-gray500'>
              {startTime}~{endTime}
            </p>
            <PlaceCategory category={place.category} className='text-13' />
            <p className='text-gray900 text-16 font-semibold'>{place.name}</p>
          </div>
          <img
            src={place.thumbnail}
            className='w-75 h-55 shrink-0 rounded-6 bg-bg'
          />
        </div>
      ))}
    </div>
  );
}
