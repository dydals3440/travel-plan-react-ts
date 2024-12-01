import useSwitch from '@/hooks/useSwitch';

export default function ModalOpener() {
  const { on, toggle } = useSwitch();

  return (
    <div>
      <button onClick={toggle}>Open Modal</button>
      {on && (
        <div className='modal'>
          <div className='modal-content'>
            <p>Modal</p>
            <button onClick={toggle}>close modal</button>
          </div>
        </div>
      )}
    </div>
  );
}
