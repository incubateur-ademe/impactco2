import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import IframeFooter from "components/layout/iframe/IframeFooter";

describe("Calculator", () => {
  it("renders a calculator", () => {
    render(<IframeFooter />);
    // check if all components are rendered
    expect(screen.getByTestId("result")).toBeInTheDocument();
  });
});
