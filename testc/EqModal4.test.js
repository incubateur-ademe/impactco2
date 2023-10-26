import { localStorageImpl } from "../test-utils/mock-local-storage";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import EqModal4 from "components/modals/EqModal4";
import { DataProvider } from "components/providers/DataProvider";
import { ModalProvider } from "components/providers/ModalProvider";
import { ThemeProvider } from "styled-components";
import { themes } from "utils/styles";

describe("EqModal4", () => {
  it("renders a Modal to change equivalences", () => {
    const { methods } = localStorageImpl.register();
    render(
      <DataProvider>
        <ModalProvider>
          <ThemeProvider theme={themes["default"]}>
            <EqModal4 />
          </ThemeProvider>
        </ModalProvider>
      </DataProvider>
    );
    // check if all components are rendered
    expect(screen.getByTestId("eqs_selected")).toHaveText("blabla");
    expect(methods.setItem).toBeCalledTimes(1);

    localStorageImpl.unregister();
  });
});
