import { usePlanStore } from '@/store';
import Map, { MapMarker, MapPath } from './Map';

interface Props {
  coordinates: {
    lat: number;
    lng: number;
  };
}

export default function PlanMapContainer({ coordinates }: Props) {
  const { plannedPlaces } = usePlanStore();
  const markers = plannedPlaces.map(
    (plannedPlace) => plannedPlace.place.coordinates
  );
  return (
    <Map center={coordinates}>
      {markers.map((marker, index) => (
        <MapMarker
          key={index}
          coordinates={marker}
          label={`${index + 1}`}
          options={{ color: '#0095A9' }}
        />
      ))}
      <MapPath path={markers} options={{ color: '#0095A9' }} />
    </Map>
  );
}
