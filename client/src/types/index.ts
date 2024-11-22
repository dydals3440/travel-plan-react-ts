export interface City {
  code: string; // 도시의 코드, 구분자 역할 예) seoul
  name: string; // 도시의 한글 이름 예) 서울
  nameEn: string; // 도시의 영문 이름 예) Seoul
  thumbnail: string; // 도시의 썸네일 이미지 URL
  description: string;
  timezone: string; // 도시의 타임존 예) Asia / Seoul
  flightHour: number; // 서울로부터 비행시간 예 ) 2
  timezoneOffset: number; // 서울로부터 시차 예) 9
  coordinates: {
    lat: number;
    lng: number;
  };
  country: Country;
}

export interface Country {
  code: string; // 국가 코드, 구분자 역할 예) kr
  name: string; // 국가 한글 이름 예) 대한민국
  nameEn: string; // 국가 영문 이름 예) South Korea
  voltage: number; // 국가 전압 예) 220
  visa: {
    required: boolean; // 비자 필요 여부
    duration: number; // 비자 유효기간
  };
  continent:
    | 'Asia'
    | 'Europe'
    | 'North America'
    | 'Africa'
    | 'South America'
    | 'Oceania'
    | 'Antarctica';
}

export interface Place {
  name: string;
  thumbnail: string;
  category: 'attraction' | 'restaurant' | 'cafe' | 'accommodation';
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  likes: number;
  rating: number;
  city: City['code'];
}
