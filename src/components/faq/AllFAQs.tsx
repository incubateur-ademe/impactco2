'use client'
import { useState } from 'react'
import { FAQ } from 'types/faq'
import Button from 'components/base/buttons/Button'
import SearchIcon from 'components/base/icons/search'
import Card from 'components/cards/Card'
import Input from 'components/form/Input'
import FAQsList from './FAQsList'
import useSearchableFAQs from './SearchableFAQs'
import styles from './AllFAQs.module.css'

const AllFAQs = ({ faqs }: { faqs: FAQ[] }) => {
  const [search, setSearch] = useState('')
  const { faqsByCategory } = useSearchableFAQs({ faqs, search })
  return (
    <>
      <Card colored className={styles.filter}>
        <label htmlFor='faq-search' className='ico2-hidden'>
          Rechercher un sujet, une question...
        </label>
        <Input
          id='faq-search'
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder='Rechercher un sujet, une question...'
          icon={<SearchIcon />}
        />
        <p className={styles.searchExemples}>
          Par exemple :{' '}
          <Button onClick={() => setSearch('intégrer l’outil')} asLink>
            intégrer l’outil
          </Button>
          ,{' '}
          <Button onClick={() => setSearch('API')} asLink>
            API
          </Button>
          ,{' '}
          <Button onClick={() => setSearch('données CO2')} asLink>
            données CO2
          </Button>{' '}
          ou{' '}
          <Button onClick={() => setSearch('statistiques d’utilisation')} asLink>
            statistiques d’utilisation
          </Button>
        </p>
      </Card>
      {faqsByCategory.map(([category, categoryFaqs]) => (
        <FAQsList key={category} faqs={categoryFaqs} title={category} />
      ))}
    </>
  )
}

export default AllFAQs
