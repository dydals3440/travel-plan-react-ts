import {
  GoogleMap,
  MarkerF,
  PolylineF,
  useLoadScript,
} from '@react-google-maps/api';
import { PropsWithChildren } from 'react';

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

// App 컴포넌트에 감싸서, 실행됨을 보장. (맵이 로딩된이후에, 컴포넌트들이 추가되게함)
export function MapProvider({ children }: PropsWithChildren) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
  });

  if (!isLoaded) return null;

  return <>{children}</>;
}

export default function Map({ center, children }: PropsWithChildren<Props>) {
  return (
    <>
      {/* zoom level이 크면, 요금이 더 큼 */}
      <GoogleMap
        center={center}
        zoom={12}
        mapContainerClassName='w-full h-full'
      >
        {children}
      </GoogleMap>
    </>
  );
}

// 커스텀 마커
export function MapMarker({
  coordinates,
  label,
  options: { color = '#C730DF' } = {},
}: {
  coordinates: {
    lat: number;
    lng: number;
  };
  label?: string;
  options?: {
    color?: `#${string}`;
  };
}) {
  const markerIcon = generateMarkerIcon(color);

  return (
    <MarkerF
      position={coordinates}
      icon={markerIcon}
      label={label ? { text: label, color: '#fff' } : undefined}
    />
  );
}

// 줄로 연결
export function MapPath({
  path,
  options: { color = '#C730DF' } = {},
}: {
  path: { lat: number; lng: number }[];
  options?: { color?: `#${string}` };
}) {
  return <PolylineF path={path} options={{ strokeColor: color }} />;
}

const generateMarkerIcon = (color: `#${string}`) => {
  const svg = `
    <svg width="30" height="30" viewBox="-15 -15 30 30" xmlns="http://www.w3.org/2000/svg">
      <circle cx="0" cy="0" r="15" fill="${color}"></circle>
    </svg>`;
  // 방금 생성한 svg를 encodeURIComponent로 인코딩하여 등록
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};
