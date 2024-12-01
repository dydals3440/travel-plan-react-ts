export default function useConfirm() {
  const confirm = (message: string) => {
    const dispatch = useDispatch();
    return new Promise<boolean>((resolve) => {
      dispatch(openModal({ onClose }));
    });
  };
}
