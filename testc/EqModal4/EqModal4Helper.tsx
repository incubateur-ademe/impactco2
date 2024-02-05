import { act, screen } from '@testing-library/react'
import useModalContext from 'components/providers/ModalProvider'

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

export const openModal = () => {
  screen.getByTestId('modalOpener').click()
}
export const initializeWith = (array: string[]) => {
  act(() => {
    openModal()
  })

  act(() => {
    screen.getByTestId('checked-eq-streamingvideo').click()
  })
  act(() => {
    screen.getByTestId('checked-eq-repasavecduboeuf').click()
  })
  act(() => {
    screen.getByTestId('checked-eq-voiturethermique').click()
  })
  array.forEach((item) =>
    act(() => {
      screen.getByTestId(`unchecked-eq-${item}`).click()
    })
  )
}
