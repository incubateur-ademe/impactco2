'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useMemo, useRef } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { Category } from 'types/category'
import { ComputedEquivalent, DeplacementType } from 'types/equivalent'
import { categories } from 'data/categories'
import { deplacements } from 'data/categories/deplacement'
import formatName from 'utils/formatName'
import formatNumber from 'utils/formatNumber'
import { track } from 'utils/matomo'
import useItineraries from 'hooks/useItineraries'
import EquivalentIcon from 'components/base/EquivalentIcon'
import LocalNumber from 'components/base/LocalNumber'
import Etiquette from 'components/comparateur/Etiquette'
import { getRandomEquivalents } from 'components/comparateur/random'
import NumberInput from 'components/form/NumberInput'
import Select from 'components/form/Select'
import AddressInput from 'components/form/addresses/AddressInput'
import itineraireStyles from './ItineraireSimulator.module.css'
import styles from './TeletravailSimulator.module.css'

const transports = (categories.find((category) => category.slug === 'transport') as Category)
  .equivalents as (ComputedEquivalent & { type: DeplacementType })[]

const TeletravailSimulator = () => {
  const ref = useRef<HTMLDivElement>(null)
  const {
    language,
    teletravail: {
      start,
      setStart,
      end,
      setEnd,
      transport,
      setTransport,
      presentiel,
      setPresentiel,
      equivalents,
      setEquivalents,
    },
  } = useParamContext()

  const t = useTranslations('transport.teletravail')
  const deplacement = useMemo(
    () => transports.find((x) => x.slug === transport) as ComputedEquivalent & { type: DeplacementType },
    [transport]
  )
  const { data: itineraries } = useItineraries(start, end, 'télétravail')
  const total = useMemo(() => {
    if (itineraries && deplacement) {
      const distance = itineraries[deplacement.type]
      // AR * (SEMAINE - VACANCES - RTT) = 2 * (52 - 5 - 1)
      return deplacement.value * distance * 92
    }
    return 0
  }, [itineraries, deplacement, presentiel])

  return (
    <>
      <div className={styles.simulator}>
        <div className={itineraireStyles.addresses}>
          <AddressInput
            large
            id='teletravail-start'
            label={t('start')}
            required
            color='secondary'
            place={start?.address}
            setPlace={setStart}
          />
          <AddressInput
            large
            id='teletravail-end'
            label={t('end')}
            required
            color='secondary'
            place={end?.address}
            setPlace={setEnd}
          />
        </div>
        <div className={styles.transportMode}>
          <Select
            className={styles.select}
            label='Pour vous rendre au travail'
            required
            id='mode'
            value={transport}
            onChange={(event) => {
              track('Télétravail', 'Mode de transport', event.target.value)
              setTransport(event.target.value)
            }}>
            {deplacements.map((deplacement) => (
              <option key={deplacement.slug} value={deplacement.slug}>
                {formatName(`${deplacement.name}${deplacement.subtitle ? ` (${deplacement.subtitle})` : ''}`, 1, true)}
              </option>
            ))}
          </Select>
          <div className={styles.equivalentIcon}>
            <EquivalentIcon height={2.5} equivalent={deplacement} />
          </div>
        </div>
        <div className={itineraireStyles.days}>
          <div className={styles.days}>
            <label htmlFor='input-presentiel-value'>
              <b>Présentiel</b> par semaine
            </label>
            <NumberInput
              id='presentiel-value'
              unit={presentiel === 1 ? 'jour' : 'jours'}
              value={presentiel}
              setValue={(value) => {
                track('Télétravail', 'Présentiel', value.toString())
                setPresentiel(value)
              }}
              min={0}
              max={5}
            />
          </div>
          <div className={styles.days}>
            <label htmlFor='input-teletravail-value'>
              <b>Télétravail</b> par semaine
            </label>
            <NumberInput
              id='teletravail-value'
              unit={presentiel === 1 ? 'jour' : 'jours'}
              value={5 - presentiel}
              setValue={(value) => {
                track('Télétravail', 'Télétravail', value.toString())
                setPresentiel(5 - value)
              }}
              min={0}
              max={5}
            />
          </div>
        </div>
      </div>
      {start && end && itineraries && total ? (
        <>
          <div className={styles.results}>
            <div className={styles.values}>
              <div className={styles.header}>VOUS GÉNÉREZ</div>
              <div className={styles.value}>
                <span className={styles.number} data-testid='teletravail-generated-value'>
                  <LocalNumber number={formatNumber(total * presentiel)} />
                </span>{' '}
                kg co₂e
              </div>
              <div>par an</div>
              <div>en vous déplaçant {presentiel} jours / semaine</div>
            </div>
            <div className={styles.values}>
              <div className={styles.header}>VOUS ÉCONOMISEZ</div>
              <div className={styles.greenValue}>
                <span className={styles.number}>
                  <LocalNumber number={formatNumber(0.75 * (5 - presentiel) * total)} />
                </span>{' '}
                kg co₂e
              </div>
              <div>par an</div>
              <div>en télétravaillant {5 - presentiel} jours / semaine</div>
            </div>
          </div>
          <div>
            <div className={styles.values}>
              <div className={styles.header}>SOIT</div>
              <div className={styles.greenValue}>
                <span className={styles.number}>
                  <LocalNumber number={formatNumber((0.75 * (5 - presentiel) * total) / 99)} />
                </span>{' '}
                %
              </div>
              <div>d'économisé sur votre empreinte carbone annuelle</div>
            </div>
          </div>
          <div className={styles.etiquette}>
            <div className={styles.header}>CE QUI CORRESPOND À..</div>
            <Etiquette
              baseValue={0.75 * (5 - presentiel) * total * 1000}
              comparisons={equivalents}
              ref={ref}
              randomize={() => {
                track('Télétravail', 'Randomize', 'randomize')
                setEquivalents(getRandomEquivalents(undefined, 3))
              }}
              language={language}
            />
          </div>{' '}
        </>
      ) : (
        <div className={itineraireStyles.empty}>
          <Image src='/images/tools-transport.svg' width={220} height={180} alt='' />
        </div>
      )}
    </>
  )
}

export default TeletravailSimulator
