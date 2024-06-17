'use client'

import { AxiosResponse } from 'axios'
import React, { FormEvent, useState } from 'react'
import { ZodError } from 'zod'
import axiosClient from 'utils/axios'
import { NotionCommand, NotionCommandValidation } from 'utils/notion'
import IframeableLink from 'components/base/IframeableLink'
import Button from 'components/base/buttons/Button'
import CheckIcon from 'components/base/icons/check'
import CheckboxInput from 'components/form/CheckboxInput'
import HiddenLabel from 'components/form/HiddenLabel'
import Input from 'components/form/Input'
import styles from './Meeting.module.css'

const Meeting = ({ from }: { from: string }) => {
  const [email, setEmail] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [newsletter, setNewsletter] = useState(false)

  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState<ZodError | null>()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSending(true)
    setErrors(null)

    const data = {
      type: 'contact',
      email,
      accepted,
      newsletter,
      from,
      structure: 'Non renseigné',
    }

    const body = NotionCommandValidation.safeParse(data)
    if (body.success) {
      try {
        await axiosClient.post<string, AxiosResponse, NotionCommand>('/api/notion', body.data)
      } catch (e) {
        console.error(e)
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

  return sent ? (
    <div className={styles.sentMessage} data-testid='sentMessage'>
      <div className={styles.check}>
        <CheckIcon />
      </div>
      <b>Merci beaucoup !</b> Nous allons prendre contact très bientôt.
    </div>
  ) : (
    <form onSubmit={onSubmit} noValidate>
      <div className={styles.container}>
        <HiddenLabel htmlFor='input-email'>Email</HiddenLabel>
        <Input
          id='email'
          name='email'
          data-testid='emailInput'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          errors={errors}
          padding='lg'
        />
        <Button disabled={sending} type='submit'>
          Prendre rendez-vous
        </Button>
      </div>
      <CheckboxInput
        id='accepted'
        errors={errors}
        className={styles.checkbox}
        checked={accepted}
        required
        setChecked={(checked) => setAccepted(checked)}
        label={
          <>
            J'ai lu et j'accepte que l'ADEME collecte mes données afin de garantir la bonne utilisation des services
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
        setChecked={(checked) => setNewsletter(checked)}
        label="Je souhaite recevoir les communications sur les outils et actualités d'Impact CO₂"
      />
    </form>
  )
}

export default Meeting
