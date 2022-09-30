import React, { useState } from 'react'
import styled from 'styled-components'

import useSubscribeEmail from 'hooks/useSubscribeEmail'
import TextInput from 'components/base/TextInput'
import Button from 'components/base/Button'
import Alert from 'components/base/Alert'

const Wrapper = styled.form`
  position: relative;
  max-width: 40rem;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: ${(props) => props.theme.colors.second};
  border-radius: 1rem;
`
const Text = styled.p``
export default function Contact(props) {
  const [email, setEmail] = useState('')

  const mutation = useSubscribeEmail()

  return (
    <Wrapper
      onSubmit={(e) => {
        e.preventDefault()
        mutation.mutate(email)
      }}
    >
      <Text>
        <strong>{props.children}</strong>
      </Text>
      <Text>Soyez informé en saisissant votre adresse email ci-dessous</Text>
      <TextInput
        value={email}
        onChange={(e) => {
          setEmail(e.value)
        }}
        type='email'
        name='email'
        label='Votre email'
      />
      <Button.Wrapper right>
        <Button>Me tenir informé</Button>
      </Button.Wrapper>
      {mutation.isError && (
        <Alert error>
          {mutation?.error?.response?.data?.message ===
          'Contact already in list and/or does not exist'
            ? `Vous êtes déjà inscrit`
            : `Une erreur est survenue`}
        </Alert>
      )}
      {mutation.isSuccess && (
        <Alert>
          Vous êtes maintenant inscrit. Nous vous enverrons un email lorsque le
          simulateur complet sera en ligne
        </Alert>
      )}
    </Wrapper>
  )
}
