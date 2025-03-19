import { FrameLocator, Page } from '@playwright/test'
import { expect } from '@playwright/test'
import { comparateurTest } from '../../teste/comparateur'
import { detecteurCO2Test } from '../../teste/detecteur-co2'
import { itineraireTest } from '../../teste/itineraire'
import { usageNumeriqueTest } from '../../teste/usagenumerique'

export const checks = [
  {
    slug: 'operadeparis',
    skipAutoCheck: true,
    url: 'https://www.operadeparis.fr/infos-pratiques/preparer-votre-venue/palais-garnier',
    scroll: true,
    before: async (page: Page) => {
      await page.getByLabel('Accepter et fermer').click()
      await page.getByRole('button', { name: "Calculez l'empreinte carbone" }).click()
    },
    checkIframe: async (iframe: FrameLocator) => {
      await expect(iframe.getByTestId('header-share-button')).toBeInViewport()
      await expect(iframe.getByLabel('Arrivée')).toHaveAttribute(
        'value',
        "L'Opéra Restaurant Place Jacques Rouché Paris 75009 France",
        { timeout: 10000 }
      )
      await iframe.getByLabel('Arrivée').clear()

      await itineraireTest(iframe, true)
    },
  },
  /*{
    slug: 'aquarium-larochelle',
    url: 'https://www.aquarium-larochelle.com/visiter/horaires-et-acces/',
    before: async (page: Page) => {
      await page.getByRole('button', { name: 'Tout refuser' }).click()
      },
      checkIframe: async (iframe: FrameLocator) => {
        await expect(await iframe.locator('body')).toHaveClass('night')
        await expect(iframe.getByLabel('Arrivée')).toHaveAttribute(
          'value',
          'Aquarium de La Rochelle Quai Louis Prunier La Rochelle 17000 France',
          { timeout: 10000 }
          )
          await iframe.getByLabel('Arrivée').clear()
          
          await itineraireTest(iframe, true)
          },
          },*/
  {
    slug: 'lefigaro',
    skipAutoCheck: true,
    url: 'https://immobilier.lefigaro.fr/annonces/immobilier-vente-bien-aubervilliers+93300.html',
    before: async (page: Page) => {
      const id = await page.locator('.list-annonce').locator('article').first().getAttribute('data-id')
      await page.goto(`https://immobilier.lefigaro.fr/annonces/annonce-${id}.html#mon-impact-transport`)
      await page
        .locator('#appconsent iframe')
        .contentFrame()
        .getByRole('button', { name: 'Continuer sans accepter' })
        .click()
    },
    checkIframe: async (iframe: FrameLocator) => {
      await itineraireTest(iframe, true)
    },
  },
  {
    slug: 'terrabotanica',
    url: 'https://www.terrabotanica.fr/en/acces/',
    checkIframe: async (iframe: FrameLocator) => {
      await expect(iframe.getByLabel('Arrivée')).toHaveAttribute(
        'value',
        "Terra Botanica Route d'Epinard Angers 49100 France",
        { timeout: 10000 }
      )
      await iframe.getByLabel('Arrivée').clear()

      await itineraireTest(
        iframe,
        true,
        '&modes=avion,tgv,intercites,voiturethermique+1,voiturethermique,voitureelectrique+1,voitureelectrique,autocar,velo,veloelectrique,busthermique,tramway,scooter,moto,rer,ter,buselectrique,trottinette,busgnv'
      )
    },
  },
  {
    slug: 'linfodurable',
    skipAutoCheck: true,
    url: 'https://www.linfodurable.fr/climat/detecteur-carbone-id-linfo-durable-premier-media-se-doter-du-nouvel-outil-de-lademe-44711',
    before: async (page: Page) => {
      await page.getByRole('button', { name: 'Accept all' }).click({ timeout: 60000 })
    },
    check: async (page: Page) => {
      await detecteurCO2Test(page, 10, '10 kg de CO2e', 1)
    },
  },
  {
    slug: 'tictactrip',
    skipAutoCheck: true,
    url: 'https://www.tictactrip.eu/search/paris/toulouse',
    before: async (page: Page) => {
      await page.getByRole('button', { name: 'Reduce emissions' }).click({ timeout: 60000 })
    },
    check: async (page: Page) => {
      await expect(page.getByLabel('Logo Impact CO2')).toHaveAttribute(
        'href',
        'https://impactco2.fr/comparateur?value=126.0692798641895'
      )
      await expect(page.getByTestId('etiquette-value')).toHaveText('126')
    },
  },
  {
    slug: 'gorecycle',
    url: 'https://www.gorecycle.com/en/blog/4-good-reasons-to-buy-a-used-appliance/',
    iframeContent: (page: Page) => page.locator('iframe').first().contentFrame(),
    before: async (page: Page) => {
      await page.getByRole('button', { name: 'Accept' }).click()
    },
    checkIframe: async (page: FrameLocator) => {
      await expect(page.getByTestId('equivalent-total-value')).toHaveText('346 kg CO₂e')
      await page.getByRole('button', { name: 'Augmenter le nombre de année' }).click()
      await expect(page.getByTestId('equivalent-total-value')).toHaveText('350 kg CO₂e')
    },
  },
  {
    slug: 'homeexchange',
    skipWait: true,
    skipAutoCheck: true,
    url: 'https://www.homeexchange.fr/blog/bilan-carbone-2022/',
    before: async (page: Page) => {
      await page.getByRole('button', { name: 'Accept and close' }).click()
    },
    check: async (page: Page) => {
      await detecteurCO2Test(page, 384134000, '384 134 tCO2e')
    },
  },
  {
    slug: 'gaite-lyrique',
    url: 'https://www.gaite-lyrique.net/infos-pratiques#acces',
    before: async (page: Page) => {
      await page.getByRole('button', { name: 'TOUT ACCEPTER' }).click()
    },

    checkIframe: async (iframe: FrameLocator) => {
      await expect(iframe.getByLabel('Arrivée')).toHaveAttribute(
        'value',
        'La Gaîté lyrique 3 bis Rue Papin Paris 75012 France',
        { timeout: 10000 }
      )
      await iframe.getByLabel('Arrivée').clear({ force: true })
      await itineraireTest(iframe, true)
    },
  },
  {
    slug: 'agir',
    skipWait: true,
    url: 'https://agirpourlatransition.ademe.fr/particuliers/bureau/calculez-lempreinte-carbone-usages-numeriques',
    before: async (page: Page) => {
      await page.getByRole('button', { name: 'Tout refuser' }).click()
    },
    checkIframe: async (iframe: FrameLocator) => {
      await usageNumeriqueTest(iframe, true)
    },
  },
  {
    slug: 'bondici',
    url: 'https://www.bondici.fr/actualite/quand-manger-les-fruits-et-legumes-de-saison/',
    checkIframe: async (iframe: FrameLocator) => {
      await expect(iframe.getByTestId('text-select-month')).toHaveValue('5')
      await expect(iframe.getByTestId('category-abricot-value')).toBeVisible()
    },
  },
  {
    slug: '2050today',
    skipAutoCheck: true,
    url: 'https://2050today.org/empreinte-climat/?lang=fr',
    iframeContent: (page: Page) => page.locator('#iFrameResizer01').contentFrame(),
    checkIframe: async (iframe: FrameLocator) => {
      await expect(await iframe.getByTestId('input-base-value')).toHaveValue('10')
      await iframe.getByTestId('input-base-value').fill('100')
      await iframe.getByRole('button', { name: 'Ajouter un équivalent' }).click()
      await iframe.getByRole('button', { name: 'Cas pratiques 0 /' }).click()
      await iframe.getByLabel('A/R Paris - Berlin en tgv').check()
      await iframe.getByRole('button', { name: 'Revenir au comparateur' }).click()

      await comparateurTest(iframe, true, true)
    },
  },
]
