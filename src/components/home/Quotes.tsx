'use client'

import classNames from 'classnames'
import Image from 'next/image'
import { KeyboardEvent, createRef, useCallback, useRef, useState } from 'react'
import Link from 'components/base/buttons/Link'
import CheckRoundIcon from 'components/base/icons/check-round'
import styles from './Quotes.module.css'

const quotes = [
  {
    slug: 'communication',
    title: (
      <>
        Communication <b>fiable</b>
      </>
    ),
    description: 'grâce à notre travail de synthèse des données les plus récentes issues de l’ADEME',
    logo: 'franceinfo.png',
    quote:
      'Lorsqu’on parle de CO2 équivalent, nous avons besoin de données sourcées pour communiquer une information crédible à notre lectorat. Impact CO2 remplit ce rôle !',
    name: 'Camille Adaoust',
    job: 'Journaliste Climat/Environnement',
    link: 'Impact CO2 sur le site de Franceinfo',
    linkUrl: 'https://www.francetvinfo.fr/environnement/outils-de-l-ademe/calculer-emissions-co2-de-mes-trajets.html',
  },
  {
    slug: 'sensibilisation',
    title: (
      <>
        Sensibilisation <b>positive</b>
      </>
    ),
    description: 'sur les enjeux carbone grâce à nos outils ludiques et intuitifs',
    logo: 'maisonsdumonde.png',
    quote: (
      <>
        On utilise le <Link href='/outils/comparateur'>Comparateur carbone</Link> pour sensibiliser en interne. Comparer
        X tonnes de CO2 à un nombre de vols A/R Paris/New-York, ça rend tout de suite les choses plus concrètes.
      </>
    ),
    name: 'Anne-Charlotte Butrot',
    job: 'Responsable Transformation RSE',
    link: 'Maisons du Monde',
    linkUrl: 'https://corporate.maisonsdumonde.com/fr/good-beautiful/engagement-5',
  },
  {
    slug: 'gain',
    title: (
      <>
        Gain <b>de temps</b>
      </>
    ),
    description: 'et d’argent, grâce à la gratuité totale et la facilité d’intégration de nos ressources',
    logo: 'cegid.png',
    quote:
      'L’API Impact Transport nous permet d’enrichir notre calcul de bilan carbone très rapidement. Dès qu’une entreprise est rattachée à Notilus, ils utilisent l’outil quasiment 100% des fois.',
    name: 'Jean-Charles Martin',
    job: 'Responsable produit Cegid Notilus TNE',
    link: 'Cegid',
    linkUrl: 'https://www.cegid.com/fr/produits/cegid-notilus/',
  },
]
const Quotes = () => {
  const [tab, setTab] = useState(quotes[0].slug)
  const refs = useRef(quotes.map(() => createRef<HTMLButtonElement>()))

  const navigate = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      const currentQuote = quotes.findIndex((quote) => quote.slug === tab)
      if (event.code === 'ArrowRight') {
        event.preventDefault()
        const nexIndex = (currentQuote + 1) % quotes.length
        setTab(quotes[nexIndex].slug)
        refs.current[nexIndex].current?.focus()
      }
      if (event.code === 'ArrowLeft') {
        event.preventDefault()
        const nexIndex = (currentQuote - 1) % quotes.length
        setTab(quotes[nexIndex].slug)
        refs.current[nexIndex].current?.focus()
      }
    },
    [tab]
  )
  return (
    <>
      <div className={styles.tabs}>
        <div role='tablist' aria-label='Témoignages de nos relais' className={styles.tablist}>
          {quotes.map((quote, index) => (
            <button
              ref={refs.current[index]}
              className={styles.tab}
              key={quote.slug}
              id={`tab-${quote.slug}`}
              role='tab'
              aria-selected={tab === quote.slug}
              aria-controls={`tabpanel-${quote.slug}`}
              tabIndex={tab === quote.slug ? undefined : -1}
              onClick={() => setTab(quote.slug)}
              onKeyDown={navigate}>
              <span className={styles.title}>
                <span className={styles.icon}>
                  <CheckRoundIcon />
                </span>
                <span>{quote.title}</span>
              </span>
              <span className={styles.description}>{quote.description}</span>
            </button>
          ))}
        </div>
        {quotes.map((quote) => (
          <div
            key={quote.slug}
            id={`tabpanel-${quote.slug}`}
            role='tabpanel'
            aria-labelledby={`tab-${quote.slug}`}
            className={classNames(styles.tabpanel, { [styles.hidden]: tab !== quote.slug })}>
            <Image src={`/images/${quote.logo}`} alt='' width={245} height={134} className={styles.logo} />
            <div className={styles.quote}>
              <p>{quote.quote}</p>
              <p>
                <span className={styles.name}>{quote.name}</span> <span className={styles.job}>- {quote.job}</span>
              </p>
              <div className={styles.link}>
                <Link href={quote.linkUrl} target='_blank' rel='noreferrer noopener'>
                  {quote.link}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ul className={styles.list}>
        {quotes.map((quote) => (
          <li key={quote.slug} className={styles.listItem}>
            <span className={styles.title}>
              <span className={styles.icon}>
                <CheckRoundIcon />
              </span>
              <span>{quote.title}</span>
            </span>
            <span className={styles.description}>{quote.description}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Quotes
