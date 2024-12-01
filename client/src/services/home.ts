import { City } from '@/types';

export const getCities = async (
  filter: undefined | 'domestic' | 'international'
): Promise<City[]> => {
  const queryParams = new URLSearchParams(
    filter ? { filter } : undefined
  ).toString();
  const response = await fetch(
    `/api/cities${queryParams ? `?${queryParams}` : ''}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch');
  }

  return response.json();
};

export const getSearchedCities = async (search: string): Promise<City[]> => {
  const response = await fetch(`/api/cities/search?q=${search}`);

  if (!response.ok) {
    throw new Error('Failed to fetch');
  }

  return response.json();
};
