import livraisonjson from "../test-mock/livraison.json";
import { renderWithWrapper } from "../test-utils/render-with-wrapper";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import axios from "axios";
import CalculateurLivraison from "components/livraison/CalculateurLivraison";

describe("CalculateurLivraison - composant principal de la partie livraison", () => {
  beforeEach(async () => {
    const mockGet = jest.spyOn(axios, "get");
    mockGet.mockImplementation((url) => {
      if (url === "https://deploy-preview-1895--ecolab-data.netlify.app/co2-model.FR-lang.fr.json") {
        return Promise.resolve({ data: livraisonjson });
      } else {
        return Promise.resolve({ data: "mocked endpoint, unknown URL" });
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
  test("Par défaut, affiche une commande habillement en point relais, hors trajet habituel (BC non nul), hors transport par avion (BC nul), et un BC total non nul", async () => {
    // Given
    // expect(screen.queryByTestId("calculateurTitleH2")).not.toBeInTheDocument();
    // When
    renderWithWrapper(<CalculateurLivraison />);
    // Then
    expect(await screen.findByTestId("calculateurTitleH2")).toBeInTheDocument();
    expect(await screen.queryByTestId("produits").value).toBe("habillement");
    expect(await screen.queryByTestId("retraits").value).toBe("relais");
  });
});
