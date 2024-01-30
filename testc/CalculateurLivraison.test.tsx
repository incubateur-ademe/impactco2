import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithWrapper } from '../test-utils/render-with-wrapper'
import CalculateurLivraison from 'components/livraison/CalculateurLivraison'

describe('CalculateurLivraison - composant principal de la partie livraison', () => {
  test("S'affiche sans erreur, avec un titre de niveau h2", async () => {
    // Given
    expect(screen.queryByTestId('calculateurTitleH2')).not.toBeInTheDocument()
    // When
    renderWithWrapper(<CalculateurLivraison />)
    // Then
    expect(await screen.findByTestId('calculateurTitleH2')).toBeInTheDocument()
    expect(await screen.queryByTestId('calculateurTitleH2')).toHaveTextContent("Estimez l'impact de votre livraison")
  })
  test('Par défaut, affiche une commande habillement en point relais, en voiture, de 7km, hors trajet habituel (BC non nul), hors transport par avion (BC nul), et un BC total non nul', async () => {
    // Given
    // When
    renderWithWrapper(<CalculateurLivraison />)
    // Then
    expect(await screen.findByTestId('calculateurTitleH2')).toBeInTheDocument()
    expect(await screen.findByTestId('produits')).toHaveValue('habillement')
    expect(await screen.findByTestId('retraits')).toHaveValue('relais')
    expect(await screen.findByTestId('relays')).toHaveValue('voiture_thermique')
    expect(await screen.findByTestId('kms')).toHaveValue(7)
    expect(await screen.findByTestId('bcTrajet')).toHaveTextContent(/^1,51 kg de CO2e$/)
    expect(await screen.findByTestId('bcAvion')).toHaveTextContent(/^0,00 kg de CO2e$/)
    expect(await screen.findByTestId('bcTotal')).toHaveTextContent(/^3,31 kg de CO2e$/)
  })
  test('Un produit de grande consommation augmente le bilan carbone (BC)', async () => {
    // Given
    renderWithWrapper(<CalculateurLivraison />)
    expect(await screen.findByTestId('calculateurTitleH2')).toBeInTheDocument()
    // When
    await userEvent.selectOptions(screen.getByTestId('produits'), ['consommation'])
    // Then
    expect(await screen.findByTestId('produits')).toHaveValue('consommation')
    expect(await screen.findByTestId('bcTotal')).toHaveTextContent(/^21,54 kg de CO2e$/)
  })
  test('Un produit culturel diminue le bilan carbone (BC)', async () => {
    // Given
    renderWithWrapper(<CalculateurLivraison />)
    expect(await screen.findByTestId('calculateurTitleH2')).toBeInTheDocument()
    // When
    await userEvent.selectOptions(screen.getByTestId('produits'), ['culturel'])
    // Then
    expect(await screen.findByTestId('produits')).toHaveValue('culturel')
    expect(await screen.findByTestId('bcTotal')).toHaveTextContent(/^1,78 kg de CO2e$/)
  })
  test('Un produit volumineux augmente le bilan carbone (BC)', async () => {
    // Given
    renderWithWrapper(<CalculateurLivraison />)
    expect(await screen.findByTestId('calculateurTitleH2')).toBeInTheDocument()
    // When
    await userEvent.selectOptions(screen.getByTestId('produits'), ['volumineux'])
    // Then
    expect(await screen.findByTestId('produits')).toHaveValue('volumineux')
    expect(await screen.findByTestId('bcTotal')).toHaveTextContent(/^72,15 kg de CO2e$/)
  })
  test("La partie magasin et la partie avion s'affichent par défaut", async () => {
    // Given
    // When
    renderWithWrapper(<CalculateurLivraison />)
    // Then
    expect(await screen.findByTestId('calculateurTitleH2')).toBeInTheDocument()
    expect(await screen.findByTestId('retraits')).toHaveValue('relais')
    expect(await screen.findByTestId('partieMagasin')).toBeVisible()
    expect(await screen.findByTestId('partieAvion')).toBeVisible()
  })
  test("Si on choisit le click&collect, la partie magasin et avions s'affichent également", async () => {
    // Given
    renderWithWrapper(<CalculateurLivraison />)
    expect(await screen.findByTestId('calculateurTitleH2')).toBeInTheDocument()
    // When
    await userEvent.selectOptions(screen.getByTestId('retraits'), ['click'])
    // Then
    expect(await screen.findByTestId('retraits')).toHaveValue('click')
    expect(await screen.findByTestId('partieMagasin')).toBeVisible()
    expect(await screen.findByTestId('partieAvion')).toBeVisible()
  })
  test("Si on choisit la livraison à domicile, la partie magasin n'a pas de sens et ne s'affiche pas, mais le colis peut toujours venir de loin", async () => {
    // Given
    renderWithWrapper(<CalculateurLivraison />)
    expect(await screen.findByTestId('calculateurTitleH2')).toBeInTheDocument()
    // When
    await userEvent.selectOptions(screen.getByTestId('retraits'), ['domicile'])
    // Then
    expect(await screen.findByTestId('retraits')).toHaveValue('domicile')
    expect(await screen.findByTestId('partieMagasin')).not.toBeVisible()
    expect(await screen.findByTestId('partieAvion')).toBeVisible()
  })
  test("Si coche la partie avion, le bilan carbone s'alourdit", async () => {
    // Given
    const { container } = renderWithWrapper(<CalculateurLivraison />)
    expect(await screen.findByTestId('calculateurTitleH2')).toBeInTheDocument()
    expect(await screen.findByTestId('bcTotal')).toHaveTextContent(/^3,31 kg de CO2e$/)
    // When
    await userEvent.click(container.querySelectorAll('.react-switch-handle')[1])
    // Then
    expect(await screen.findByTestId('bcTotal')).toHaveTextContent(/^19,56 kg de CO2e$/)
  })
  test("Si on coche la partie trajet habituel, il n'y a pas de surplus de bilan carbone", async () => {
    // Given
    const { container } = renderWithWrapper(<CalculateurLivraison />)
    expect(await screen.findByTestId('calculateurTitleH2')).toBeInTheDocument()
    expect(await screen.findByTestId('bcTrajet')).toHaveTextContent(/^1,51 kg de CO2e$/)
    // When
    await userEvent.click(container.querySelectorAll('.react-switch-handle')[0])
    // Then
    expect(await screen.findByTestId('bcTrajet')).toHaveTextContent(/^0,00 kg de CO2e$/)
  })
  test("Si on augmente le nombre de km, le bilan carbone du trajet s'alourdit - ainsi que le total", async () => {
    // Given
    renderWithWrapper(<CalculateurLivraison />)
    expect(await screen.findByTestId('calculateurTitleH2')).toBeInTheDocument()
    expect(await screen.findByTestId('kms')).toHaveValue(7)
    expect(await screen.findByTestId('bcTrajet')).toHaveTextContent(/^1,51 kg de CO2e$/)
    expect(await screen.findByTestId('bcTotal')).toHaveTextContent(/^3,31 kg de CO2e$/)
    // When
    await userEvent.clear(screen.queryByTestId('kms') as Element)
    await userEvent.type(screen.queryByTestId('kms') as Element, '21')
    // Then
    expect(await screen.queryByTestId('kms')).toHaveValue(21)
    expect(await screen.queryByTestId('bcTrajet')).toHaveTextContent(/^4,54 kg de CO2e$/)
    expect(await screen.queryByTestId('bcTotal')).toHaveTextContent(/^6,34 kg de CO2e$/)
  })
})
