import '@testing-library/jest-dom'
import { act, fireEvent, screen } from '@testing-library/react'
import { render } from '@testing-library/react'
import { useState } from 'react'
import NumberInput from 'components/osezchanger/components/NumberInput'

const Wrapper = () => {
  const [value, setValue] = useState<number | undefined>()
  return <NumberInput id='nop' value={value} setValue={setValue} data-testid='question' tracking='nop' />
}

describe('Number Input', () => {
  it('Should not input negative number', () => {
    render(<Wrapper />)

    act(() => {
      fireEvent.change(screen.getByTestId('question-input'), { target: { value: '-1' } })
    })

    expect(screen.getByTestId('question-input')).toHaveValue(0)
  })

  it('Should not reduce number below 0', () => {
    render(<Wrapper />)

    act(() => {
      screen.getByRole('button', { name: 'moins' }).click()
    })

    expect(screen.getByTestId('question-input')).toHaveValue(0)
    expect(screen.getByRole('button', { name: 'moins' })).toBeDisabled()
  })
})
