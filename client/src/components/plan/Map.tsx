import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// 중앙 위도 경도
interface Props {
  center: {
    lat: number;
    lng: number;
  };
  markers?: {
    lat: number;
    lng: number;
  }[];
}

export default function Map({ center, markers }: Props) {
  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      {/* zoom level이 크면, 요금이 더 큼 */}
      <GoogleMap
        center={center}
        zoom={12}
        mapContainerClassName='w-full h-full'
      >
        {markers?.map((marker, index) => {
          return (
            <MarkerF
              key={index}
              position={marker}
              icon={markerIcon}
              label={{ text: `${index + 1}`, color: '#fff' }}
            />
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
}

const markerIcon = (() => {
  const svg = `
    <svg width="30" height="30" viewBox="-15 -15 30 30" xmlns="http://www.w3.org/2000/svg">
      <circle cx="0" cy="0" r="15" fill="#C730DF"></circle>
    </svg>`;
  // 방금 생성한 svg를 encodeURIComponent로 인코딩하여 등록
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
})();
