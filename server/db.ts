import DataStore from 'nedb';

export const countriesDB = new DataStore({
  filename: 'data/countries.db',
  autoload: true,
});

export const citiesDB = new DataStore({
  filename: 'data/cities.db',
  autoload: true,
});

export const placesDB = new DataStore({
  filename: 'data/places.db',
  autoload: true,
});

// 장소로 검색을 쉽게하기 위해서, 인덱싱
// 특정 필드를 위해서, 별도 생성되는 데이터 구조.
// 데이터베이스가 처리할 떄 전체 데이터 스캔 X, 인덱스를 스캔함.
// ensureIndex라는 인터페이스를 사용해서, 필드 이름을 도시의 구분자로 인덱싱 하게 함.
// 도시로부터 API를 호출할 수 있게해야함 cityRouter
placesDB.ensureIndex({ fieldName: 'city' });
