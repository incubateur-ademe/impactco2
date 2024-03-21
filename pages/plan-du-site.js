import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import categories from 'data/categories.json'
import formatName from 'utils/formatName'
import { computedEquivalents } from 'components/providers/equivalents'
import { Section, SectionWideContent } from 'components/base/Section'
import Web from 'components/layout/Web'

export default function PlanDuSite() {
  const buildLevel3For = (subcategories) => {
    return subcategories.map((subcategory) => (
      <Level3 key={subcategory.id}>
        <Link href={subcategory.link} title={subcategory.name}>
          {formatName(subcategory.name, 1, true)}{' '}
          {subcategory.subtitle && <Subtitle>({formatName(subcategory.subtitle, 1)})</Subtitle>}
        </Link>
      </Level3>
    ))
  }

  const buildLevel2For = (catSlug) => {
    const category = categories.find((cat) => cat.slug === catSlug)
    const subcategories = computedEquivalents.filter((eq) => eq.category === category.id)
    return (
      <Level2>
        <Link href={`/${category.slug}`} title={category.name}>
          {category.name}
        </Link>
        {subcategories?.length > 0 ? (
          <>
            <div>{buildLevel3For(subcategories)}</div>
          </>
        ) : (
          <></>
        )}
      </Level2>
    )
  }

  return (
    <Web title='Plan du site'>
      <Section>
        <SectionWideContent>
          <FormatText>
            <h1>Plan du site</h1>
            <Level1>
              <Link href='/'>Page d'accueil</Link>
            </Level1>
            <Level1>
              <Link href='/'>Par thématique</Link>
              {buildLevel2For('usagenumerique')}
              {buildLevel2For('livraison')}
              {buildLevel2For('chauffage')}
              {buildLevel2For('transport')}
              {buildLevel2For('fruitsetlegumes')}
              {buildLevel2For('numerique')}
              {buildLevel2For('repas')}
              {buildLevel2For('habillement')}
              {buildLevel2For('mobilier')}
              {buildLevel2For('electromenager')}
              {buildLevel2For('boisson')}
              <Level2>
                <Link href='/documentation'>Documentation</Link>
                <Level3>
                  <Link href='/documentation/livraison-colis'>Livraison de colis</Link>
                </Level3>
                <Level3>
                  <Link href='/documentation/livraison-colis-par-avion'>Livraison de colis par avion</Link>
                </Level3>
              </Level2>
            </Level1>
            <Level1>
              <Link href='/comparateur'>Comparateur carbone</Link>
            </Level1>
            <Level1>
              <Link href='/guide-utilisation'>Comment ça marche ?</Link>
            </Level1>
            <Level1>
              <Link href='/questions-frequentes'>Questions fréquentes</Link>
            </Level1>
            <Level1>
              Contenu
              <Level2>
                <Link href='/contenu/impact-carbone-hiver-station-ski'>
                  4 conseils pour réduire l’impact carbone des séjours au ski
                </Link>
              </Level2>
            </Level1>
            <Level1>
              <Link href='/stats'>Statistiques</Link>
            </Level1>
            <Level1>
              <Link href='/accessibilite'>Accessibilité (non conforme)</Link>
            </Level1>
            <Level1>
              <Link href='/mentions-legales'>Mentions légales</Link>
            </Level1>
            <Level1>
              <Link href='/politique-de-confidentialite'>Politique de confidentialité</Link>
            </Level1>
          </FormatText>
        </SectionWideContent>
      </Section>
    </Web>
  )
}

const FormatText = styled.div`
  h1 {
    font-size: 2.25rem;
    font-weight: 800;
    line-height: 44px;
    letter-spacing: -0.01em;
    margin-bottom: 2rem;
  }
  > h2 {
    margin-top: 3rem;
  }
`

const Level1 = styled.div`
  color: var(--primary-50);
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: 0em;
  line-height: 2rem;
  margin-top: 1.75rem;
  text-decoration-color: var(--primary-50);
  > a {
    text-decoration-thickness: 1px;
    text-underline-offset: 0.75rem;
  }
`

const Level2 = styled.div`
  margin-left: 1.5rem;
  margin-top: 1.25rem;
  > a {
    color: var(--primary-50);
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0em;
    line-height: 2rem;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.5rem;
  }
`

const Level3 = styled.div`
  margin-left: 1.5rem;
  margin-top: 0.75rem;
  > a {
    color: var(--neutral-50);
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 0em;
    line-height: 2rem;
    text-decoration-color: var(--secondary-50);
    text-decoration-thickness: 1px;
    text-underline-offset: 0.5rem;
  }
`

const Subtitle = styled.span`
  font-weight: 300;
`
