'use client'

import { useSearchParams } from 'next/navigation'
import { FormEvent, useEffect, useMemo, useState } from 'react'
import { saveFeedback } from 'src/serverFunctions/forms'
import { ZodError } from 'zod'
import { NotionCommandValidation } from 'utils/notion'
import IframeableLink from 'components/base/IframeableLink'
import Button from 'components/base/buttons/Button'
import CheckboxInput from 'components/form/CheckboxInput'
import FormResult from 'components/form/FormResult'
import Input from 'components/form/Input'
import Radio from 'components/form/Radio'
import RadioInput from 'components/form/RadioInput'
import TextArea from 'components/form/TextArea'
import Block from 'components/layout/Block'
import styles from './Form.module.css'

const RendezVous = () => {
  const params = useSearchParams()
  const [errors, setErrors] = useState<ZodError | null>()

  const [email, setEmail] = useState('')
  const [text, setText] = useState('')
  const [structure, setStructure] = useState('')
  const [suggestionType, setSuggestionType] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [newsletter, setNewsletter] = useState(false)

  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (params && params.get('demande')) {
      setSuggestionType(params.get('demande') || '')
    }
  }, [params])

  const data = useMemo(() => {
    const data = {
      type: 'rendezvous',
      from: params?.get('fromLabel') || '',
      structure,
      email,
      suggestionType,
      text,
      accepted,
      newsletter,
    }

    if (errors) {
      const body = NotionCommandValidation.safeParse(data)
      if (body.success) {
        setErrors(null)
      } else {
        setErrors(body.error)
      }
    }
    return data
    // errors is not needed and cause an infinite refresh !
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [structure, email, suggestionType, text, accepted, newsletter])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSending(true)
    setErrors(null)

    const body = NotionCommandValidation.safeParse(data)
    if (body.success) {
      const result = await saveFeedback(body.data)
      if (!result) {
        setError(true)
      }
      setSent(true)
    } else {
      const input = document.getElementById(`input-${body.error.issues[0].path[0]}`)
      if (input) {
        input.scrollIntoView({ behavior: 'smooth' })
        input.focus({ preventScroll: true })
      }
      setErrors(body.error)
    }

    setSending(false)
  }

  return (
    <Block as='h1' title='Prendre rendez-vous' description='L’équipe vous accompagne dans l’utilisation de nos outils'>
      <div className={styles.container}>
        {sent ? (
          <FormResult
            back={() => {
              setSent(false)
              setError(false)
            }}
            success={!error}
            title={error ? 'Une erreur est survenue...' : 'Merci beaucoup !'}
            description={
              error
                ? 'Il semble qu’il y ait actuellement un problème avec ce formulaire et nous en avons été alerté. Merci de bien vouloir essayer à nouveau dans quelques instants.'
                : "Nous allons revenir vers vous prochainement pour convenir d'un temps d'échange."
            }
          />
        ) : (
          <>
            <p className={styles.mandatory}>Les champs marqués d’un astérisque (*) sont obligatoires.</p>
            <form className={styles.form} onSubmit={onSubmit} noValidate>
              <Radio
                required
                id='structure'
                label='Structure'
                errors={errors}
                hint='Choisissez le type de structure qui vous correspond le mieux'>
                <RadioInput
                  name='structure'
                  required
                  label='Entreprise'
                  value='entreprise-rendezvous'
                  selected={structure}
                  setSelected={setStructure}
                />
                <RadioInput
                  name='structure'
                  required
                  label='Média'
                  value='media-rendezvous'
                  selected={structure}
                  setSelected={setStructure}
                />
                <RadioInput
                  name='structure'
                  required
                  label='Collectivité'
                  value='collectivite-rendezvous'
                  selected={structure}
                  setSelected={setStructure}
                />
                <RadioInput
                  name='structure'
                  required
                  label='État / Établissement public'
                  value='etat-rendezvous'
                  selected={structure}
                  setSelected={setStructure}
                />
                <RadioInput
                  name='structure'
                  required
                  label='Association'
                  value='association-rendezvous'
                  selected={structure}
                  setSelected={setStructure}
                />
              </Radio>
              <div className={styles.separator} />
              <Radio
                required
                id='suggestionType'
                label='Demande'
                errors={errors}
                hint='Choisissez la réponse qui correspond le mieux'>
                <RadioInput
                  name='suggestionType'
                  required
                  label='Demande de rendez-vous'
                  value='rdv'
                  selected={suggestionType}
                  setSelected={setSuggestionType}
                />
                <RadioInput
                  name='suggestionType'
                  required
                  label='Demande de clé API'
                  value='api'
                  selected={suggestionType}
                  setSelected={setSuggestionType}
                />
                <RadioInput
                  name='suggestionType'
                  required
                  label='Besoin d’aide'
                  value='aide'
                  selected={suggestionType}
                  setSelected={setSuggestionType}
                />
              </Radio>
              <div className={styles.separator} />
              <TextArea
                id='text'
                required
                label='Message'
                hint='Rédigez votre message ci-dessous'
                value={text}
                errors={errors}
                onChange={(e) => setText(e.target.value)}
              />
              <div className={styles.separator} />
              <Input
                required
                id='email'
                label='Adresse électronique'
                hint='Par exemple : votrenom@ademe.fr'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                errors={errors}
              />
              <div className={styles.checkboxes}>
                <CheckboxInput
                  id='accepted'
                  errors={errors}
                  className={styles.checkbox}
                  checked={accepted}
                  required
                  setChecked={(checked) => setAccepted(checked)}
                  label={
                    <>
                      J'accepte que l'ADEME collecte mes données afin de garantir la bonne utilisation des services
                      offerts et reconnais avoir pris connaissance de{' '}
                      <IframeableLink href='/politique-de-confidentialite' target='_blank' rel='noopener noreferrer'>
                        sa politique de protection des données personnelles
                      </IframeableLink>
                      . *
                    </>
                  }
                />
                <CheckboxInput
                  id='newsletter'
                  errors={errors}
                  className={styles.checkbox}
                  checked={newsletter}
                  required
                  setChecked={(checked) => setNewsletter(checked)}
                  label='Je souhaite recevoir des communications sur les outils et actualités d’Impact CO2'
                />
              </div>
              <Button size='lg' disabled={sending} type='submit'>
                Envoyer ma demande
              </Button>
            </form>
          </>
        )}
      </div>
    </Block>
  )
}

export default RendezVous
