'use client'

import React, { useMemo, useState } from 'react'
import { FAQ } from 'types/faq'
import Link from 'components/base/buttons/Link'
import Card from 'components/cards/Card'
import ToolCard from 'components/cards/ToolCard'
import Select from 'components/form/Select'
import Block from 'components/layout/Block'
import styles from './AllFAQs.module.css'
import FAQs from './FAQs'

const AllFAQs = ({ faqs }: { faqs: FAQ[] }) => {
  const [search, setSearch] = useState('all')
  const filteredFaqs = useMemo(
    () => (search === 'all' ? faqs : faqs.filter((faq) => faq.pages.includes(search))),
    [search, faqs]
  )
  return (
    <>
      <Block
        as='h1'
        title='Questions fréquentes'
        description='Explorer la FAQ pour trouver les réponses à vos questions'>
        <Card colored className={styles.filter}>
          <label htmlFor='input-search-select'>
            <b>Filtrer</b> par sujet ou outil
          </label>
          <Select id='search-select' value={search} onChange={(event) => setSearch(event.target.value)}>
            <option value='all'>Tous les sujets et outils</option>
            {faqs
              .flatMap((faq) => faq.pages)
              .filter((value, index, array) => array.findIndex((key) => key === value) === index)
              .filter((value) => value !== 'Accueil' && value !== 'Questions fréquentes')
              .sort((a, b) => a.localeCompare(b))
              .map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
          </Select>
        </Card>
      </Block>
      <FAQs
        faqs={filteredFaqs.filter((faq) => faq.section === 'Questions générales')}
        title='Questions générales'
        description='Questions fréquentes à propos du site Impact CO₂'
      />
      <FAQs
        faqs={filteredFaqs.filter((faq) => faq.section === 'Transports')}
        title='Transports'
        description={
          <>
            Questions fréquentes à propos de l’outil <Link href='/outils/transport'>transports</Link>
          </>
        }
      />
      <FAQs
        faqs={filteredFaqs.filter((faq) => faq.section === 'API')}
        title='API'
        description={
          <>
            Questions fréquentes à propos de l'<Link href='/outils/etiquettes'>API</Link>
          </>
        }
      />
      <FAQs
        faqs={filteredFaqs.filter((faq) => faq.section === 'Étiquettes')}
        title='Étiquettes'
        description={
          <>
            Questions fréquentes à propos des <Link href='/outils/etiquettes'>Étiquettes</Link>
          </>
        }
      />
      <FAQs
        faqs={filteredFaqs.filter((faq) => faq.section === 'Package NPM')}
        title='Package NPM'
        description={
          <>
            Questions fréquentes à propos du <Link href='/outils/npm'>package NPM</Link>
          </>
        }
      />
      <Block>
        <ToolCard
          slug='faq'
          horizontal
          image='/images/doc-faq.svg'
          title='Une question plus précise ?'
          description='N’hésitez pas à nous contacter pour obtenir plus d’informations.'
          linkLabel='Nous contacter'
          link='/rendez-vous?fromLabel=faq'
        />
      </Block>
    </>
  )
}

export default AllFAQs
