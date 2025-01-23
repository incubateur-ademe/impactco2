'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useGlobalStore } from 'src/providers/stores/global'
import { useTeletravailStore } from 'src/providers/stores/teletravail'
import { Category } from 'types/category'
import { ComputedEquivalent, DeplacementType } from 'types/equivalent'
import { categories } from 'data/categories'
import { deplacements } from 'data/categories/deplacement'
import { completeAddress } from 'utils/address'
import formatNumber from 'utils/formatNumber'
import { track } from 'utils/matomo'
import { DefaultParams } from 'utils/params'
import useItineraries from 'hooks/useItineraries'
import LocalNumber from 'components/base/LocalNumber'
import Etiquette from 'components/comparateur/Etiquette'
import { getFullRandomEquivalents } from 'components/comparateur/random'
import { getRandomEquivalentForValue } from 'components/comparateur/randomEtiquette'
import NumberInput from 'components/form/NumberInput'
import SelectEquivalent from 'components/form/SelectEquivalent'
import AddressInput from 'components/form/addresses/AddressInput'
import itineraireStyles from './ItineraireSimulator.module.css'
import styles from './TeletravailSimulator.module.css'

const transports = (categories.find((category) => category.slug === 'transport') as Category)
  .equivalents as (ComputedEquivalent & { type: DeplacementType })[]

const TeletravailSimulator = ({ defaultParams }: { defaultParams: DefaultParams['teletravail'] }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { language } = useGlobalStore()

  const { start, setStart, end, setEnd, setTransport, setPresentiel, setHomeOffice, equivalents, setEquivalents } =
    useTeletravailStore()

  const [internalTransport, setInternalTransport] = useState(defaultParams.transport)
  useEffect(() => {
    setTransport(internalTransport)
  }, [internalTransport])
  const [internalHomeOffice, setInternalHomeOffice] = useState(defaultParams.homeOffice)
  useEffect(() => {
    setHomeOffice(internalHomeOffice)
  }, [internalHomeOffice])
  const [internalPresentiel, setinternalPresentiel] = useState(defaultParams.presentiel)
  useEffect(() => {
    setPresentiel(internalPresentiel)
  }, [internalPresentiel])

  useEffect(() => {
    if (defaultParams.start) {
      completeAddress(setStart, defaultParams.start)
    }
    if (defaultParams.end) {
      completeAddress(setEnd, defaultParams.end)
    }
  }, [defaultParams])

  const t = useTranslations('transport.teletravail')
  const deplacement = useMemo(
    () => transports.find((x) => x.slug === internalTransport) as ComputedEquivalent & { type: DeplacementType },
    [internalTransport]
  )
  const { data: itineraries } = useItineraries(start, end, 'télétravail')
  const total = useMemo(() => {
    if (itineraries && deplacement) {
      const distance = itineraries[deplacement.type]
      // AR * (SEMAINE - VACANCES - RTT) = 2 * (52 - 5 - 1)
      return deplacement.value * distance * 92
    }
    return 0
  }, [itineraries, deplacement, internalPresentiel])

  useEffect(() => {
    setEquivalents(getRandomEquivalentForValue(0.75 * internalHomeOffice * total * 1000))
  }, [total, internalHomeOffice])

  return (
    <>
      <form id='teletravail-simulator' className={styles.simulator}>
        <div className={itineraireStyles.addresses}>
          <AddressInput
            large
            id='teletravail-start'
            label={t('start')}
            required
            place={start?.address}
            setPlace={setStart}
          />
          <AddressInput large id='teletravail-end' label={t('end')} required place={end?.address} setPlace={setEnd} />
        </div>
        <div className={styles.transportMode}>
          <SelectEquivalent
            required
            label={t('mode')}
            id='mode'
            value={internalTransport}
            onChange={(event) => {
              track('Télétravail', 'Mode de transport', event.target.value)
              setInternalTransport(event.target.value)
            }}
            equivalents={deplacements}
          />
        </div>
        <div className={itineraireStyles.days}>
          <div className={styles.days}>
            <label htmlFor='input-presentiel-value'>
              <b>{t('presentiel')}</b> {t('per-week')}
            </label>
            <NumberInput
              id='presentiel-value'
              unit={`${t('day')}${internalPresentiel === 1 ? '' : 's'}`}
              value={internalPresentiel}
              setValue={(value) => {
                track('Télétravail', 'Présentiel', value.toString())
                setinternalPresentiel(value)
              }}
              min={0}
              max={7}
            />
          </div>
          <div className={styles.days}>
            <label htmlFor='input-teletravail-value'>
              <b>{t('teletravail')}</b> {t('per-week')}
            </label>
            <NumberInput
              id='teletravail-value'
              unit={`${t('day')}${internalHomeOffice === 1 ? '' : 's'}`}
              value={internalHomeOffice}
              setValue={(value) => {
                track('Télétravail', 'Télétravail', value.toString())
                setInternalHomeOffice(value)
              }}
              min={0}
              max={7}
            />
          </div>
        </div>
      </form>
      {start && end && itineraries ? (
        <>
          <output form='teletravail-simulator' className={styles.results}>
            <p className={styles.values}>
              <span className={styles.header}>{t('generate')}</span>
              <span className={styles.value}>
                <span className={styles.number} data-testid='teletravail-generated-value'>
                  <LocalNumber number={formatNumber(total * internalPresentiel)} />
                </span>{' '}
                kg co₂e
              </span>
              <span>{t('per-year')}</span>
              <span>
                {t('work')} {internalPresentiel} {`${t('day')}${internalPresentiel === 1 ? '' : 's'}`} / {t('week')}
              </span>
            </p>
            <p className={styles.values}>
              <span className={styles.header}>{t('saved')}</span>
              <span className={styles.greenValue}>
                <span className={styles.number} data-testid='teletravail-saved-value'>
                  <LocalNumber number={formatNumber(0.75 * internalHomeOffice * total)} />
                </span>{' '}
                kg co₂e
              </span>
              <span>{t('per-year')}</span>
              {t('home')} {internalHomeOffice} {`${t('day')}${internalHomeOffice === 1 ? '' : 's'}`} / {t('week')}
            </p>
          </output>
          <div>
            <p className={styles.values}>
              <span className={styles.header}>{t('or')}</span>
              <span className={styles.greenValue}>
                <span className={styles.number} data-testid='teletravail-saved-percent'>
                  <LocalNumber number={formatNumber((0.75 * internalHomeOffice * total) / 99)} />
                </span>{' '}
                %
              </span>
              <span>{t('economised')}</span>
            </p>
          </div>
          <div className={styles.etiquette}>
            <p className={styles.header}>{t('total')}</p>
            <Etiquette
              baseValue={0.75 * internalHomeOffice * total * 1000}
              comparisons={equivalents}
              ref={ref}
              randomize={() => {
                track('Télétravail', 'Randomize', 'randomize')
                setEquivalents(getFullRandomEquivalents())
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
