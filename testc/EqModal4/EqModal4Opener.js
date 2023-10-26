import ModalContext from "components/providers/ModalProvider";
import { useContext } from "react";

export default function EqModal4Opener() {
  const { setEqv } = useContext(ModalContext);

  const clicked = () => {
    setEqv(true);
  };

  return (
    <>
      <button data-testid="modalOpener" onClick={clicked}>
        Open modal
      </button>
    </>
  );
}

export const openModal = (screen) => {
  screen.getByTestId("modalOpener").click();
};
