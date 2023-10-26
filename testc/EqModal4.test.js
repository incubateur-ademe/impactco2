import { localStorageImpl } from "../test-utils/mock-local-storage";
import { renderWithWrapper } from "../test-utils/render-with-wrapper";
import "@testing-library/jest-dom";
import { act, screen } from "@testing-library/react";
import ModalContext from "components/providers/ModalProvider";
import { useContext } from "react";

const EqModal4Opener = () => {
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
};

describe("EqModal4", () => {
  it("Will render only if required", () => {
    const { methods } = localStorageImpl.register();
    renderWithWrapper(<EqModal4Opener />);

    expect(screen.queryByTestId("eqs_modal_intro")).not.toBeInTheDocument();
    act(() => {
      screen.getByTestId("modalOpener").click();
    });
    expect(screen.getByTestId("eqs_modal_intro")).toHaveTextContent(
      "Sélectionnez plusieurs équivalences pour comparer votre impact et créer votre infographie personnalisée."
    );
    expect(methods.setItem).toBeCalledTimes(15);

    localStorageImpl.unregister();
  });
});
