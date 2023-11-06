import { render } from "@testing-library/react";
import { StyleProvider } from "components/providers/StyleProvider";

export function renderWithStyle(component, options) {
  const Wrapper = ({ children }) => {
    return <StyleProvider>{children}</StyleProvider>;
  };

  return render(component, { wrapper: Wrapper, ...options });
}
