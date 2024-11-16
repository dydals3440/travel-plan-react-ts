import PlaceContainer from './PlaceContainer';

export default function PlaceController() {
  return (
    <div className='h-full'>
      <div className='p-14 border-b-3 border-b-main text-center mb-18'>
        <h4 className='text-18 font-semibold text-main'>장소 선택</h4>
      </div>
      <PlaceContainer />
    </div>
  );
}
