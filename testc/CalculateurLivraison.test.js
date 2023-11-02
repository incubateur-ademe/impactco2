import livraisonjson from "../test-mock/livraison.json";
import { renderWithWrapper } from "../test-utils/render-with-wrapper";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import axios from "axios";
import CalculateurLivraison from "components/livraison/CalculateurLivraison";

describe("CalculateurLivraison - composant principal de la partie livraison", () => {
  beforeEach(async () => {
    jest.spyOn(axios, "get").mockReturnValue(Promise.resolve({ data: livraisonjson }));

    const mockGet = jest.spyOn(axios, "get");
    mockGet.mockImplementation((url) => {
      switch (url) {
        case "https://deploy-preview-1895--ecolab-data.netlify.app/co2-model.FR-lang.fr.json":
          return Promise.resolve({ data: livraisonjson });
      }
    });

    jest.spyOn(console, "warn").mockImplementation(() => {});
  });
  test("S'affiche sans erreur, avec un titre de niveau h2", async () => {
    // Given
    expect(screen.queryByTestId("calculateurTitleH2")).not.toBeInTheDocument();
    // When
    renderWithWrapper(<CalculateurLivraison />);
    // Then
    expect(await screen.findByTestId("calculateurTitleH2")).toBeInTheDocument();
    expect(await screen.queryByTestId("calculateurTitleH2")).toHaveTextContent("Estimez l'impact de votre livraison");
  });
});
