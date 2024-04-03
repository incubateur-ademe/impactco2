'use client'

import { AxiosResponse } from 'axios'
import React, { FormEvent, useState } from 'react'
import { ZodError } from 'zod'
import axiosClient from 'utils/axios'
import { NotionCommand, NotionCommandValidation } from 'utils/notion'
import Button from 'components/base/buttons/Button'
import Input from 'components/form/Input'
import styles from './Meeting.module.css'

const Meeting = ({ from }: { from: string }) => {
  const [email, setEmail] = useState('')

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
      Votre adresse a été prise en compte. L’équipe vous recontactera très prochainement !
    </div>
  ) : (
    <form className={styles.container} onSubmit={onSubmit}>
      <Input
        id={`email-${from}`}
        name='email'
        placeholder='Votre adresse email'
        data-testid='emailInput'
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        errors={errors}
        large
      />
      <Button disabled={sending} type='submit'>
        Prendre rendez-vous
      </Button>
    </form>
  )
}

export default Meeting
