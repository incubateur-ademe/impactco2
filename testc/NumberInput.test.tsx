import '@testing-library/jest-dom'
import { act, fireEvent, screen } from '@testing-library/react'
import { renderWithStyle } from 'test-utils/render-with-style'
import NumberInput from 'components/transport/search/distance/NumberInput'

describe('Number Input', () => {
  it('Should not input negative number', () => {
    renderWithStyle(<NumberInput />)

    act(() => {
      fireEvent.change(screen.getByTestId('question-avis-input'), { target: { value: '-1' } })
    })

    expect(screen.getByTestId('question-avis-input')).toHaveValue(0)
  })

  it('Should not reduce number below 0', () => {
    renderWithStyle(<NumberInput />)

    act(() => {
      screen.getAllByRole('button', { name: '-' })[0].click()
    })

    expect(screen.getByTestId('question-avis-input')).toHaveValue(0)
    expect(screen.getByTestId('question-avis-input')).toBeDisabled()
  })
})
