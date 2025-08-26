'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { Example } from 'types/example'
import { track } from 'utils/matomo'
import Card from 'components/cards/Card'
import Select from 'components/form/Select'
import Block from 'components/layout/Block'
import ExamplesList from './ExamplesList'
import styles from './AllExamples.module.css'

const activities = [
  { title: 'Média', label: 'Médias', description: 'Ces médias utilisent nos outils avec brio' },
  { title: 'Entreprise', label: 'Entreprises', description: 'Ces entreprises ont intégré nos outils à la perfection' },
  {
    title: 'Culture',
    label: 'Culture',
    description: 'Ces acteurs du secteur culturel utilisent habilement les outils d’Impact CO₂',
  },
  {
    title: 'Tourisme',
    label: 'Tourisme',
    description: 'Ces acteurs du tourisme se servent pertinemment de nos outils',
  },
  {
    title: 'Salons',
    label: 'Salons',
    description: 'Ils se sont admirablement emparés de nos outils',
  },
  {
    title: 'Sport',
    label: 'Sport',
    description: 'Le monde du sport s’empare de nos outils de façon brillante',
  },
  {
    title: 'Hôtels',
    label: 'Hôtels',
    description: 'Ces hôtels et gîtes ont intégré nos outils idéalement',
  },
  {
    title: 'Festivals',
    label: 'Festivals',
    description: 'Ces festivals utilisent nos outils pour sensibiliser leur audience',
  },
  {
    title: 'Association',
    label: 'Associations',
    description: 'Les associations qui utilisent nos outils de façon exemplaire',
  },
  { title: 'Collectivité', label: 'Collectivités', description: "Ces collectivités ont fait le choix d'Impact CO₂" },
  {
    title: 'Éducation',
    label: 'Éducation',
    description: "Les exemples d'utilisation de nos outils dans le secteur de l'éducation",
  },
  { title: 'Institution', label: 'Institutions', description: 'Les mises en avant de nos outils par les institutions' },
]

const AllExamples = ({ examples, communications }: { examples: Example[]; communications: Example[] }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activity, setActivity] = useState(
    searchParams.get('activity') ? decodeURI(searchParams.get('activity')!) : 'all'
  )
  const [tool, setTool] = useState(searchParams.get('tool') ? decodeURI(searchParams.get('tool')!) : 'all')

  useEffect(() => {
    router.replace(`/doc/exemples?activity=${activity}&tool=${tool}`)
  }, [activity, tool])

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
      {activities
        .filter((a) => activity === 'all' || activity === a.title)
        .map((a) => (
          <ExamplesList
            key={a.title}
            withTags
            title={a.label}
            description={a.description}
            examples={filteredExamples.filter((example) => example.activity === a.title)}
            forceDisplay={activity === a.title}
          />
        ))}
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
