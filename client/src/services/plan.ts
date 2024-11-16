import { City, Place } from '@/types';

export const getCity = async (cityId: string): Promise<City> => {
  return fetch(`/api/cities/${cityId}`).then((res) => res.json());
};

export const getPlaces = async (
  city: string,
  query: { category?: string; q?: string } = {}
): Promise<Place[]> => {
  // make query (with query Object)
  const queryString = new URLSearchParams(query).toString();

  return fetch(
    `/api/cities/${city}/places${queryString ? `?${queryString}` : ''}`
  ).then((res) => res.json());
};
