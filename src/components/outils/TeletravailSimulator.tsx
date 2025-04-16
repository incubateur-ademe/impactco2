'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useMemo, useRef } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { Category } from 'types/category'
import { ComputedEquivalent, DeplacementType } from 'types/equivalent'
import { categories } from 'data/categories'
import { deplacements } from 'data/categories/deplacement'
import formatNumber from 'utils/formatNumber'
import { track } from 'utils/matomo'
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
      homeOffice,
      setHomeOffice,
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

  useEffect(() => {
    setEquivalents(getRandomEquivalentForValue(0.75 * homeOffice * total * 1000))
  }, [total, homeOffice])

  return (
    <>
      <form id='teletravail-simulator' className={styles.simulator}>
        <div className={itineraireStyles.addresses}>
          <AddressInput large id='teletravail-start' label={t('start')} place={start?.address} setPlace={setStart} />
          <AddressInput large id='teletravail-end' label={t('end')} place={end?.address} setPlace={setEnd} />
        </div>
        <div className={styles.transportMode}>
          <SelectEquivalent
            label={t('mode')}
            id='mode'
            value={transport}
            onChange={(event) => {
              track('Télétravail', 'Mode de transport', event.target.value)
              setTransport(event.target.value)
            }}
            equivalents={deplacements}
            withoutColon
          />
        </div>
        <div className={itineraireStyles.days}>
          <div className={styles.days}>
            <label htmlFor='input-presentiel-value'>
              <b>{t('presentiel')}</b> {t('per-week')}
            </label>
            <NumberInput
              id='presentiel-value'
              unit={`${t('day')}${presentiel === 1 ? '' : 's'}`}
              value={presentiel}
              setValue={(value) => {
                track('Télétravail', 'Présentiel', value.toString())
                setPresentiel(value)
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
              unit={`${t('day')}${homeOffice === 1 ? '' : 's'}`}
              value={homeOffice}
              setValue={(value) => {
                track('Télétravail', 'Télétravail', value.toString())
                setHomeOffice(value)
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
                  <LocalNumber number={formatNumber(total * presentiel)} />
                </span>{' '}
                kg co₂e
              </span>
              <span>{t('per-year')}</span>
              <span>
                {t('work')} {presentiel} {`${t('day')}${presentiel === 1 ? '' : 's'}`} / {t('week')}
              </span>
            </p>
            <p className={styles.values}>
              <span className={styles.header}>{t('saved')}</span>
              <span className={styles.greenValue}>
                <span className={styles.number} data-testid='teletravail-saved-value'>
                  <LocalNumber number={formatNumber(0.75 * homeOffice * total)} />
                </span>{' '}
                kg co₂e
              </span>
              <span>{t('per-year')}</span>
              {t('home')} {homeOffice} {`${t('day')}${homeOffice === 1 ? '' : 's'}`} / {t('week')}
            </p>
          </output>
          <div>
            <p className={styles.values}>
              <span className={styles.header}>{t('or')}</span>
              <span className={styles.greenValue}>
                <span className={styles.number} data-testid='teletravail-saved-percent'>
                  <LocalNumber number={formatNumber((0.75 * homeOffice * total) / 99)} />
                </span>{' '}
                %
              </span>
              <span>{t('economised')}</span>
            </p>
          </div>
          <div className={styles.etiquette}>
            <p className={styles.header}>{t('total')}</p>
            <Etiquette
              baseValue={0.75 * homeOffice * total * 1000}
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
