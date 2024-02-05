import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithWrapper } from '../test-utils/render-with-wrapper.js'
import YearlyLivraison from 'components/livraison/YearlyLivraison'

describe("YearlyLivraison - afficher le bilan carbone selon la fréquence d'achat", () => {
  test("Par défaut, s'affiche pour 1 colis par an, avec un bilan carbone total", async () => {
    // Given
    renderWithWrapper(<YearlyLivraison co2eq={2133} />)
    // When
    expect(await screen.findByTestId('induction')).toBeInTheDocument()
    // Then
    expect(await screen.findByTestId('numbers')).toHaveValue('1')
    expect(await screen.findByTestId('frequences')).toHaveValue('par_an')
    expect(await screen.findByTestId('kgCo2e')).toHaveTextContent(/^2,13 kg CO2e$/)
  })
  test('Double le bilan carbone si on double le nombre de colis', async () => {
    // Given
    renderWithWrapper(<YearlyLivraison co2eq={2133} />)
    // When
    expect(await screen.findByTestId('induction')).toBeInTheDocument()
    await userEvent.selectOptions(screen.getByTestId('numbers'), ['2'])
    // Then
    expect(await screen.findByTestId('numbers')).toHaveValue('2')
    expect(await screen.findByTestId('frequences')).toHaveValue('par_an')
    expect(await screen.findByTestId('kgCo2e')).toHaveTextContent(/^4,27 kg CO2e$/)
  })
  test('Multiplie par 12 le bilan carbone si on passe à une fréquence par mois', async () => {
    // Given
    renderWithWrapper(<YearlyLivraison co2eq={2133} />)
    // When
    expect(await screen.findByTestId('induction')).toBeInTheDocument()
    await userEvent.selectOptions(screen.getByTestId('frequences'), ['par_mois'])
    // Then
    expect(await screen.findByTestId('numbers')).toHaveValue('1')
    expect(await screen.findByTestId('frequences')).toHaveValue('par_mois')
    expect(await screen.findByTestId('kgCo2e')).toHaveTextContent(/^25,60 kg CO2e$/)
  })
  test('Multiplie par 52 le bilan carbone si on passe à une fréquence par semaine', async () => {
    // Given
    renderWithWrapper(<YearlyLivraison co2eq={2133} />)
    // When
    expect(await screen.findByTestId('induction')).toBeInTheDocument()
    await userEvent.selectOptions(screen.getByTestId('frequences'), ['par_semaine'])
    // Then
    expect(await screen.findByTestId('numbers')).toHaveValue('1')
    expect(await screen.findByTestId('frequences')).toHaveValue('par_semaine')
    expect(await screen.findByTestId('kgCo2e')).toHaveTextContent(/^110,92 kg CO2e$/)
  })
})
