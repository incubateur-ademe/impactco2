import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { renderWithWrapper } from '../test-utils/render-with-wrapper.js'
import ByArticle from 'components/views/home/ByArticle'

describe('ByArticle - Composant de la Home qui affiche du texte et des cards', () => {
  test('Affiche un lien correct vers la FAQ', async () => {
    // When
    renderWithWrapper(<ByArticle />)
    // Then
    expect(await screen.findByTestId('byArticleFaq')).toHaveTextContent('Foire aux Questions')
    expect(await screen.findByTestId('byArticleFaq')).toHaveAttribute(
      'href',
      'https://accelerateur-transition-ecologique-ademe.notion.site/Foire-aux-questions-090ceb3f28ef473d9c8e9d13b61e1332?pvs=4'
    )
  })
})
