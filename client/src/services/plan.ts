import { City } from '@/types';

export const getCity = async (cityId: string): Promise<City> => {
  return fetch(`/api/cities/${cityId}`).then((res) => res.json());
};
