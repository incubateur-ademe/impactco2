import { AxiosResponse } from 'axios'
import React, { FormEvent, useState } from 'react'
import axiosClient from 'utils/axios'
import { track } from 'utils/matomo'
import { NotionCommand } from 'utils/notion'
import Button from 'components/base/Button'
import TextInput from 'components/base/TextInput'
import { Container, SentMessage } from './Meeting.styles'

const Meeting = () => {
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setSending(true)
    e.preventDefault()

    await axiosClient.post<string, AxiosResponse, NotionCommand>('/api/notion', {
      type: 'contact',
      email,
    })
    setSent(true)
  }

  return sent ? (
    <SentMessage data-testid='sentMessage'>
      Votre adresse a été prise en compte. L’équipe vous recontactera très prochainement !
    </SentMessage>
  ) : (
    <Container onSubmit={onSubmit}>
      <TextInput
        className='input'
        required
        placeholder='Votre adresse email'
        type='email'
        data-testid='emailInput'
        value={email}
        onChange={(e: { value: string; name: string }) => setEmail(e.value)}
      />
      <Button
        disabled={sending}
        type='submit'
        onClick={() => track('Click', 'Prendre rendez-vous', 'click_prendre_rdv')}>
        Prendre rendez-vous
      </Button>
    </Container>
  )
}

export default Meeting
