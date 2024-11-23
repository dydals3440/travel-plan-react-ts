import Loading from '@/components/common/Loading';
import WideLayout from '@/components/common/WideLayout';
import ItineraryController from '@/components/itinerary/itineraryController';

import useGenerateItinerary from '@/hooks/itinerary/useGenerateItinerary';
import { PlanState, usePlanStore } from '@/store';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ItineraryItem } from '../../../../server/types';

export default function ItineraryCity() {
  const { generateItinerary } = useGenerateItinerary();

  const { plannedPlaces, dailyTimes } = usePlanStore();
  const navigate = useNavigate();
  const { city } = useParams();

  const [itinerary, setItinerary] = useState<ItineraryItem[][] | null>(null);

  useEffect(() => {
    if (plannedPlaces.length === 0 || dailyTimes.length === 0) {
      navigate(`/itinerary/${city}`);
      return;
    }

    generateItinerary(plannedPlaces, dailyTimes).then((itinerary) => {
      setItinerary(itinerary);
    });
  }, [city, dailyTimes, plannedPlaces, generateItinerary, navigate]);

  return (
    <WideLayout>
      {itinerary ? <ItineraryController itinerary={itinerary} /> : <Loading />}
    </WideLayout>
  );
}
