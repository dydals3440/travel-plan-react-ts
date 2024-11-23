import { City } from '@/types';
import ArrowIcon from '@/assets/icons/next.svg?react';
import FlightIcon from '@/assets/icons/Airplane.svg?react';
import VisaIcon from '@/assets/icons/visa.svg?react';
import VoltageIcon from '@/assets/icons/power.svg?react';
import ClockIcon from '@/assets/icons/time.svg?react';
import { Link } from 'react-router-dom';

interface Props {
  city: City;
}

export default function CityDetail({ city }: Props) {
  return (
    <div className='w-full flex flex-col '>
      <div className='mb-18 flex'>
        <div className='flex-1 flex flex-col mr-17'>
          <h3 className='text-gray300 text-20 mb-10'>{city.nameEn}</h3>
          <h2 className='text-30 font-bold'>
            {city.country.name} {city.name}
          </h2>
          <p className='text-14 leading-[160%] -tracking-[0.08px]'>
            {city.description}
          </p>
          <div className='flex gap-x-26 mb-16'>
            <div className='flex flex-col'>
              <div className='text-15 tracking-[0.15px] font-semibold size-34'>
                <div>
                  <FlightIcon className='mr-8 text-black' />
                  <span>항공</span>
                </div>
                <p className='text-gray600 tracking-[0.14px] text-14 mb-8'>
                  직항
                </p>
                <p>약 {city.flightHour} 시간</p>
              </div>
            </div>

            <div className='flex flex-col'>
              <div className='text-15 tracking-[0.15px] font-semibold'>
                <div>
                  <VisaIcon className='mr-8 text-black size-24' />
                  <span>비자</span>
                </div>
                <p className='text-gray600 tracking-[0.14px] text-14 mb-8'>
                  {city.country.visa.required ? '필요' : '무비자'}
                </p>
                <p>{city.country.visa.duration} 일</p>
              </div>
            </div>

            <div className='flex flex-col'>
              <div className='text-15 tracking-[0.15px] font-semibold'>
                <div>
                  <VoltageIcon className='mr-8 text-black' />
                  <span>전압</span>
                </div>
                <p className='text-gray600 tracking-[0.14px] text-14 mb-8'>
                  콘센트
                </p>
                <p>{city.country.voltage}V</p>
              </div>
            </div>

            <div className='flex flex-col'>
              <div className='text-15 tracking-[0.15px] font-semibold'>
                <div>
                  <ClockIcon className='mr-8 text-black' />
                  <span>시차</span>
                </div>
                <p className='text-gray600 tracking-[0.14px] text-14 mb-8'>
                  직항
                </p>
                <p>
                  약{' '}
                  {city.timezoneOffset === 0
                    ? '없음'
                    : `${city.timezoneOffset}`}
                  시간
                </p>
              </div>
            </div>
          </div>
        </div>
        <img
          src={city.thumbnail}
          alt={city.name}
          className='w-[261px] rounded-10'
        />
      </div>
      <div>
        <Link to={`/plan/${city.code}`}>
          <button className='w-185 bg-black text-[#ffffff] text-16 font-medium rounded-5 py-14 flex items-center justify-center'>
            <span className='ml-8'>일정 만들기</span>
            <ArrowIcon className='ml-5 ' />
          </button>
        </Link>
      </div>
    </div>
  );
}
