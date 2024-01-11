import { render } from '@testing-library/react'
import { DataProvider } from 'components/providers/DataProvider'
import { ModalProvider } from 'components/providers/ModalProvider'

export function renderWithModal(component, options) {
  const Wrapper = ({ children }) => {
    return (
      <DataProvider>
        <ModalProvider>{children}</ModalProvider>
      </DataProvider>
    )
  }

  return render(component, { wrapper: Wrapper, ...options })
}
