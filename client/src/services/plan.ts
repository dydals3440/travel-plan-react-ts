import { City, Place } from '@/types';

export const getCity = async (cityId: string): Promise<City> => {
  return fetch(`/api/cities/${cityId}`).then((res) => res.json());
};

export const getPlaces = async (
  city: string,
  { q, category }: { category?: string | string[]; q?: string } = {}
): Promise<Place[]> => {
  // make query (with query Object)
  const queries = new URLSearchParams(q);
  // URLSearchParams -> 첫번쨰 파라미터로, 스트링 키, 스트링 밸류

  if (category) {
    const categories = Array.isArray(category) ? category : [category];
    categories.forEach((c) => {
      queries.append('category', c);
    });
  }

  const queryString = queries.toString();

  return fetch(
    `/api/cities/${city}/places${queryString ? `?${queryString}` : ''}`
  ).then((res) => res.json());
};
