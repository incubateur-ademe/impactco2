import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import EqModal4 from "components/modals/EqModal4";
import { StyleProvider } from "components/providers/StyleProvider";

describe("EqModal4", () => {
  it("renders a Modal to change equivalences", () => {
    render(
      <StyleProvider>
        <EqModal4 />
      </StyleProvider>
    );
    // check if all components are rendered
    expect(screen.getByTestId("magic-link")).toHaveAttribute("href", "https://notdefined");
  });
});
