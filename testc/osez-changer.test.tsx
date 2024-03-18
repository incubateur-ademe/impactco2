import '@testing-library/jest-dom'
import { act, fireEvent, screen } from '@testing-library/react'
import { render } from '@testing-library/react'
import Defi from 'components/osezchanger/Defi'
import OsezChanger from 'components/osezchanger/OsezChanger'

describe('Osez Changer', () => {
  it('Should display correct tag when items are filled', () => {
    render(<OsezChanger />)

    expect(screen.queryByTestId('defi')).toBeNull()
    act(() => {
      screen.getByTestId('osez-changer-start-button').click()
    })
    expect(screen.getByTestId('defi')).not.toBeNull()

    expect(screen.queryByTestId('question-avis-tag')).toBeNull()
    expect(screen.queryByTestId('question-vraie-tag')).toBeNull()
    expect(screen.queryByTestId('question-neuf-tag')).toBeNull()
    expect(screen.queryByTestId('defi-empty-result')).toBeVisible()

    act(() => {
      screen.getAllByRole('button', { name: 'plus' })[0].click()
    })
    expect(screen.queryByTestId('question-avis-tag')).toBeNull()
    expect(screen.queryByTestId('question-vraie-tag')).toBeNull()
    expect(screen.queryByTestId('question-neuf-tag')).toBeNull()
    expect(screen.queryByTestId('defi-empty-result')).toBeVisible()

    act(() => {
      screen.getAllByRole('button', { name: 'plus' })[1].click()
    })
    expect(screen.queryByTestId('question-avis-tag')).toBeNull()
    expect(screen.queryByTestId('question-vraie-tag')).not.toBeNull()
    expect(screen.queryByTestId('question-vraie-tag')).toHaveTextContent('0 paire')
    expect(screen.queryByTestId('question-neuf-tag')).toBeNull()
    expect(screen.queryByTestId('defi-empty-result')).toBeVisible()

    act(() => {
      screen.getAllByRole('button', { name: 'plus' })[2].click()
    })
    expect(screen.queryByTestId('question-avis-tag')).toBeNull()
    expect(screen.queryByTestId('question-vraie-tag')).not.toBeNull()
    expect(screen.queryByTestId('question-neuf-tag')).not.toBeNull()
    expect(screen.queryByTestId('question-neuf-tag')).toHaveTextContent('+16,5kg CO2e')
    expect(screen.queryByTestId('defi-empty-result')).not.toBeVisible()
    expect(screen.queryByTestId('defi-result-title')).toHaveTextContent('1 paire de chaussure neuve (+16,5kg de CO2e)')
    expect(screen.queryByTestId('defi-equivalent-tshirt-value')).toHaveTextContent('2,6')
    expect(screen.queryByTestId('defi-equivalent-smartphone-value')).toHaveTextContent('0,4')
    expect(screen.queryByTestId('defi-equivalent-vegetarian-value')).toHaveTextContent('32,4')
  })

  it('Should render hypothesis modal', () => {
    render(<OsezChanger />)
    act(() => {
      screen.getByTestId('osez-changer-start-button').click()
    })

    expect(screen.queryByTestId('hypothesis-modal')).toBeNull()
    act(() => {
      screen.getByTestId('hypothesis-button').click()
    })

    expect(screen.queryByTestId('hypothesis-modal')).not.toBeNull()
    act(() => {
      screen.getByRole('button', { name: 'Fermer' }).click()
    })
    expect(screen.queryByTestId('hypothesis-modal')).toBeNull()
  })

  it('Should render share modal', () => {
    render(<OsezChanger />)
    act(() => {
      screen.getByTestId('osez-changer-start-button').click()
    })

    expect(screen.queryByTestId('share-modal')).toBeNull()
    act(() => {
      screen.getByRole('button', { name: 'Partager' }).click()
    })

    expect(screen.queryByTestId('share-modal')).not.toBeNull()
    act(() => {
      screen.getByRole('button', { name: 'Annuler' }).click()
    })
    expect(screen.queryByTestId('share-modal')).toBeNull()
  })

  it('Should render integration modal', () => {
    render(<OsezChanger />)
    act(() => {
      screen.getByTestId('osez-changer-start-button').click()
    })

    expect(screen.queryByTestId('integration-modal')).toBeNull()
    act(() => {
      screen.getByRole('button', { name: 'Intégrer' }).click()
    })

    expect(screen.queryByTestId('integration-modal')).not.toBeNull()
    act(() => {
      screen.getByRole('button', { name: 'Annuler' }).click()
    })
    expect(screen.queryByTestId('integration-modal')).toBeNull()
  })

  it('Should calculate co2e value based on input', () => {
    render(<Defi setOverScreen={() => console.log} />)
    act(() => {
      fireEvent.change(screen.getByTestId('question-neuf-input'), { target: { value: '3' } })
    })
    expect(screen.queryByTestId('question-neuf-tag')).toHaveTextContent('+49,5kg CO2e')
    expect(screen.queryByTestId('defi-result-title')).toHaveTextContent(
      '3 paires de chaussures neuves (+49,5kg de CO2e)'
    )
    expect(screen.queryByTestId('defi-equivalent-tshirt-value')).toHaveTextContent('7,7')
    expect(screen.queryByTestId('defi-equivalent-smartphone-value')).toHaveTextContent('1,3')
    expect(screen.queryByTestId('defi-equivalent-vegetarian-value')).toHaveTextContent('97,1')
  })

  it('Should calculate shoes value based on input', () => {
    render(<Defi setOverScreen={() => console.log} />)

    act(() => {
      fireEvent.change(screen.getByTestId('question-avis-input'), { target: { value: '5' } })
    })

    act(() => {
      fireEvent.change(screen.getByTestId('question-vraie-input'), { target: { value: '6' } })
    })
    expect(screen.queryByTestId('question-avis-tag')).toBeNull()
    expect(screen.queryByTestId('question-vraie-tag')).not.toBeNull()
    expect(screen.queryByTestId('question-vraie-tag')).toHaveTextContent('+1 paire')
    expect(screen.queryByTestId('question-neuf-tag')).toBeNull()

    act(() => {
      fireEvent.change(screen.getByTestId('question-vraie-input'), { target: { value: '10' } })
    })
    expect(screen.queryByTestId('question-avis-tag')).toBeNull()
    expect(screen.queryByTestId('question-vraie-tag')).not.toBeNull()
    expect(screen.queryByTestId('question-vraie-tag')).toHaveTextContent('+5 paires')
    expect(screen.queryByTestId('question-neuf-tag')).toBeNull()
  })
})
