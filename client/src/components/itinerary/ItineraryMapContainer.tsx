import { PlanState } from '@/store';
import Map, { MapMarker, MapPath } from '../plan/Map';
import { Place } from '@/types';

interface Props {
  plannedPlaces: PlanState['plannedPlaces'];
  accommodation: Place | null;
}

export default function ItineraryMapContainer({
  plannedPlaces,
  accommodation,
}: Props) {
  const markers = plannedPlaces.map(
    (plannedPlace) => plannedPlace.place.coordinates
  );

  return (
    <Map center={plannedPlaces[0].place.coordinates}>
      {markers.map((marker, index) => (
        <MapMarker
          key={index}
          coordinates={marker}
          label={`${index + 1}`}
          options={{ color: '#0095A9' }}
        />
      ))}
      {accommodation && (
        <MapMarker
          coordinates={accommodation.coordinates}
          options={{ color: '#C730DF' }}
          label='숙소'
        />
      )}
      <MapPath
        path={[
          ...markers,
          ...(accommodation ? [accommodation.coordinates] : []),
        ]}
        options={{ color: '#0095A9' }}
      />
    </Map>
  );
}
