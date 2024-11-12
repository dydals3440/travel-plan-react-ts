import { City } from '@/types';
import Card from './Card';
import { useModalStore } from '@/store';
import Modal, { ModalBackdrop, ModalPanel } from '../common/Modal';
import CloseIcon from '@/assets/icons/close.svg?react';
import CityDetail from './CityDetail';

// 재활용할 일 없으니, 명확한 이름으로
interface Props {
  cities: City[];
}

export default function CityList({ cities }: Props) {
  const { openModal } = useModalStore();

  const openDetailModal = (city: City) => {
    openModal(({ onClose }) => (
      <Modal>
        <ModalBackdrop />
        <ModalPanel>
          <div className='rounded-20 border border-gray100 bg-[#ffffff] px-28 pt-58 pb-37 relative w-[655px] min-h-[300px]'>
            <button onClick={onClose} className='absolute right-28 top-22'>
              <CloseIcon />
            </button>
            <CityDetail city={city} />
          </div>
        </ModalPanel>
      </Modal>
    ));
  };

  return (
    // 한 라인 넘어가면, 아랫줄에 기록되게
    // justify-between을 통해 사이에 간격주게함.
    <div className='flex flex-wrap justify-between gap-y-28 items-start w-full'>
      {cities.map((city) => (
        <button onClick={() => openDetailModal(city)} key={city.code}>
          <Card
            key={city.code}
            title={city.nameEn.toLocaleUpperCase()}
            description={`${city.country.name} ${city.name}`}
            image={city.thumbnail}
          />
        </button>
      ))}
    </div>
  );
}
