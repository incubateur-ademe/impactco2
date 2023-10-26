import { localStorageImpl } from "../test-utils/mock-local-storage";
import { renderWithWrapper } from "../test-utils/render-with-wrapper";
import EqModal4Opener from "./EqModal4/EqModal4Opener";
import "@testing-library/jest-dom";
import { act, screen } from "@testing-library/react";

describe("EqModal4 - Modale pour modifier les équivalences de la partie livraison", () => {
  let test_storage;

  beforeEach(async () => {
    const { storage } = localStorageImpl.register();
    test_storage = storage;
  });
  afterEach(async () => {
    localStorageImpl.unregister();
  });

  it("Ne s'affiche pas du tout dans la page, par défaut", () => {
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

  it("Stocke en local les options par défaut - voiturethermique, repasavecduboeuf, streamingvideo", () => {
    // Given
    expect(test_storage.ico2_eqv_chosen).toEqual(undefined);
    // When
    renderWithWrapper(<EqModal4Opener />);
    // Then
    expect(test_storage.ico2_eqv_chosen).toEqual(
      JSON.stringify(["voiturethermique", "repasavecduboeuf", "streamingvideo"])
    );
  });
  it("Affiche dans une colonne les options présentes par défaut, avec un nom détaillé", () => {
    //Given
    renderWithWrapper(<EqModal4Opener />);
    // When
    act(() => {
      screen.getByTestId("modalOpener").click();
    });
    // Then
    expect(screen.getByTestId("chosen-voiturethermique")).toHaveTextContent("Voiture (moteur thermique)");
    expect(screen.getByTestId("chosen-repasavecduboeuf")).toHaveTextContent("Repas avec du boeuf");
    expect(screen.getByTestId("chosen-streamingvideo")).toHaveTextContent("Streaming vidéo");
  });
  it("Affiche le nombre d'options choisies, et le nombre d'options max", () => {
    //Given
    renderWithWrapper(<EqModal4Opener />);
    // When
    act(() => {
      screen.getByTestId("modalOpener").click();
    });
    // Then
    expect(screen.getByTestId("eqs_selected")).toHaveTextContent("3/3 équivalences sélectionnées");
  });
  it("Retire une option si un utilisateur clique dessus", () => {
    //Given
    renderWithWrapper(<EqModal4Opener />);
    act(() => {
      screen.getByTestId("modalOpener").click();
    });

    // When
    act(() => {
      screen.getByTestId("chosen-voiturethermique").click();
    });

    // Then
    // expect(screen.getElementsByClassName('equivalent-radio').length).toBe(1);
    expect(screen.getByTestId("eqs_selected")).toHaveTextContent("2/3 équivalences sélectionnées");
  });
});
