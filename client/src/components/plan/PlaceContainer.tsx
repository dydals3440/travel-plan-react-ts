import { useState } from 'react';
import SearchInput from '../common/SearchInput';
import { Place } from '@/types';
import { FilterList } from './PlaceFilterList';
import PlaceList from './PlaceList';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getPlaces } from '@/services/plan';
import Loading from '../common/Loading';

export default function PlaceContainer() {
  const { city } = useParams<{ city: string }>();

  const [q, setQ] = useState('');
  const [filter, setFilter] = useState<Place['category'] | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['places', city, q, filter],
    enabled: !!city,
    queryFn: () => {
      // undefined를 넘기더라도, queryString에서는 undefined로 변경하기에 빈값 들어가지 않게 처리
      const query = {
        ...(q ? { q } : {}),
        ...(filter ? { category: filter } : {}),
      };
      //   return getPlaces(city, { q, category: filter });

      // enabled를 적지않으면, city값이 없을 떄 실행될 수 있기에 있을 떄 만 실행되도록, enabled처리함
      // 조건 추가하고, city값 자체를 !(타입단언)를 통해 무조건 있을거라고 함.
      return getPlaces(city!, query);
    },
  });

  const handleFilter = (category: Place['category']) => {
    if (filter === category) {
      // 동일하면 널로 초기화
      setFilter(null);
    } else {
      setFilter(category);
    }
  };

  return (
    <div className='flex flex-col h-full gap-y-18'>
      <SearchInput onCompositionEnd={(query) => setQ(query)} />
      <FilterList selected={filter} onFilter={handleFilter} />
      <div className='flex-1 overflow-y-hidden'>
        {isLoading || !data ? <Loading /> : <PlaceList places={data} />}
      </div>
    </div>
  );
}
