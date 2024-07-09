import { useState, useCallback } from "react";

const useModal = () => {
  const [show, setShow] = useState(false);

  const onOpen = useCallback(() => {
    setShow(true);
  }, []);

  const onClose = useCallback(() => {
    setShow(false);
  }, []);

  return {
    onOpen,
    onClose,
    show,
  };
};

export default useModal;
