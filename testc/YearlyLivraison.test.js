import { renderWithStyle } from "../test-utils/render-with-style";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import YearlyLivraison from "components/livraison/YearlyLivraison";

describe("YearlyLivraison - afficher le bilan carbone selon la fréquence d'achat", () => {
  test("S'affiche sans erreur, avec un titre de niveau h2", async () => {
    // Given
    // When
    renderWithStyle(<YearlyLivraison co2eq={2133} />);
    // Then
    expect(await screen.findByTestId("induction")).toBeInTheDocument();
    // expect(await screen.queryByTestId("induction")).toHaveTextContent("blabla");
    expect(await screen.queryByTestId("deduction")).toHaveTextContent(
      "alors l’impact carbone de mes livraisons est de 2,13 kg CO2e par an*"
    );
  });
});
