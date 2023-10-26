import { localStorageImpl } from "../test-utils/mock-local-storage";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import EqModal4 from "components/modals/EqModal4";
import { DataProvider } from "components/providers/DataProvider";
import ModalContext, { ModalProvider } from "components/providers/ModalProvider";
import { StyleProvider } from "components/providers/StyleProvider";
import { useContext, useEffect } from "react";

const ModalOpener = () => {
  const { setEqv } = useContext(ModalContext);

  useEffect(() => {
    setEqv(true);
  }, []);

  return (
    <>
      <button data-testid="modalopener" id="button-close">
        Open modal
      </button>
    </>
  );
};

describe("EqModal4", () => {
  it("renders a Modal to change equivalences", () => {
    const { methods } = localStorageImpl.register();
    // renderWithWrapper(
    //   <EqModal4 open={true}/>
    // )
    render(
      <DataProvider>
        <StyleProvider>
          <ModalProvider>
            <ModalOpener />
            <EqModal4 />
          </ModalProvider>
        </StyleProvider>
      </DataProvider>
    );
    // check if all components are rendered
    // expect(screen.getByTestId("eqs_selected")).toHaveText("blabla");

    expect(screen.getByTestId("intro")).toHaveText("blabla");
    expect(methods.setItem).toBeCalledTimes(1);

    localStorageImpl.unregister();
  });
});
