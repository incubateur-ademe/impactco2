import ModalContext from "components/providers/ModalProvider";
import { useContext } from "react";

export function EqModal4Opener() {
  const { eqv, setEqv } = useContext(ModalContext);

  const clicked = () => {
    setEqv(!eqv);
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
export const initializeWith = (array) => {
  window.localStorage.setItem("ico2_eqv_chosen", JSON.stringify(array));
  window.localStorage.setItem("ico2_eqv_array", JSON.stringify(array));
};
