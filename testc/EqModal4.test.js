import { renderWithWrapper } from "../test-utils/render-with-wrapper";
import { EqModal4Opener, initializeWith, openModal } from "./EqModal4/EqModal4Helper";
import "@testing-library/jest-dom";
import { act, screen } from "@testing-library/react";

describe("EqModal4 - Modale pour modifier les équivalences de la partie livraison", () => {
  beforeEach(async () => {
    window.localStorage.clear();
  });
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
    expect(container.getElementsByClassName("checked-eq").length).toBe(3);
    expect(screen.getByTestId("eqs-title")).toHaveTextContent("3/3 équivalences sélectionnées");
    expect(screen.getByTestId("checked-eq-streamingvideo")).toHaveTextContent("Streaming vidéo");
    expect(screen.getByTestId("checked-eq-repasavecduboeuf")).toHaveTextContent("Repas avec du boeuf");
    expect(screen.getByTestId("checked-eq-voiturethermique")).toHaveTextContent("Voiture");
  });

  it("Peut afficher d'autres sélections par défaut", () => {
    // Given
    initializeWith(["ail", "abricot"]);
    const { container } = renderWithWrapper(<EqModal4Opener />);
    // When
    act(() => {
      openModal(screen);
    });
    // Then
    expect(container.getElementsByClassName("checked-eq").length).toBe(2);
    expect(screen.getByTestId("eqs-title")).toHaveTextContent("2/3 équivalences sélectionnées");
    expect(screen.getByTestId("checked-eq-abricot")).toHaveTextContent("Abricot");
    expect(screen.getByTestId("checked-eq-ail")).toHaveTextContent("Ail");
  });

  it("On peut rajouter une équivalence, si il y en moins de 3 au départ, la nouvelle équivalence s'ajoute à la liste", () => {
    // Given
    initializeWith(["ail", "abricot"]);
    const { container } = renderWithWrapper(<EqModal4Opener />);
    act(() => {
      openModal(screen);
    });
    // When
    act(() => {
      screen.getByTestId("unchecked-eq-ananas").click();
    });
    // Then
    expect(container.getElementsByClassName("checked-eq").length).toBe(3);
    expect(screen.getByTestId("eqs-title")).toHaveTextContent("3/3 équivalences sélectionnées");
    expect(screen.getByTestId("checked-eq-abricot")).toHaveTextContent("Abricot");
    expect(screen.getByTestId("checked-eq-ail")).toHaveTextContent("Ail");
    expect(screen.getByTestId("checked-eq-ananas")).toHaveTextContent("Ananas");
  });
  it("On peut rajouter une équivalence, elle disparaît alors de la liste des équivalences non-cochées", () => {
    // Given
    initializeWith(["ail", "abricot"]);
    renderWithWrapper(<EqModal4Opener />);
    act(() => {
      openModal(screen);
    });
    // When
    act(() => {
      screen.getByTestId("unchecked-eq-ananas").click();
    });
    // Then
    expect(screen.queryByTestId("unchecked-eq-ananas")).not.toBeInTheDocument();
  });
  it("On peut supprimer une équivalence, elle disparaît alors de la liste des équivalences cochées", () => {
    // Given
    initializeWith(["ail", "abricot", "ananas"]);
    renderWithWrapper(<EqModal4Opener />);
    act(() => {
      openModal(screen);
    });
    // When
    act(() => {
      screen.getByTestId("checked-eq-ananas").click();
    });
    // Then
    expect(screen.queryByTestId("checked-eq-ananas")).not.toBeInTheDocument();
  });
});
