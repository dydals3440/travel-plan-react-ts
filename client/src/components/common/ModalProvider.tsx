import { useModalStore } from '@/store';

export default function ModalProvider() {
  const { modals, closeModal } = useModalStore();

  // 모달에 대한 모든 내용들이 여기에 관심사를 쏟아넣음.
  //   useEffect(() => {
  //     setModal([]);
  //   }, []);

  return (
    <>
      {modals.map((Modal, index) => (
        <Modal key={index} onClose={() => closeModal(index)} />
      ))}
    </>
  );
}
