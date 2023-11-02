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
  test("Par défaut, affiche une commande habillement en point relais, en voiture, de 7km, hors trajet habituel (BC non nul), hors transport par avion (BC nul), et un BC total non nul", async () => {
    // Given
    renderWithWrapper(<CalculateurLivraison />);
    // When
    expect(await screen.findByTestId("calculateurTitleH2")).toBeInTheDocument();
    // Then
    expect(await screen.queryByTestId("produits").value).toBe("habillement");
    expect(await screen.queryByTestId("retraits").value).toBe("relais");
    expect(await screen.queryByTestId("relays").value).toBe("voiture_thermique");
    expect(await screen.queryByTestId("kms").value).toBe("7");
    expect(await screen.queryByTestId("bcTrajet").textContent).toBe("1,51 kg de CO2e");
    expect(await screen.queryByTestId("bcAvion").textContent).toBe("0,00 kg de CO2e");
  });
  test("Par défaut, affiche une commande habillement en point relais, en voiture, de 7km, hors trajet habituel (BC non nul), hors transport par avion (BC nul), et un BC total non nul", async () => {
    // Given
    renderWithWrapper(<CalculateurLivraison />);
    // When
    expect(await screen.findByTestId("calculateurTitleH2")).toBeInTheDocument();
    // Then
    expect(await screen.queryByTestId("produits").value).toBe("habillement");
    expect(await screen.queryByTestId("retraits").value).toBe("relais");
    expect(await screen.queryByTestId("relays").value).toBe("voiture_thermique");
    expect(await screen.queryByTestId("kms").value).toBe("7");
    expect(await screen.queryByTestId("bcTrajet").textContent).toBe("1,51 kg de CO2e");
    expect(await screen.queryByTestId("bcAvion").textContent).toBe("0,00 kg de CO2e");
    expect(await screen.queryByTestId("bcTotal").textContent).toBe("3,31 kg de CO2e ");
  });
});
