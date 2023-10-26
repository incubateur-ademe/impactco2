import { localStorageImpl } from "../test-utils/mock-local-storage";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { DataProvider } from "components/providers/DataProvider";
import ModalContext, { ModalProvider } from "components/providers/ModalProvider";
import { StyleProvider } from "components/providers/StyleProvider";
import { useContext } from "react";

const EqModal4Opener = () => {
  const { setEqv } = useContext(ModalContext);

  const clicked = () => {
    console.log("clicked");
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
  it("renders a Modal to change equivalences", () => {
    // const { methods } = localStorageImpl.register();
    // renderWithWrapper(
    //   <EqModal4 open={true}/>
    // )
    render(
      <DataProvider>
        <StyleProvider>
          <ModalProvider>
            <EqModal4Opener />
          </ModalProvider>
        </StyleProvider>
      </DataProvider>
    );
    // check if all components are rendered
    // expect(screen.getByTestId("eqs_selected")).toHaveText("blabla");

    expect(screen.queryByTestId("eqs_modal")).not.toBeInTheDocument();
    // expect(screen.getByTestId("intro")).toHaveTextContent('some text');
    // expect(methods.setItem).toBeCalledTimes(1);

    localStorageImpl.unregister();
  });
});
