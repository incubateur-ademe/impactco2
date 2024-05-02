'use client'

import React, { useMemo, useRef } from 'react'
import formatNumber from 'utils/formatNumber'
import useParamContext from 'components/providers/ParamProvider'
import Etiquette from 'components/comparateur/Etiquette'
import HiddenLabel from 'components/form/HiddenLabel'
import NumberInput from 'components/form/NumberInput'
import Radio from 'components/form/Radio'
import RadioInput from 'components/form/RadioInput'
import Select from 'components/form/Select'
import useRulesContextLivraison from 'components/livraison/RulesProviderLivraison'
import shareableStyles from 'components/misc/shareable/Shareable.module.css'
import styles from './LivraisonSimulator.module.css'

const LivraisonSimulator = () => {
  const ref = useRef<HTMLDivElement>(null)

  const { engine } = useRulesContextLivraison()

  const {
    livraison: {
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
    },
  } = useParamContext()

  const total = useMemo(() => {
    console.log(values)
    engine.setSituation({
      'livraison colis . informations . catégorie': `'${values.produit}'`,
      'livraison colis . scénario': `'${values.retrait}'`,
      'livraison colis . déplacement consommateur . mode de déplacement': `'${values.relay}'`,
      'livraison colis . déplacement consommateur . distance': '0',
    })
    const zeroKmCO2 = engine.evaluate('livraison colis').nodeValue as number

    const kmCO2Plane = engine.evaluate('livraison colis par avion').nodeValue as number

    engine.setSituation({
      'livraison colis . informations . catégorie': `'${values.produit}'`,
      'livraison colis . scénario': `'${values.retrait}'`,
      'livraison colis . déplacement consommateur . mode de déplacement': `'${values.relay}'`,
      'livraison colis . déplacement consommateur . distance': `'${values.km}'`,
    })
    const actualKmCO2 = engine.evaluate('livraison colis').nodeValue as number
    const diffKm0 = isHabit ? 0 : actualKmCO2 - zeroKmCO2

    const diffPlane = isPlane ? kmCO2Plane - zeroKmCO2 : 0

    console.log(zeroKmCO2, diffPlane, diffKm0)
    return zeroKmCO2 + diffPlane + diffKm0
  }, [values, isHabit, isPlane])

  return (
    <>
      <div className={styles.simulator}>
        <Select
          className={styles.fullSelect}
          id='livraison-produit'
          label='Vous commandez...'
          required
          value={values.produit}
          onChange={(event) => setValues({ ...values, produit: event.target.value })}>
          <option value='grande consommation'>Produits de grande consommation (aliments, épicerie, boissons…)</option>
          <option value='habillement'>Habillement (vêtements, chaussures, accessoires…)</option>
          <option value='culturel'>Produits culturels (CD, livres, DVD…)</option>
          <option value='équipements volumineux'>Mobilier et gros électroménager</option>
        </Select>
        <Select
          className={styles.fullSelect}
          id='livraison-retrait'
          label='Que vous faites livrer en...'
          required
          value={values.retrait}
          onChange={(event) => setValues({ ...values, retrait: event.target.value })}>
          <option value='domicile'>Livraison à domicile</option>
          <option value='point de retrait'>Point relais</option>
          <option value='click and collect'>Click & collect</option>
        </Select>
        {values.retrait !== 'domicile' && (
          <>
            <Radio
              required
              id='radio-trajet'
              label={`${
                values.retrait === 'point de retrait' ? 'Le point relais' : 'Le click & collect'
              } est t'il sur votre trajet habituel ?`}>
              <RadioInput
                name='radio-trajet'
                required
                label='Non'
                value='no'
                selected={isHabit ? 'yes' : 'no'}
                setSelected={() => setIsHabit(false)}
              />
              <RadioInput
                name='radio-trajet'
                required
                label='Oui'
                value='yes'
                selected={isHabit ? 'yes' : 'no'}
                setSelected={() => setIsHabit(true)}
              />
            </Radio>
            {!isHabit && (
              <div className={styles.formRow}>
                <label htmlFor='input-km-value'>Pour aller au point relais, vous parcourez...</label>
                <div className={styles.inputs}>
                  <NumberInput
                    id='km-value'
                    unit='km'
                    value={Number(values.km)}
                    setValue={(newValue) => setValues({ ...values, km: newValue.toString() })}
                  />
                  <HiddenLabel htmlFor={'text-select-km-type'}>Type de véhicule pour faire le trajet</HiddenLabel>
                  <Select
                    id='km-type'
                    value={values.relay}
                    onChange={(event) => {
                      setValues({ ...values, relay: event.target.value })
                    }}>
                    <option value='voiture thermique'>En voiture</option>
                    <option value='voiture électrique'>En voiture électrique</option>
                    <option value='marche'>Marche</option>
                    <option value='vélo'>à vélo</option>
                    <option value='petit véhicule électrique'>à vélo électrique</option>
                    <option value='commun'>En transport en commun</option>
                  </Select>
                </div>
              </div>
            )}
          </>
        )}
        <Radio required id='radio-plane' label='Le colis vient de loin'>
          <RadioInput
            name='radio-plane'
            required
            label='Non'
            value='no'
            selected={isPlane ? 'yes' : 'no'}
            setSelected={() => setIsPlane(false)}
          />
          <RadioInput
            name='radio-plane'
            required
            label='Oui (transport par avion)'
            value='yes'
            selected={isPlane ? 'yes' : 'no'}
            setSelected={() => setIsPlane(true)}
          />
        </Radio>
      </div>
      <div className={styles.results}>
        <div className={styles.header}>LA LIVRAISON DE VOTRE COLIS GÉNÈRE</div>
        <div className={styles.value}>
          <span className={styles.number}>{formatNumber(total / 1000)}</span> kg co₂e
        </div>
      </div>
      <div className={styles.etiquette}>
        <div className={styles.header}>CE QUI CORRESPOND À..</div>
        <Etiquette
          baseValue={total}
          comparisons={['voiturethermique', 'tshirtencoton', 'repasavecduboeuf']}
          ref={ref}
        />
      </div>
      <div className={shareableStyles.separatorBothBorders} />
      <div className={styles.simulator}>
        <div className={styles.formRow}>
          <label htmlFor='input-number-value'>En moyenne, vous passez ce type de commande...</label>
          <div className={styles.inputs}>
            <NumberInput id='number-value' unit='fois' value={number} setValue={setNumber} />
            <HiddenLabel htmlFor={'text-select-frequence-type'}>Fréquence</HiddenLabel>
            <Select
              id='frequence-type'
              value={frequence}
              onChange={(event) => {
                setFrequence(Number(event.target.value))
              }}>
              <option value={1}>Par an</option>
              <option value={12}>Par mois</option>
              <option value={52}>Par semaine</option>
            </Select>
          </div>
        </div>
      </div>
      <div className={styles.results}>
        <div className={styles.header}>VOS HABITUDES DE LIVRAISON GÉNÈRENT</div>
        <div className={styles.value}>
          <span className={styles.number}>{formatNumber((total * number * frequence) / 1000)}</span> kg co₂e
        </div>
        <div>par année</div>
      </div>
    </>
  )
}

export default LivraisonSimulator
