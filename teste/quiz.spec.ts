import { expect, test } from '@playwright/test'

test('Test quiz', async ({ page }) => {
  await page.goto('http://localhost:3000/outils/quiz')
  await expect(page.getByTestId('quiz-header')).toContainText('Question 1 / 10')
  await expect(page.getByTestId('quiz-previous-button')).not.toBeVisible()
  await expect(page.getByTestId('quiz-question-result')).toContainText('Choisissez votre réponse ci dessous :')
  await expect(page.getByTestId('quiz-answer-A')).toContainText('A1Repas avec du boeuf')
  await expect(page.getByTestId('quiz-answer-B')).toContainText('B1A/R Paris - Marseille en tgv')
  await expect(page.getByTestId('quiz-answer-value-A')).not.toBeVisible()
  await expect(page.getByTestId('quiz-answer-value-B')).not.toBeVisible()
  await expect(page.getByTestId('quiz-next-question')).not.toBeVisible()
  await expect(page.getByTestId('quiz-more-info')).not.toBeVisible()
  await expect(page.getByTestId('quiz-more-info-button')).not.toBeVisible()

  await page.getByTestId('quiz-answer-A').click()

  await expect(page.getByTestId('quiz-question-result')).toContainText('Raté... C’était la réponse B !')
  await expect(page.getByTestId('quiz-badge-critical-A')).toBeVisible()
  await expect(page.getByTestId('quiz-badge-success-A')).not.toBeVisible()
  await expect(page.getByTestId('quiz-badge-critical-B')).not.toBeVisible()
  await expect(page.getByTestId('quiz-badge-success-B')).not.toBeVisible()
  await expect(page.getByTestId('quiz-answer-value-A')).toBeVisible()
  await expect(page.getByTestId('quiz-answer-value-A')).toContainText('7.26 kg CO₂e')
  await expect(page.getByTestId('quiz-answer-value-A')).toBeVisible()
  await expect(page.getByTestId('quiz-answer-value-B')).toBeVisible()
  await expect(page.getByTestId('quiz-answer-value-B')).toContainText('4.4 kg CO₂e')
  await expect(page.getByTestId('quiz-next-question')).toHaveText('Question suivante')
  await expect(page.getByTestId('quiz-next-question')).toBeVisible()
  await expect(page.getByTestId('quiz-more-info')).toBeVisible()
  await expect(page.getByTestId('quiz-more-info-button')).toHaveText('Lire la suite')
  await expect(page.getByTestId('quiz-more-info-button')).toBeVisible()
  await expect(
    page.getByText('repas avec du boeuf5 repas avec du poulet14 repas végétariensComparaison basée')
  ).not.toBeInViewport()

  await page.getByTestId('quiz-more-info-button').click()

  await expect(page.getByTestId('quiz-more-info-button')).toHaveText('Réduire')
  await expect(
    page.getByText('repas avec du boeuf5 repas avec du poulet14 repas végétariensComparaison basée')
  ).toBeInViewport()

  await page.getByTestId('quiz-next-question').click()

  await expect(page.getByTestId('quiz-previous-button')).toBeVisible()
  await expect(page.getByTestId('quiz-header')).toContainText('Question 2 / 10')
  await expect(page.getByTestId('quiz-question-result')).toContainText('Choisissez votre réponse ci dessous :')
  await expect(page.getByTestId('quiz-answer-A')).toContainText('A1Tablette')
  await expect(page.getByTestId('quiz-answer-B')).toContainText('B3Paires de chaussures en cuir')
  await expect(page.getByTestId('quiz-answer-value-A')).not.toBeVisible()
  await expect(page.getByTestId('quiz-answer-value-B')).not.toBeVisible()
  await expect(page.getByTestId('quiz-next-question')).not.toBeVisible()
  await expect(page.getByTestId('quiz-more-info')).not.toBeVisible()
  await expect(page.getByTestId('quiz-more-info-button')).not.toBeVisible()

  await page.getByTestId('quiz-answer-B').click()

  await expect(page.getByTestId('quiz-question-result')).toContainText('Bien joué ! C’est exactement ça !')
  await expect(page.getByTestId('quiz-badge-critical-A')).not.toBeVisible()
  await expect(page.getByTestId('quiz-badge-success-A')).not.toBeVisible()
  await expect(page.getByTestId('quiz-badge-critical-B')).not.toBeVisible()
  await expect(page.getByTestId('quiz-badge-success-B')).toBeVisible()
  await expect(page.getByTestId('quiz-answer-value-A')).toBeVisible()
  await expect(page.getByTestId('quiz-answer-value-A')).toContainText('61.9 kg CO₂e')
  await expect(page.getByTestId('quiz-answer-value-A')).toBeVisible()
  await expect(page.getByTestId('quiz-answer-value-B')).toBeVisible()
  await expect(page.getByTestId('quiz-answer-value-B')).toContainText('44.9 kg CO₂e')
  await expect(page.getByTestId('quiz-next-question')).toBeVisible()
  await expect(page.getByTestId('quiz-more-info')).toBeVisible()
  await expect(page.getByTestId('quiz-more-info-button')).toHaveText('Lire la suite')
  await expect(page.getByTestId('quiz-next-question')).toHaveText('Question suivante')
  await expect(page.getByTestId('quiz-next-question')).toBeVisible()

  await expect(
    page.getByText('Tablette61.9 kg CO₂epar unitéHypothèses : Écran de 10,53 pouces, mix de')
  ).not.toBeInViewport()
  await page.getByTestId('quiz-more-info-button').click()
  await expect(
    page.getByText('Tablette61.9 kg CO₂epar unitéHypothèses : Écran de 10,53 pouces, mix de')
  ).toBeInViewport()

  await page.getByTestId('quiz-previous-button').click()

  await expect(page.getByTestId('quiz-header')).toContainText('Question 1 / 10')
  await expect(page.getByTestId('quiz-question-result')).toContainText('Choisissez votre réponse ci dessous :')
  await expect(page.getByTestId('quiz-answer-A')).toContainText('A1Repas avec du boeuf')
  await expect(page.getByTestId('quiz-answer-B')).toContainText('B1A/R Paris - Marseille en tgv')
  await expect(page.getByTestId('quiz-answer-value-A')).not.toBeVisible()
  await expect(page.getByTestId('quiz-answer-value-B')).not.toBeVisible()
  await expect(page.getByTestId('quiz-next-question')).not.toBeVisible()
  await expect(page.getByTestId('quiz-more-info')).not.toBeVisible()
  await expect(page.getByTestId('quiz-more-info-button')).not.toBeVisible()

  await page.getByTestId('quiz-answer-B').click()

  await expect(page.getByTestId('quiz-more-info-button')).toHaveText('Lire la suite')
  await expect(page.getByTestId('quiz-next-question')).toHaveText('Question suivante')
  await expect(
    page.getByText('repas avec du boeuf5 repas avec du poulet14 repas végétariensComparaison basée')
  ).not.toBeInViewport()

  await page.getByTestId('quiz-next-question').click()

  await page.getByTestId('quiz-answer-A').click()
  await page.getByTestId('quiz-next-question').click()
  await page.getByTestId('quiz-answer-A').click()
  await page.getByTestId('quiz-next-question').click()
  await page.getByTestId('quiz-answer-A').click()
  await page.getByTestId('quiz-next-question').click()
  await page.getByTestId('quiz-answer-A').click()
  await page.getByTestId('quiz-next-question').click()
  await page.getByTestId('quiz-answer-A').click()
  await page.getByTestId('quiz-next-question').click()
  await page.getByTestId('quiz-answer-A').click()
  await page.getByTestId('quiz-next-question').click()
  await page.getByTestId('quiz-answer-A').click()
  await page.getByTestId('quiz-next-question').click()
  await page.getByTestId('quiz-answer-A').click()
  await page.getByTestId('quiz-next-question').click()
  await page.getByTestId('quiz-answer-A').click()

  await expect(page.getByTestId('quiz-next-question')).toHaveText('Voir le score')
  await page.getByTestId('quiz-next-question').click()

  await expect(page.getByTestId('quiz-previous-button')).not.toBeVisible()
  await expect(page.getByTestId('quiz-header')).toHaveText("C'est terminé !")
  await expect(page.getByTestId('quiz-title')).toContainText('Vous avez obtenu 6 / 10 bonnes réponses !')
  await expect(page.getByTestId('quiz-success')).toBeVisible()

  await page.getByTestId('quiz-restart-button').click()

  await expect(page.getByTestId('quiz-header')).toContainText('Question 1 / 10')
  await expect(page.getByTestId('quiz-question-result')).toContainText('Choisissez votre réponse ci dessous :')
  await expect(page.getByTestId('quiz-answer-A')).toContainText('A1Repas avec du boeuf')
  await expect(page.getByTestId('quiz-answer-B')).toContainText('B1A/R Paris - Marseille en tgv')
})

test('Test quiz share', async ({ page }) => {
  await page.goto('http://localhost:3000/outils/quiz')

  await page.getByTestId('header-share-button').click()

  await expect(page.getByTestId('clipboard-box')).toHaveText('http://localhost:3000/outils/quiz?&language=fr')
  await page.getByTestId('cancel-button').click()

  await page.getByTestId('header-integrate-button').click()

  await expect(page.getByTestId('clipboard-box')).toHaveText(
    '<script name="impact-co2" src="http://localhost:3000/iframe.js" data-type="quiz" data-search="?&language=fr&theme=default"></script>'
  )
})
