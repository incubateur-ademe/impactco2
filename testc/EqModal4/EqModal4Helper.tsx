import { act, screen } from '@testing-library/react'
import { useState } from 'react'
import EqModal from 'components/modals/EqModal'

export function EqModalOpener() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {open && <EqModal setOpen={setOpen} />}
      <button data-testid='modalOpener' onClick={() => setOpen(true)}>
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
