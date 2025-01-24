'use client'

import { useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { Example } from 'types/example'
import { track } from 'utils/matomo'
import Card from 'components/cards/Card'
import Select from 'components/form/Select'
import Block from 'components/layout/Block'
import styles from './AllExamples.module.css'
import ExamplesList from './ExamplesList'

const AllExamples = ({ examples, communications }: { examples: Example[]; communications: Example[] }) => {
  const [activity, setActivity] = useState('all')
  const [tool, setTool] = useState('all')

  const searchParams = useSearchParams()
  useEffect(() => {
    if (!searchParams) {
      return
    }
    const tool = searchParams.get('tool')
    if (tool) {
      setTool(decodeURI(tool))
    }
  }, [searchParams])

  const filteredExamples = useMemo(
    () => examples.filter((example) => (tool === 'all' ? example : example.links.find((link) => link.label === tool))),
    [examples, tool]
  )

  return (
    <>
      <Block
        as='h1'
        title='Exemples d’utilisation'
        description='Pour s’inspirer et découvrir comment nos outils sont utilisés'>
        <Card colored className={styles.filter}>
          <div>
            <label htmlFor='text-select-activity'>
              <b>Filtrer</b> par secteur d’activité
            </label>
            <Select
              id='activity'
              value={activity}
              onChange={(event) => {
                track('Exemple', 'Activity', event.target.value)
                setActivity(event.target.value)
              }}>
              <option value='all'>Tous les secteurs d'activité</option>
              {examples
                .map((example) => example.activity)
                .filter((value, index, array) => array.findIndex((key) => key === value) === index)
                .sort((a, b) => a.localeCompare(b))
                .map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
            </Select>
          </div>
          <div>
            <label htmlFor='text-select-tool'>
              <b>Filtrer</b> par outils
            </label>
            <Select
              id='tool'
              value={tool}
              onChange={(event) => {
                track('Exemple', 'Tool', event.target.value)
                setTool(event.target.value)
              }}>
              <option value='all'>Tous les outils</option>
              {examples
                .flatMap((example) => example.links.map((link) => link.label))
                .filter((value, index, array) => array.findIndex((key) => key === value) === index)
                .sort((a, b) => a.localeCompare(b))
                .map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
            </Select>
          </div>
        </Card>
      </Block>
      {(activity === 'all' || activity === 'Média') && (
        <ExamplesList
          withTags
          title='Médias'
          description='Ces médias utilisent nos outils avec brio'
          examples={filteredExamples.filter((example) => example.activity === 'Média')}
          forceDisplay={activity === 'Média'}
        />
      )}
      {(activity === 'all' || activity === 'Entreprise') && (
        <ExamplesList
          withTags
          title='Entreprises'
          description='Ces entreprises ont intégré nos outils à la perfection'
          examples={filteredExamples.filter((example) => example.activity === 'Entreprise')}
          forceDisplay={activity === 'Entreprise'}
        />
      )}
      {(activity === 'all' || activity === 'Culture/Tourisme') && (
        <ExamplesList
          withTags
          title='Culture et Tourisme'
          description='Ils utilisent nos outils de manière remarquable'
          examples={filteredExamples.filter((example) => example.activity === 'Culture/Tourisme')}
          forceDisplay={activity === 'Culture/Tourisme'}
        />
      )}
      {(activity === 'all' || activity === 'Association') && (
        <ExamplesList
          withTags
          title='Associations'
          description='Les associations qui utilisent nos outils de façon exemplaire'
          examples={filteredExamples.filter((example) => example.activity === 'Association')}
          forceDisplay={activity === 'Association'}
        />
      )}
      {(activity === 'all' || activity === 'Collectivité') && (
        <ExamplesList
          withTags
          title='Collectivités'
          description='Ces collectivités ont fait le choix d’Impact CO₂'
          examples={filteredExamples.filter((example) => example.activity === 'Collectivité')}
          forceDisplay={activity === 'Collectivité'}
        />
      )}
      {(activity === 'all' || activity === 'Éducation') && (
        <ExamplesList
          withTags
          title='Éducation'
          description='Les exemples d’utilisation de nos outils dans le secteur de l’éducation'
          examples={filteredExamples.filter((example) => example.activity === 'Éducation')}
          forceDisplay={activity === 'Éducation'}
        />
      )}
      {(activity === 'all' || activity === 'Institution') && (
        <ExamplesList
          withTags
          title='Institutions'
          description='Les mises en avant de nos outils par les institutions'
          examples={filteredExamples.filter((example) => example.activity === 'Institution')}
          forceDisplay={activity === 'Institution'}
        />
      )}
      {activity === 'all' && tool === 'all' && (
        <ExamplesList
          title='Ils parlent de nous'
          description="Les apparitions d'Impact CO₂ sur la toile"
          examples={communications}
        />
      )}
    </>
  )
}

export default AllExamples
