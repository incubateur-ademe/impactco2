import { renderWithStyle } from "../test-utils/render-with-style";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import YearlyLivraison from "components/livraison/YearlyLivraison";

describe("YearlyLivraison - afficher le bilan carbone selon la fréquence d'achat", () => {
  test("Par défaut, s'affiche pour 1 colis par an, avec un bilan carbone total", async () => {
    // Given
    renderWithStyle(<YearlyLivraison co2eq={2133} />);
    // When
    expect(await screen.findByTestId("induction")).toBeInTheDocument();
    // Then
    expect(await screen.queryByTestId("numbers").value).toBe("1");
    expect(await screen.queryByTestId("frequences").value).toBe("par_an");
    expect(await screen.queryByTestId("kgCo2e")).toHaveTextContent("2,13 kg CO2e");
  });
  test("Double le bilan carbone si on double le nombre de colis", async () => {
    // Given
    renderWithStyle(<YearlyLivraison co2eq={2133} />);
    // When
    expect(await screen.findByTestId("induction")).toBeInTheDocument();
    await userEvent.selectOptions(screen.getByTestId("numbers"), ["2"]);
    // Then
    expect(await screen.queryByTestId("numbers").value).toBe("2");
    expect(await screen.queryByTestId("frequences").value).toBe("par_an");
    expect(await screen.queryByTestId("kgCo2e")).toHaveTextContent("4,27 kg CO2e");
  });
  test("Multiplie par 12 le bilan carbone si on passe à une fréquence par mois", async () => {
    // Given
    renderWithStyle(<YearlyLivraison co2eq={2133} />);
    // When
    expect(await screen.findByTestId("induction")).toBeInTheDocument();
    await userEvent.selectOptions(screen.getByTestId("frequences"), ["par_mois"]);
    // Then
    expect(await screen.queryByTestId("numbers").value).toBe("1");
    expect(await screen.queryByTestId("frequences").value).toBe("par_mois");
    expect(await screen.queryByTestId("kgCo2e")).toHaveTextContent("25,60 kg CO2e");
  });
  test("Multiplie par 52 le bilan carbone si on passe à une fréquence par semaine", async () => {
    // Given
    renderWithStyle(<YearlyLivraison co2eq={2133} />);
    // When
    expect(await screen.findByTestId("induction")).toBeInTheDocument();
    await userEvent.selectOptions(screen.getByTestId("frequences"), ["par_semaine"]);
    // Then
    expect(await screen.queryByTestId("numbers").value).toBe("1");
    expect(await screen.queryByTestId("frequences").value).toBe("par_semaine");
    expect(await screen.queryByTestId("kgCo2e")).toHaveTextContent("110,92 kg CO2e");
  });
});
