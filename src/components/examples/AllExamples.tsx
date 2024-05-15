'use client'

import React, { useMemo, useState } from 'react'
import { Example } from 'types/example'
import Card from 'components/cards/Card'
import Select from 'components/form/Select'
import Block from 'components/layout/Block'
import styles from './AllExamples.module.css'
import Examples from './Examples'

const AllExamples = ({ examples }: { examples: Example[] }) => {
  const [activity, setActivity] = useState('all')
  const [tool, setTool] = useState('all')

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
            <label htmlFor='input-activity-select'>
              <b>Filtrer</b> par secteur d’activité
            </label>
            <Select id='activity-select' value={activity} onChange={(event) => setActivity(event.target.value)}>
              <option value='all'>Tous les secteurs d'activité</option>
              {examples
                .flatMap((example) => example.activities)
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
            <label htmlFor='input-tool-select'>
              <b>Filtrer</b> par outils
            </label>
            <Select id='tool-select' value={tool} onChange={(event) => setTool(event.target.value)}>
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
        <Examples
          title='Médias'
          description='Ces médias utilisent nos outils avec brio'
          examples={filteredExamples.filter((example) => example.activities.includes('Média'))}
          forceDisplay={activity === 'Média'}
        />
      )}
      {(activity === 'all' || activity === 'Entreprise') && (
        <Examples
          title='Entreprises'
          description='Ces entreprises ont intégré nos outils à la perfection'
          examples={filteredExamples.filter((example) => example.activities.includes('Entreprise'))}
          forceDisplay={activity === 'Entreprise'}
        />
      )}
      {(activity === 'all' || activity === 'Loisirs/Culture') && (
        <Examples
          title='Culture et Loisirs'
          description='Ils utilisent nos outils de manière remarquable'
          examples={filteredExamples.filter((example) => example.activities.includes('Loisirs/Culture'))}
          forceDisplay={activity === 'Loisirs/Culture'}
        />
      )}
      {(activity === 'all' || activity === 'Association') && (
        <Examples
          title='Associations'
          description='Les associations qui utilisent nos outils de façon exemplaire'
          examples={filteredExamples.filter((example) => example.activities.includes('Association'))}
          forceDisplay={activity === 'Association'}
        />
      )}
      {(activity === 'all' || activity === 'Collectivité') && (
        <Examples
          title='Collectivités'
          description='Ces collectivités ont fait le choix d’Impact CO₂'
          examples={filteredExamples.filter((example) => example.activities.includes('Collectivité'))}
          forceDisplay={activity === 'Collectivité'}
        />
      )}
      {(activity === 'all' || activity === 'Éducation') && (
        <Examples
          title='Éducation'
          description='Les exemples d’utilisation de nos outils dans le secteur de l’éducation'
          examples={filteredExamples.filter((example) => example.activities.includes('Éducation'))}
          forceDisplay={activity === 'Éducation'}
        />
      )}
    </>
  )
}

export default AllExamples
