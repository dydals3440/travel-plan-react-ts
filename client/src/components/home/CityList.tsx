import { City } from '@/types';
import Card from './Card';

// 재활용할 일 없으니, 명확한 이름으로
interface Props {
  cities: City[];
}

export default function CityList({ cities }: Props) {
  return (
    // 한 라인 넘어가면, 아랫줄에 기록되게
    // justify-between을 통해 사이에 간격주게함.
    <div className='flex flex-wrap justify-between gap-y-28 items-start w-full'>
      {cities.map((city) => (
        <Card
          key={city.code}
          title={city.nameEn.toLocaleUpperCase()}
          description={`${city.country.name} ${city.name}`}
          image={city.thumbnail}
        />
      ))}
    </div>
  );
}
