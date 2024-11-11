import { useQuery } from '@tanstack/react-query';
import CityList from '../../components/home/CityList';
import FilterList from '../../components/home/FilterList';
import SearchInput from '../../components/home/SearchInput';
import NarrowLayout from '@/components/common/NarrowLayout';
import { getCities, getSearchedCities } from '@/services/home';
import Loading from '@/components/common/Loading';
import { useState } from 'react';

export default function Home() {
  const [q, setQ] = useState('');

  const { isLoading, data } = useQuery({
    queryKey: ['cities', q],
    queryFn: q ? () => getSearchedCities(q) : getCities,
  });

  return isLoading || !data ? (
    <Loading />
  ) : (
    <NarrowLayout className='flex flex-col items-center my-30'>
      {/* 검색창 */}
      <div className='w-[339px] mb-24'>
        <SearchInput onCompositionEnd={(value) => setQ(value)} />
      </div>
      {/* 국가 필터 */}
      {/* 여행지 리스트 */}
      <div className='mb-21'>
        <FilterList active='all' onChange={() => {}} />
      </div>
      <CityList cities={data} />
    </NarrowLayout>
  );
}
