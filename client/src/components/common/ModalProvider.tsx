import { useModalStore } from '@/store';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ModalProvider() {
  const { modals, closeModal, clearModals } = useModalStore();
  // route가 달라질떄 모달 닫히게함
  const location = useLocation();

  useEffect(() => {
    clearModals();
  }, [location, clearModals]);

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
