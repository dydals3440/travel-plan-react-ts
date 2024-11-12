import { City } from '@/types';

interface Props {
  city: City;
}

export default function CityDetail({ city }: Props) {
  return <div>{JSON.stringify(city)}</div>;
}
