import { render } from '@testing-library/react'
import { DataProvider } from 'components/providers/DataProvider'
import { ModalProvider } from 'components/providers/ModalProvider'
import { StyleProvider } from 'components/providers/StyleProvider'

export function renderWithModal(component, options) {
  const Wrapper = ({ children }) => {
    return (
      <DataProvider>
        <StyleProvider>
          <ModalProvider>{children}</ModalProvider>
        </StyleProvider>
      </DataProvider>
    )
  }

  return render(component, { wrapper: Wrapper, ...options })
}
