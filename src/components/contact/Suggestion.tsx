'use client'

import { AxiosResponse } from 'axios'
import { useSearchParams } from 'next/navigation'
import React, { FormEvent, useMemo, useState } from 'react'
import { ZodError } from 'zod'
import { NotionCommand, NotionCommandValidation } from 'utils/notion'
import IframeableLink from 'components/base/IframeableLink'
import Button from 'components/base/buttons/Button'
import CheckboxInput from 'components/form/CheckboxInput'
import FormResult from 'components/form/FormResult'
import Input from 'components/form/Input'
import Radio from 'components/form/Radio'
import RadioInput from 'components/form/RadioInput'
import Stars from 'components/form/Stars'
import TextArea from 'components/form/TextArea'
import Block from 'components/layout/Block'
import styles from './Form.module.css'

const descriptions: Record<string, { label: string; hint: string }> = {
  bug: { label: 'Description du bug', hint: 'Essayez de décrire autant que possible le problème que vous rencontrez' },
  idee: { label: 'Votre idée', hint: 'Essayez de décrire autant que possible votre idée' },
  avis: { label: 'Description', hint: 'Précisez ce que vous avez apprécié ou non' },
}

const Suggestion = () => {
  const params = useSearchParams()
  const [errors, setErrors] = useState<ZodError | null>()

  const [email, setEmail] = useState('')
  const [text, setText] = useState('')
  const [avis, setAvis] = useState<number>()
  const [suggestionType, setSuggestionType] = useState('bug')
  const [accepted, setAccepted] = useState(false)

  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

  const data = useMemo(() => {
    const data = {
      type: 'suggestion',
      email,
      suggestionType,
      avis: suggestionType === 'avis' ? avis : undefined,
      text,
      from: params?.get('fromLabel') || '',
      accepted,
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
  }, [email, text, suggestionType, params, avis, accepted])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSending(true)
    setErrors(null)

    const body = NotionCommandValidation.safeParse(data)
    if (body.success) {
      try {
        const axiosClient = (await import('utils/axios')).default
        await axiosClient.post<string, AxiosResponse, NotionCommand>('/api/notion', body.data)
      } catch {
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
    <Block
      as='h1'
      title='Faire une suggestion'
      description='Vous avez identifié des bugs, des améliorations ou vous souhaitez partager votre avis ?'>
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
                : 'Nous allons prendre connaissance de votre message prochainement. Si vous avez laissé une adresse électronique et que votre message nécessite une réponse de notre part, nous vous répondrons dans les plus brefs délais.'
            }
          />
        ) : (
          <form className={styles.form} onSubmit={onSubmit} data-testid='suggestion-form' noValidate>
            <Radio required id='suggestionType' label='Votre retour concerne' errors={errors}>
              <RadioInput
                name='suggestionType'
                required
                label='Un bug'
                value='bug'
                selected={suggestionType}
                setSelected={setSuggestionType}
              />
              <RadioInput
                name='suggestionType'
                required
                label='Une idée'
                value='idee'
                selected={suggestionType}
                setSelected={setSuggestionType}
              />
              <RadioInput
                name='suggestionType'
                required
                data-testid='suggestion-type-avis'
                label='Un avis'
                value='avis'
                selected={suggestionType}
                setSelected={setSuggestionType}
              />
            </Radio>
            <div className={styles.separator} />
            {suggestionType === 'avis' && (
              <>
                <Stars
                  id='avis'
                  label={`Que pensez-vous ${params?.get('simulatorName')} ?`}
                  hint='Évaluez ce contenu en lui donnant une note de 1 à 5'
                  value={avis}
                  setValue={setAvis}
                  required
                  errors={errors}
                />
                <div className={styles.separator} />
              </>
            )}
            <TextArea
              id='text'
              data-testid='suggestion-text'
              required={suggestionType !== 'avis'}
              label={descriptions[suggestionType].label}
              hint={descriptions[suggestionType].hint}
              value={text}
              errors={errors}
              onChange={(e) => setText(e.target.value)}
            />
            <div className={styles.separator} />
            <Input
              id='email'
              label='Adresse électronique'
              hint='Par exemple : votrenom@ademe.fr'
              type='email'
              value={email}
              data-testid='suggestion-email'
              onChange={(e) => setEmail(e.target.value)}
              errors={errors}
            />
            <CheckboxInput
              id='accepted'
              errors={errors}
              className={styles.checkbox}
              checked={accepted}
              required
              setChecked={(checked) => setAccepted(checked)}
              label={
                <>
                  J'ai lu et j'accepte que l'ADEME collecte mes données afin de garantir la bonne utilisation des
                  services offerts et reconnais avoir pris connaissance de{' '}
                  <IframeableLink href='/politique-de-confidentialite' target='_blank' rel='noopener noreferrer'>
                    sa politique de protection des données personnelles
                  </IframeableLink>
                  . *
                </>
              }
            />

            <Button size='lg' disabled={sending} type='submit' data-testid='suggestion-button'>
              Envoyer ma réponse
            </Button>
          </form>
        )}
      </div>
    </Block>
  )
}

export default Suggestion
