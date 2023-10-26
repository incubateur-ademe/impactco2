import { localStorageImpl } from "../test-utils/mock-local-storage";
import { renderWithWrapper } from "../test-utils/render-with-wrapper";
import EqModal4Opener from "./EqModal4/EqModal4Opener";
import "@testing-library/jest-dom";
import { act, screen } from "@testing-library/react";

describe("EqModal4", () => {
  it("Will render only if required", () => {
    // Given
    renderWithWrapper(<EqModal4Opener />);
    expect(screen.queryByTestId("eqs_modal_intro")).not.toBeInTheDocument();
    // When
    act(() => {
      screen.getByTestId("modalOpener").click();
    });
    // Then
    expect(screen.getByTestId("eqs_modal_intro")).toHaveTextContent(
      "Sélectionnez plusieurs équivalences pour comparer votre impact et créer votre infographie personnalisée."
    );
  });

  it("Will choose voiturethermique, repasavecduboeuf and streamingvideo by default", () => {
    // Setup
    const { storage } = localStorageImpl.register();

    // Given
    expect(storage.ico2_eqv_chosen).toEqual(undefined);
    // When
    renderWithWrapper(<EqModal4Opener />);
    // Then
    expect(storage.ico2_eqv_chosen).toEqual(JSON.stringify(["voiturethermique", "repasavecduboeuf", "streamingvideo"]));

    // TearDown
    localStorageImpl.unregister();
  });
});
