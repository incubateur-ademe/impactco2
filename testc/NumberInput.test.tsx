import '@testing-library/jest-dom'
import { act, fireEvent, screen } from '@testing-library/react'
import { useState } from 'react'
import { renderWithStyle } from 'test-utils/render-with-style'
import NumberInput from 'components/osezchanger/components/NumberInput'

const Wrapper = () => {
  const [value, setValue] = useState<number | undefined>()
  return <NumberInput value={value} setValue={setValue} data-testid='question' />
}

describe('Number Input', () => {
  it('Should not input negative number', () => {
    renderWithStyle(<Wrapper />)

    act(() => {
      fireEvent.change(screen.getByTestId('question-input'), { target: { value: '-1' } })
    })

    expect(screen.getByTestId('question-input')).toHaveValue(0)
  })

  it('Should not reduce number below 0', () => {
    renderWithStyle(<Wrapper />)

    act(() => {
      screen.getByRole('button', { name: '-' }).click()
    })

    expect(screen.getByTestId('question-input')).toHaveValue(0)
    expect(screen.getByRole('button', { name: '-' })).toBeDisabled()
  })
})
