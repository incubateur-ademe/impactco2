import '@testing-library/jest-dom'
import { act, screen } from '@testing-library/react'
import { renderWithWrapper } from '../test-utils/render-with-wrapper.js'
import { EqModalOpener, initializeWith, openModal } from './EqModal4/EqModal4Helper'

describe('EqModal - Modale pour modifier les équivalences de la partie livraison', () => {
  beforeEach(async () => {
    window.localStorage.clear()
  })
  test("Ne s'affiche pas, sauf si on lui demande", () => {
    // Given
    renderWithWrapper(<EqModalOpener />)
    expect(screen.queryByTestId('eqs_modal_intro')).not.toBeInTheDocument()
    // When
    act(() => {
      openModal()
    })
    // Then
    expect(screen.queryByTestId('eqs_modal_intro')).toHaveTextContent(
      'Sélectionnez plusieurs équivalences pour comparer votre impact et créer votre infographie personnalisée.'
    )
  })

  test('Affiche 3 sélections, par défaut', () => {
    // Given
    const { container } = renderWithWrapper(<EqModalOpener />)
    // When
    act(() => {
      openModal()
    })
    // Then
    expect(container.getElementsByClassName('checked-eq').length).toBe(3)
    expect(screen.getByTestId('eqs-title')).toHaveTextContent('3/3 équivalences sélectionnées')
    expect(screen.getByTestId('checked-eq-streamingvideo')).toHaveTextContent('Streaming vidéo')
    expect(screen.getByTestId('checked-eq-repasavecduboeuf')).toHaveTextContent('Repas avec du boeuf')
    expect(screen.getByTestId('checked-eq-voiturethermique')).toHaveTextContent('Voiture')
  })

  test("Peut afficher d'autres sélections par défaut", () => {
    // Given
    const { container } = renderWithWrapper(<EqModalOpener />)
    initializeWith(['ail', 'abricot'])
    // Then
    expect(container.getElementsByClassName('checked-eq').length).toBe(2)
    expect(screen.getByTestId('eqs-title')).toHaveTextContent('2/3 équivalences sélectionnées')
    expect(screen.getByTestId('checked-eq-abricot')).toHaveTextContent('Abricot')
    expect(screen.getByTestId('checked-eq-ail')).toHaveTextContent('Ail')
  })

  test("On peut rajouter une équivalence, si il y en moins de 3 au départ, la nouvelle équivalence s'ajoute à la liste, et le titre se mets à jour", () => {
    // Given
    const { container } = renderWithWrapper(<EqModalOpener />)
    initializeWith(['ail', 'abricot'])
    // When
    act(() => {
      screen.getByTestId('unchecked-eq-ananas').click()
    })
    // Then
    expect(container.getElementsByClassName('checked-eq').length).toBe(3)
    expect(screen.getByTestId('eqs-title')).toHaveTextContent('3/3 équivalences sélectionnées')
    expect(screen.getByTestId('checked-eq-abricot')).toHaveTextContent('Abricot')
    expect(screen.getByTestId('checked-eq-ail')).toHaveTextContent('Ail')
    expect(screen.getByTestId('checked-eq-ananas')).toHaveTextContent('Ananas')
  })
  test("On peut rajouter une équivalence pas encore choisie, elle disparaît alors de la liste des équivalences non-cochées, et réapparaît dans l'autre liste", () => {
    // Given
    renderWithWrapper(<EqModalOpener />)
    initializeWith(['ail', 'abricot'])
    expect(screen.queryByTestId('unchecked-eq-ananas')).toBeInTheDocument()
    expect(screen.queryByTestId('checked-eq-ananas')).not.toBeInTheDocument()
    // When
    act(() => {
      screen.getByTestId('unchecked-eq-ananas').click()
    })
    // Then
    expect(screen.queryByTestId('unchecked-eq-ananas')).not.toBeInTheDocument()
    expect(screen.queryByTestId('checked-eq-ananas')).toBeInTheDocument()
  })
  test("On peut supprimer une équivalence déjà cochée, elle disparaît alors de la liste des équivalences cochées, et réapparaît dans l'autre liste", () => {
    // Given
    renderWithWrapper(<EqModalOpener />)
    initializeWith(['ail', 'abricot', 'ananas'])
    expect(screen.queryByTestId('checked-eq-ananas')).toBeInTheDocument()
    expect(screen.queryByTestId('unchecked-eq-ananas')).not.toBeInTheDocument()
    // When
    act(() => {
      screen.getByTestId('checked-eq-ananas').click()
    })
    // Then
    expect(screen.queryByTestId('checked-eq-ananas')).not.toBeInTheDocument()
    expect(screen.queryByTestId('unchecked-eq-ananas')).toBeInTheDocument()
  })
  test("On peut supprimer toutes les équivalences, le titre s'orthographie correctement au fur et à mesure, de plus, un message d'alerte s'affiche à la fin", () => {
    //Given
    renderWithWrapper(<EqModalOpener />)
    act(() => {
      openModal()
    })
    expect(screen.queryByTestId('emptyChoice')).not.toBeInTheDocument()
    // When
    act(() => {
      screen.getAllByRole('menuitemcheckbox')[0].click()
    })

    expect(screen.getByTestId('eqs-title')).toHaveTextContent('2/3 équivalences sélectionnées')
    act(() => {
      screen.getAllByRole('menuitemcheckbox')[0].click()
    })
    expect(screen.getByTestId('eqs-title')).toHaveTextContent('1/3 équivalence sélectionnée')
    act(() => {
      screen.getAllByRole('menuitemcheckbox')[0].click()
    })
    expect(screen.getByTestId('eqs-title')).toHaveTextContent('0/3 équivalence sélectionnée')

    // Then
    expect(screen.getByTestId('emptyChoice')).toHaveTextContent('Veuillez choisir au moins 2 items ci-dessous')
  })
  test("Le message d'alerte à propos de la liste vide disparaît dès qu'on fait un choix", () => {
    //Given
    renderWithWrapper(<EqModalOpener />)
    initializeWith([])
    expect(screen.queryByTestId('emptyChoice')).toBeInTheDocument()
    // When
    act(() => {
      screen.getByTestId('unchecked-eq-ail').click()
    })
    // Then
    expect(screen.queryByTestId('emptyChoice')).not.toBeInTheDocument()
  })
  test("On peut partir de zéro et rajouter 4 équivalences, auquel cas la liste reste à 3 sélection, car l'équivalence choisie la plus ancienne disparaît", () => {
    //Given
    renderWithWrapper(<EqModalOpener />)
    initializeWith([])
    // When
    act(() => {
      screen.getByTestId('unchecked-eq-ail').click()
    })
    expect(screen.getByTestId('eqs-title')).toHaveTextContent('1/3 équivalence sélectionnée')
    act(() => {
      screen.getByTestId('unchecked-eq-abricot').click()
    })
    expect(screen.getByTestId('eqs-title')).toHaveTextContent('2/3 équivalences sélectionnées')
    act(() => {
      screen.getByTestId('unchecked-eq-ananas').click()
    })
    expect(screen.getByTestId('eqs-title')).toHaveTextContent('3/3 équivalences sélectionnées')
    act(() => {
      screen.getByTestId('unchecked-eq-artichaut').click()
    })
    expect(screen.getByTestId('eqs-title')).toHaveTextContent('3/3 équivalences sélectionnées')
    expect(screen.queryByTestId('checked-eq-ananas')).not.toBeInTheDocument()
    expect(screen.queryByTestId('checked-eq-abricot')).toBeInTheDocument()
    expect(screen.queryByTestId('checked-eq-ail')).toBeInTheDocument()
    expect(screen.queryByTestId('checked-eq-artichaut')).toBeInTheDocument()
  })
  test('Validation : on peut choisir 3 items différents, valider, et rouvrir la modale : les nouveaux choix apparaissent', () => {
    //Given
    const { container } = renderWithWrapper(<EqModalOpener />)
    act(() => {
      openModal()
    })
    expect(screen.queryByTestId('EqModal')).toBeInTheDocument()
    act(() => {
      screen.getByTestId('unchecked-eq-ail').click()
    })
    act(() => {
      screen.getByTestId('unchecked-eq-abricot').click()
    })
    act(() => {
      screen.getByTestId('unchecked-eq-ananas').click()
    })
    // When
    act(() => {
      screen.getByTestId('validateAndClose').click()
    })
    // Then
    expect(screen.queryByTestId('EqModal')).not.toBeInTheDocument()
    act(() => {
      openModal()
    })
    expect(container.getElementsByClassName('checked-eq').length).toBe(3)
    expect(screen.getByTestId('eqs-title')).toHaveTextContent('3/3 équivalences sélectionnées')
    expect(screen.queryByTestId('checked-eq-ail')).toBeInTheDocument()
    expect(screen.queryByTestId('checked-eq-abricot')).toBeInTheDocument()
    expect(screen.queryByTestId('checked-eq-ananas')).toBeInTheDocument()
  })
  test('Validation : on peut choisir 2 items différents, valider, et rouvrir la modale : les nouveaux choix apparaissent', () => {
    //Given
    const { container } = renderWithWrapper(<EqModalOpener />)
    initializeWith([])
    expect(screen.queryByTestId('EqModal')).toBeInTheDocument()
    act(() => {
      screen.getByTestId('unchecked-eq-ail').click()
    })
    act(() => {
      screen.getByTestId('unchecked-eq-abricot').click()
    })
    // When
    act(() => {
      screen.getByTestId('validateAndClose').click()
    })
    // Then
    expect(screen.queryByTestId('EqModal')).not.toBeInTheDocument()
    act(() => {
      openModal()
    })
    expect(container.getElementsByClassName('checked-eq').length).toBe(2)
    expect(screen.getByTestId('eqs-title')).toHaveTextContent('2/3 équivalences sélectionnées')
    expect(screen.queryByTestId('checked-eq-ail')).toBeInTheDocument()
    expect(screen.queryByTestId('checked-eq-abricot')).toBeInTheDocument()
  })
  test('Validation : on peut choisir 3 items différents, annuler, et rouvrir la modale : les anciens choix apparaissent', () => {
    //Given
    const { container } = renderWithWrapper(<EqModalOpener />)
    act(() => {
      openModal()
    })
    expect(screen.queryByTestId('EqModal')).toBeInTheDocument()
    act(() => {
      screen.getByTestId('unchecked-eq-ail').click()
    })
    act(() => {
      screen.getByTestId('unchecked-eq-abricot').click()
    })
    act(() => {
      screen.getByTestId('unchecked-eq-ananas').click()
    })
    // When
    act(() => {
      screen.getByTestId('cancelEqs').click()
    })
    // Then
    expect(screen.queryByTestId('EqModal')).not.toBeInTheDocument()
    act(() => {
      openModal()
    })
    expect(screen.queryByTestId('EqModal')).toBeInTheDocument()
    expect(container.getElementsByClassName('checked-eq').length).toBe(3)
    expect(screen.getByTestId('eqs-title')).toHaveTextContent('3/3 équivalences sélectionnées')
    expect(screen.queryByTestId('checked-eq-streamingvideo')).toBeInTheDocument()
    expect(screen.queryByTestId('checked-eq-repasavecduboeuf')).toBeInTheDocument()
    expect(screen.queryByTestId('checked-eq-voiturethermique')).toBeInTheDocument()
  })
  test("Validation : si on ne choisit qu'un seul item et qu'on valide, la modale ne se ferme pas et un message d'erreur apparaît", () => {
    //Given
    renderWithWrapper(<EqModalOpener />)
    initializeWith([])
    expect(screen.queryByTestId('EqModal')).toBeInTheDocument()
    expect(screen.queryByTestId('validationError')).not.toBeInTheDocument()
    act(() => {
      screen.getByTestId('unchecked-eq-ail').click()
    })
    // When
    act(() => {
      screen.getByTestId('validateAndClose').click()
    })
    // Then
    expect(screen.queryByTestId('EqModal')).toBeInTheDocument()
    expect(screen.queryByTestId('validationError')).toBeInTheDocument()
  })
  test("Validation : si on choisit zéro item et qu'on valide, la modale ne se ferme pas et un message d'erreur apparaît", () => {
    //Given
    renderWithWrapper(<EqModalOpener />)
    initializeWith([])
    expect(screen.queryByTestId('EqModal')).toBeInTheDocument()
    expect(screen.queryByTestId('validationError')).not.toBeInTheDocument()
    // When
    act(() => {
      screen.getByTestId('validateAndClose').click()
    })
    // Then
    expect(screen.queryByTestId('EqModal')).toBeInTheDocument()
    expect(screen.queryByTestId('validationError')).toBeInTheDocument()
  })
})
