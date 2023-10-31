import { renderWithWrapper } from "../test-utils/render-with-wrapper";
import { EqModal4Opener, openModal } from "./EqModal4/EqModal4Helper";
import "@testing-library/jest-dom";
import { act, screen } from "@testing-library/react";

describe("EqModal4 - Modale pour modifier les équivalences de la partie livraison", () => {
  it("Ne s'affiche pas, sauf si on lui demande", () => {
    // Given
    renderWithWrapper(<EqModal4Opener />);
    expect(screen.queryByTestId("eqs_modal_intro")).not.toBeInTheDocument();
    // When
    act(() => {
      openModal(screen);
    });
    // Then
    expect(screen.getByTestId("eqs_modal_intro")).toHaveTextContent(
      "Sélectionnez plusieurs équivalences pour comparer votre impact et créer votre infographie personnalisée."
    );
  });
  it("Affiche 3 sélections, par défaut", () => {
    // Given
    const { container } = renderWithWrapper(<EqModal4Opener />);
    // When
    act(() => {
      openModal(screen);
    });
    // Then
    expect(container.getElementsByClassName("equivalent-checked").length).toBe(3);
    expect(screen.getByTestId("eqs_selected")).toHaveTextContent("3/3 équivalences sélectionnées");
    expect(screen.getByTestId("chosen-streamingvideo")).toHaveTextContent("Streaming vidéo");
    expect(screen.getByTestId("chosen-repasavecduboeuf")).toHaveTextContent("Repas avec du boeuf");
    expect(screen.getByTestId("chosen-voiturethermique")).toHaveTextContent("Voiture");
  });
});
