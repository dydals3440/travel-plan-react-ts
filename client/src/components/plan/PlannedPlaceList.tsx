import { categories } from '@/constant';
import { Place } from '@/types';
import DeleteIcon from '@/assets/icons/trash.svg?react';
import { useState } from 'react';
import { parseTime } from '@/utils/time';
import Button from '../common/Button';

interface Props {
  plannedPlaces: {
    place: Place;
    duration: number;
  }[];
  onDeletePlace: (index: number) => void;
  onEditDuration: (index: number, duration: number) => void;
}

export default function PlannedPlaceList({
  plannedPlaces,
  onDeletePlace,
  onEditDuration,
}: Props) {
  return (
    <div>
      {plannedPlaces.map((plannedPlace, index) => (
        <PlannedPlace
          plannedPlace={plannedPlace}
          index={index}
          onDeletePlace={onDeletePlace}
          onEditDuration={(duration: number) => onEditDuration(index, duration)}
        />
      ))}
    </div>
  );
}

function PlannedPlace({
  plannedPlace,
  index,
  onDeletePlace,
  onEditDuration,
}: {
  plannedPlace: { place: Place; duration: number };
  index: number;
  onDeletePlace: (index: number) => void;
  onEditDuration: (duration: number) => void;
}) {
  const [editing, setEditing] = useState(false);
  const { hours, minutes } = parseTime(plannedPlace.duration);
  const [newHours, setNewHours] = useState(hours);
  const [newMinutes, setNewMinutes] = useState(minutes);

  return (
    <div key={plannedPlace.place.name} className='flex items-center mb-20'>
      <span className='w-30 h-30 bg-main text-[#fff] text-16 font-semibold tracking-[0.16px] rounded-full leading-[30px] flex items-center justify-center mr-10'>
        {index + 1}
      </span>
      <div className='rounded-10  h-68 w-[390px] border-gray200 border-1 flex px-12 py-10 items-center'>
        {!editing ? (
          <>
            <img
              src={plannedPlace.place.thumbnail}
              className='h-48 w-48 shrink-0 rounded-6 mr-12'
              alt={plannedPlace.place.name}
            />
            <div className='flex-1 mr-12'>
              <h6 className='text-15 font-semibold tracking-[0.15px] mb-8'>
                {plannedPlace.place.name}
              </h6>
              <p className='text-14 tracking-[0.14px] text-gray500'>
                <span className='text-main font-medium'>
                  {categories[plannedPlace.place.category]}
                </span>
                {plannedPlace.place.address}
              </p>
            </div>
            <Button variant='action' onClick={() => setEditing(true)}>
              {hours}시간 {minutes}분
            </Button>
            <button onClick={() => onDeletePlace(index)}>
              <DeleteIcon fill='gray' />
            </button>
          </>
        ) : (
          <>
            <span className='text-15 font-semibold tracking-[0.15px]'>
              머무는 시간
            </span>
            <div className='flex-1 text-center'>
              <input
                type='number'
                value={newHours}
                className='text-20 font-semibold tracking-[0.2px] text-right'
                max={12}
                min={1}
                onChange={(e) => setNewHours(Number(e.currentTarget.value))}
              />
              <span className='text-15 font-medium tracking-[0.15px] mr-12'>
                시간
              </span>
              <input
                type='number'
                value={newMinutes}
                className='text-20 font-semibold tracking-[0.2px text-right'
                max={60}
                min={1}
                onChange={(e) => setNewMinutes(Number(e.currentTarget.value))}
              />
              <span className='text-15 font-medium tracking-[0.15px]'>분</span>
            </div>
            <Button
              variant='action'
              onClick={() => {
                setEditing(false);
                onEditDuration(newHours * 60 + newMinutes);
              }}
            >
              완료
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
