import { categories } from '@/constant';
import { Place } from '@/types';
import DeleteIcon from '@/assets/icons/trash.svg?react';
import { addDays, format } from 'date-fns';

interface Props {
  plannedAccommodations: Array<Place | null>;
  onDeleteAccommodation: (index: number) => void;
  startDate: Date;
}

// presentational 유지, 부모에서 받아옴
export default function PlannedAccommodationList({
  startDate,
  plannedAccommodations,
  onDeleteAccommodation,
}: Props) {
  return (
    <div>
      {plannedAccommodations.map((plannedAccommodation, index) => {
        const targetDate = addDays(startDate, index);
        return plannedAccommodation ? (
          <PlannedAccommodation
            key={`${plannedAccommodation.name}_${index}`}
            plannedAccommodation={plannedAccommodation}
            index={index}
            onDeleteAccommodation={() => onDeleteAccommodation(index)}
            targetDate={targetDate}
          />
        ) : (
          <EmptyAccommodation index={index} targetDate={targetDate} />
        );
      })}
    </div>
  );
}

function EmptyAccommodation({
  index,
  targetDate,
}: {
  index: number;
  targetDate: Date;
}) {
  return (
    <div className='flex items-center mb-20'>
      <span className='inline-block w-30 h-30 bg-main rounded-full text-white text-16 font-semibold tracking-[0.16px] leading-[30px] align-middle text-center mr-10'>
        {index + 1}
      </span>
      <div className='rounded-10 w-[390px] h-68 border-gray200 border-1 flex px-12 py-10 items-center'>
        <div className='h-48 w-48 shrink-0 rounded-6 mr-12 bg-bg' />
        <div className='flex-1 mr-12 overflow-hidden'>
          <h6 className='text-15 font-semibold tracking-[0.15px] mb-8'>
            숙소를 추가해 주세요.
          </h6>
          <p className='text-14 tracking-[0.14px] text-gray500 overflow-hidden whitespace-nowrap text-ellipsis'>
            <span className='text-main font-medium'>
              {categories['accommodation']}
            </span>
            {format(targetDate, 'MM.dd(EEE)')} -{' '}
            {format(addDays(targetDate, 1), 'MM.dd(EEE)')}
          </p>
        </div>
      </div>
    </div>
  );
}

function PlannedAccommodation({
  plannedAccommodation,
  index,
  targetDate,
  onDeleteAccommodation,
}: {
  plannedAccommodation: Place;
  index: number;
  targetDate: Date;
  onDeleteAccommodation: () => void;
}) {
  return (
    <div key={plannedAccommodation.name} className='flex items-center mb-20'>
      <span className='w-30 h-30 bg-main text-[#fff] text-16 font-semibold tracking-[0.16px] rounded-full leading-[30px] flex items-center justify-center mr-10'>
        {index + 1}
      </span>
      <div className='rounded-10 h-68 w-[390px] border-gray200 border-1 flex px-12 py-10 items-center'>
        <img
          src={plannedAccommodation.thumbnail}
          className='h-48 w-48 shrink-0 rounded-6 mr-12'
          alt={plannedAccommodation.name}
        />
        <div className='flex-1 mr-12 overflow-hidden'>
          <h6 className='text-15 font-semibold tracking-[0.15px] mb-8'>
            {plannedAccommodation.name}
          </h6>
          <p className='text-14 tracking-[0.14px] text-gray500 overflow-hidden whitespace-nowrap text-ellipsis'>
            <span className='text-main font-medium'>
              {categories[plannedAccommodation.category]}
            </span>
            {format(targetDate, 'MM.dd(EEE)')} -{' '}
            {format(addDays(targetDate, 1), 'MM.dd(EEE)')}
          </p>
        </div>
        <button
          onClick={() => {
            onDeleteAccommodation();
          }}
        >
          <DeleteIcon fill='gray' />
        </button>
      </div>
    </div>
  );
}
