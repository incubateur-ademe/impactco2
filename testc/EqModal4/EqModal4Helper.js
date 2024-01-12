import { render } from '@testing-library/react'
import { DataProvider } from 'components/providers/DataProvider'
import useModalContext, { ModalProvider } from 'components/providers/ModalProvider'

export function EqModal4Opener() {
  const { eqv, setEqv } = useModalContext()

  const clicked = () => {
    setEqv(!eqv)
  }

  return (
    <>
      <button data-testid='modalOpener' onClick={clicked}>
        Open modal
      </button>
    </>
  )
}

export const openModal = (screen) => {
  screen.getByTestId('modalOpener').click()
}
export const initializeWith = (array) => {
  window.localStorage.setItem('ico2_eqv_chosen', JSON.stringify(array))
  window.localStorage.setItem('ico2_eqv_array', JSON.stringify(array))
}

export function renderWithWrapperForEqs(component, options) {
  const Wrapper = ({ children }) => (
    <DataProvider>
      <ModalProvider>{children}</ModalProvider>
    </DataProvider>
  )

  return render(component, { wrapper: Wrapper, ...options })
}
