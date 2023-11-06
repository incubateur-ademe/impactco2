import { render } from "@testing-library/react";
import { DataProvider } from "components/providers/DataProvider";
import ModalContext, { ModalProvider } from "components/providers/ModalProvider";
import { StyleProvider } from "components/providers/StyleProvider";
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

export function renderWithWrapperForEqs(component, options) {
  const Wrapper = ({ children }) => (
    <DataProvider>
      <StyleProvider>
        <ModalProvider>{children}</ModalProvider>
      </StyleProvider>
    </DataProvider>
  );

  return render(component, { wrapper: Wrapper, ...options });
}
