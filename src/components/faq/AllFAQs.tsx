'use client'

import React, { useState } from 'react'
import { FAQ } from 'types/faq'
import Card from 'components/cards/Card'
import ToolCard from 'components/cards/ToolCard'
import Select from 'components/form/Select'
import Block from 'components/layout/Block'
import styles from './AllFAQs.module.css'
import FAQs from './FAQs'

const AllFAQs = ({ faqs }: { faqs: FAQ[] }) => {
  const [search, setSearch] = useState('all')
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
          </Select>
        </Card>
      </Block>
      <FAQs faqs={faqs} title='Questions générales' description='Questions fréquentes à propos du site Impact CO₂' />
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
