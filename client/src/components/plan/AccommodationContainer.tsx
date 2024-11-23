import { useState } from 'react';
import SearchInput from '../common/SearchInput';
import { Place } from '@/types';
import PlaceList from './PlaceList';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getPlaces } from '@/services/plan';
import Loading from '../common/Loading';
import { usePlanStore } from '@/store';

export default function AccommodationContainer() {
  const { city } = useParams<{ city: string }>();
  const [q, setQ] = useState('');
  const { addPlannedAccommodation } = usePlanStore();

  const { data, isLoading } = useQuery({
    queryKey: ['places', city, q],
    enabled: !!city,
    queryFn: () => {
      // undefined를 넘기더라도, queryString에서는 undefined로 변경하기에 빈값 들어가지 않게 처리
      const query = {
        ...(q ? { q } : {}),
        ...{ category: 'accommodation' },
      };
      //   return getPlaces(city, { q, category: filter });

      // enabled를 적지않으면, city값이 없을 떄 실행될 수 있기에 있을 떄 만 실행되도록, enabled처리함
      // 조건 추가하고, city값 자체를 !(타입단언)를 통해 무조건 있을거라고 함.
      return getPlaces(city!, query);
    },
  });

  return (
    <div className='flex flex-col h-full gap-y-18'>
      <SearchInput onCompositionEnd={(query) => setQ(query)} />
      <div className='flex-1 overflow-y-hidden'>
        {isLoading || !data ? (
          <Loading />
        ) : (
          <PlaceList
            places={data}
            onAddPlace={(place: Place) => addPlannedAccommodation(place)}
          />
        )}
      </div>
    </div>
  );
}
