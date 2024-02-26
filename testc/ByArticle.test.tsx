import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { renderWithWrapper } from '../test-utils/render-with-wrapper.js'
import ByArticle from 'components/views/home/ByArticle'

describe('ByArticle - Composant de la Home qui affiche du texte et des cards', () => {
  test('Affiche un lien correct vers la FAQ', async () => {
    // When
    renderWithWrapper(<ByArticle />)
    // Then
    expect(await screen.findByTestId('byArticleFaq')).toHaveTextContent('Questions fréquentes')
    expect(await screen.findByTestId('byArticleFaq')).toHaveAttribute('href', '/questions-frequentes')
  })
})
