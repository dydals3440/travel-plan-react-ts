import Loading from '@/components/common/Loading';
import WideLayout from '@/components/common/WideLayout';
import PlanController from '@/components/plan/PlanController';
import PlanMapContainer from '@/components/plan/PlanMapContainer';
import TravelPeriodModal from '@/components/plan/TravelPeriodModal';
import { getCity } from '@/services/plan';
import { usePlanStore } from '@/store';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

// 동일 action -> 동일 output (순수함수)

export default function PlanCity() {
  const { status } = usePlanStore();
  const { city: cityId = '' } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['city', cityId],
    queryFn: () => getCity(cityId),
  });
  return (
    <>
      {status === 'period_edit' ? <TravelPeriodModal /> : null}
      <WideLayout>
        {isLoading || !data ? (
          <Loading />
        ) : (
          <div className='flex h-full'>
            <PlanController />
            <div className='flex-1 bg-gray300'>
              <PlanMapContainer coordinates={data.coordinates} />
            </div>
          </div>
        )}
      </WideLayout>
    </>
  );
}
