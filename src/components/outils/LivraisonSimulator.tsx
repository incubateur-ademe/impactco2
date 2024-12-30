'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useRef } from 'react'
import useLivraisonContext from 'src/providers/LivraisonProvider'
import { useGlobalStore } from 'src/providers/stores/global'
import { useLivraisonStore } from 'src/providers/stores/livraison'
import formatName from 'utils/formatName'
import formatNumber from 'utils/formatNumber'
import { track } from 'utils/matomo'
import { evaluateNumber } from 'utils/useSituation'
import LocalNumber from 'components/base/LocalNumber'
import Etiquette from 'components/comparateur/Etiquette'
import { getFullRandomEquivalents } from 'components/comparateur/random'
import { getRandomEquivalentForValue } from 'components/comparateur/randomEtiquette'
import HiddenLabel from 'components/form/HiddenLabel'
import NumberInput from 'components/form/NumberInput'
import Radio from 'components/form/Radio'
import RadioInput from 'components/form/RadioInput'
import Select from 'components/form/Select'
import shareableStyles from 'components/shareable/Shareable.module.css'
import styles from './LivraisonSimulator.module.css'

const LivraisonSimulator = () => {
  const ref = useRef<HTMLDivElement>(null)

  const { engine } = useLivraisonContext()
  const { language } = useGlobalStore()
  const {
    values,
    setValues,
    isHabit,
    setIsHabit,
    isPlane,
    setIsPlane,
    number,
    setNumber,
    frequence,
    setFrequence,
    equivalents,
    setEquivalents,
  } = useLivraisonStore()

  const total = useMemo(() => {
    engine.setSituation({
      'livraison colis . informations . catégorie': `'${values.produit}'`,
      'livraison colis . scénario': `'${values.retrait}'`,
      'livraison colis . déplacement consommateur . mode de déplacement': `'${values.relay}'`,
      'livraison colis . déplacement consommateur . distance': '0',
    })
    const zeroKmCO2 = evaluateNumber(engine, 'livraison colis')

    const kmCO2Plane = evaluateNumber(engine, 'livraison colis par avion')

    engine.setSituation({
      'livraison colis . informations . catégorie': `'${values.produit}'`,
      'livraison colis . scénario': `'${values.retrait}'`,
      'livraison colis . déplacement consommateur . mode de déplacement': `'${values.relay}'`,
      'livraison colis . déplacement consommateur . distance': `'${values.km}'`,
    })
    const actualKmCO2 = evaluateNumber(engine, 'livraison colis')
    const diffKm0 = isHabit ? 0 : actualKmCO2 - zeroKmCO2

    const diffPlane = isPlane ? kmCO2Plane - zeroKmCO2 : 0

    return zeroKmCO2 + diffPlane + diffKm0
  }, [values, isHabit, isPlane])

  const t = useTranslations('livraison')

  useEffect(() => {
    setEquivalents(getRandomEquivalentForValue(total))
  }, [total])

  return (
    <>
      <form id='livraison-simulator' className={styles.simulator}>
        <Select
          className={styles.fullSelect}
          id='livraison-produit'
          label={t('produit')}
          required
          value={values.produit}
          onChange={(event) => {
            track('Livraison', 'Produit', event.target.value)
            setValues({ ...values, produit: event.target.value })
          }}>
          <option value='grande consommation'>{t('grande consommation')}</option>
          <option value='habillement'>{t('habillement')}</option>
          <option value='culturel'>{t('culturel')}</option>
          <option value='équipements volumineux'>{t('équipements volumineux')}</option>
        </Select>
        <Select
          className={styles.fullSelect}
          id='livraison-retrait'
          label={t('retrait')}
          required
          value={values.retrait}
          onChange={(event) => {
            track('Livraison', 'Mode', event.target.value)
            setValues({ ...values, retrait: event.target.value })
          }}>
          <option value='domicile'>{t('domicile')}</option>
          <option value='point de retrait'>{t('point de retrait')}</option>
          <option value='click and collect'>{t('click and collect')}</option>
        </Select>
        {values.retrait !== 'domicile' && (
          <>
            <Radio
              required
              id='radio-trajet'
              label={`${
                values.retrait === 'point de retrait' ? t('point-de-retrait') : t('click-and-collect')
              } ${t('trajet')}`}>
              <RadioInput
                name='radio-trajet'
                required
                label={t('no')}
                value='no'
                selected={isHabit ? 'yes' : 'no'}
                setSelected={() => {
                  track('Livraison', 'Trajet', 'false')
                  setIsHabit(false)
                }}
              />
              <RadioInput
                name='radio-trajet'
                required
                label={t('yes')}
                value='yes'
                selected={isHabit ? 'yes' : 'no'}
                setSelected={() => {
                  track('Livraison', 'Trajet', 'true')
                  setIsHabit(true)
                }}
              />
            </Radio>
            {!isHabit && (
              <div className={styles.formRow}>
                <label htmlFor='input-km-value'>{t('km')}</label>
                <div className={styles.inputs}>
                  <NumberInput
                    id='km-value'
                    unit='km'
                    value={Number(values.km)}
                    setValue={(newValue) => {
                      track('Livraison', 'Distance', newValue.toString())
                      setValues({ ...values, km: newValue.toString() })
                    }}
                  />
                  <HiddenLabel htmlFor={'text-select-km-type'}>Type de véhicule pour faire le trajet</HiddenLabel>
                  <Select
                    id='km-type'
                    title='Type de véhicule pour faire le trajet'
                    value={values.relay}
                    onChange={(event) => {
                      track('Livraison', 'Transport', event.target.value)
                      setValues({ ...values, relay: event.target.value })
                    }}>
                    <option value='voiture thermique'>{t('voiture thermique')}</option>
                    <option value='voiture électrique'>{t('voiture électrique')}</option>
                    <option value='marche'>{t('marche')}</option>
                    <option value='vélo'>{t('vélo')}</option>
                    <option value='petit véhicule électrique'>{t('petit véhicule électrique')}</option>
                    <option value='commun'>{t('commun')}</option>
                  </Select>
                </div>
              </div>
            )}
          </>
        )}
        <Radio required id='radio-plane' label={t('plane')}>
          <RadioInput
            name='radio-plane'
            required
            label={t('no')}
            value='no'
            selected={isPlane ? 'yes' : 'no'}
            setSelected={() => {
              track('Livraison', 'Avion', 'false')
              setIsPlane(false)
            }}
          />
          <RadioInput
            name='radio-plane'
            required
            label={t('yes-plane')}
            value='yes'
            selected={isPlane ? 'yes' : 'no'}
            setSelected={() => {
              track('Livraison', 'Avion', 'true')
              setIsPlane(true)
            }}
          />
        </Radio>
      </form>
      <output form='livraison-simulator'>
        <p className={styles.results}>
          <span className={styles.header}>{t('generate')}</span>
          <span className={styles.value}>
            <span className={styles.number} data-testid='livraison-colis-value'>
              <LocalNumber number={formatNumber(total / 1000)} />
            </span>{' '}
            kg co₂e
          </span>
        </p>
      </output>
      <div className={styles.etiquette}>
        <p className={styles.header}>{t('total')}</p>
        <Etiquette
          baseValue={total}
          comparisons={equivalents}
          ref={ref}
          randomize={() => {
            track('Livraison', 'Randomize', 'randomize')
            setEquivalents(getFullRandomEquivalents())
          }}
          language={language}
        />
      </div>
      <div className={shareableStyles.separatorBothBorders} />
      <div className={styles.simulator}>
        <div className={styles.formRow}>
          <label htmlFor='input-number-value'>{t('mean')}</label>
          <div className={styles.inputs}>
            <NumberInput
              id='number-value'
              unit={formatName(t('mean-unit'), number)}
              value={number}
              setValue={(value) => {
                track('Livraison', 'Commande', value.toString())
                setNumber(value)
              }}
            />
            <HiddenLabel htmlFor={'text-select-frequence-type'}>Fréquence</HiddenLabel>
            <Select
              id='frequence-type'
              value={frequence}
              title='Fréquence'
              onChange={(event) => {
                track('Livraison', 'Frequence', event.target.value)
                setFrequence(Number(event.target.value))
              }}>
              <option value={1}>{t('1')}</option>
              <option value={12}>{t('12')}</option>
              <option value={52}>{t('52')}</option>
            </Select>
          </div>
        </div>
      </div>
      <p className={styles.results}>
        <span className={styles.header}>{t('habits')}</span>
        <span className={styles.value}>
          <span className={styles.number} data-testid='livraison-habits-value'>
            <LocalNumber number={formatNumber((total * number * frequence) / 1000)} />
          </span>{' '}
          kg co₂e
        </span>
        <span>{t('year')}</span>
      </p>
    </>
  )
}

export default LivraisonSimulator
