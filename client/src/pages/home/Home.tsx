import CityList from '../../components/home/CityList';
import FilterList from '../../components/home/FilterList';
import SearchInput from '../../components/home/SearchInput';
import { City } from '../../types';
import NarrowLayout from '@/components/common/NarrowLayout';

export default function Home() {
  //   const { data } =
  //     useQuery();
  //     /* 국가 필터, 검색 필터를 같이 넘겨 */
  return (
    <NarrowLayout className='flex flex-col items-center my-30'>
      {/* 검색창 */}
      <div className='w-[339px] mb-24'>
        <SearchInput onCompositionEnd={(value) => console.log(value)} />
      </div>
      {/* 국가 필터 */}
      {/* 여행지 리스트 */}
      <div className='mb-21'>
        <FilterList active='all' onChange={() => {}} />
      </div>
      <CityList cities={DUMMY_DATA} />
    </NarrowLayout>
  );
}

const DUMMY_DATA: City[] = [
  {
    city: 'seoul',
    name: 'Seoul',
    description: 'The capital of South Korea',
    thumbnail: 'https://picsum.photos/300/200?random=1',
  },
  {
    city: 'tokyo',
    name: 'Tokyo',
    description: 'The capital of Japan',
    thumbnail: 'https://picsum.photos/300/200?random=2',
  },
  {
    city: 'paris',
    name: 'Paris',
    description: 'The capital of France',
    thumbnail: 'https://picsum.photos/300/200?random=3',
  },
  {
    city: 'paris2',
    name: 'Paris2',
    description: 'The capital of France',
    thumbnail: 'https://picsum.photos/300/200?random=5',
  },
];
