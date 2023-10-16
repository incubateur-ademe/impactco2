import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import IframeFooter from "components/layout/iframe/IframeFooter";
import { StyleProvider } from "components/providers/StyleProvider";

describe("IframeFooter", () => {
  it("renders a Footer specific to the iframe", () => {
    render(
      <StyleProvider>
        <IframeFooter />
      </StyleProvider>
    );
    // check if all components are rendered
    expect(screen.getByTestId("magic-link")).toHaveAttribute("href", "https://notdefined");
  });
});
