import { categories } from '@/constant';
import { Place } from '@/types';
import PlusIcon from '@/assets/icons/plus.svg?react';
import HeartIcon from '@/assets/icons/heart.svg?react';
import StarIcon from '@/assets/icons/star.svg?react';

interface Props {
  places: Place[];
}

export default function PlaceList({ places }: Props) {
  return (
    <div className='flex flex-col gap-y-24 h-full overflow-y-auto scrollbar-hide'>
      {places.map((place) => (
        <PlaceItem key={`${place.city}_${place.name}`} place={place} />
      ))}
    </div>
  );
}

// list와 item 자체는 가까워도 될 것 같음.
function PlaceItem({ place }: { place: Place }) {
  return (
    <div className='flex gap-x-11 mb-24'>
      <img src={place.thumbnail} className='w-68 h-68 bg-bg rounded-6' />
      <div className='flex-1 flex flex-col items-start gap-y-8'>
        <h6 className='text-17 font-semibold tracking-[0.17px]'>
          {place.name}
        </h6>
        <p className='flex text-14 tracking-[0.14px] text-gray500'>
          <span className='text-main font-medium'>
            {categories[place.category]}
          </span>
          {place.address}
        </p>
        <div className='flex text-14 tracking-[0.14px] text-gray600'>
          <span>
            <HeartIcon className='inline-block mr-4' />
            {place.likes}
          </span>
          <span>
            <StarIcon className='inline-block mr-4' />
            {place.rating}
          </span>
        </div>
      </div>
      <button className='relative'>
        <PlusIcon className='absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2' />
      </button>
    </div>
  );
}
