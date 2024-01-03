import { AxiosResponse } from 'axios'
import React, { FormEvent, useMemo, useState } from 'react'
import { ZodError } from 'zod'
import axiosClient from 'utils/axios'
import { NotionCommand, NotionCommandValidation } from 'utils/notion'
import PageTitle from 'components/base/PageTitle'
import { Section, SectionWideContent } from 'components/base/Section'
import Button from 'components/base/buttons/Button'
import { Form } from 'components/form/Form'
import FormResult from 'components/form/FormResult'
import Input from 'components/form/Input'
import Radio from 'components/form/Radio'
import RadioInput from 'components/form/RadioInput'
import TextArea from 'components/form/TextArea'
import { Content } from './RendezVous.styles'

const RendezVous = ({ from }: { from: string }) => {
  const [errors, setErrors] = useState<ZodError | null>()

  const [email, setEmail] = useState('')
  const [needs, setNeeds] = useState('')
  const [structure, setStructure] = useState('')
  const [other, setOther] = useState('')

  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

  const data = useMemo(() => {
    const data = {
      type: 'contact',
      email,
      structure,
      needs,
      other,
      from,
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
  }, [email, needs, other, from, structure])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSending(true)
    setErrors(null)

    const body = NotionCommandValidation.safeParse(data)
    if (body.success) {
      try {
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
    <Section $withoutPadding>
      <SectionWideContent $size='sm'>
        <PageTitle
          title={
            <>
              Prendre <span className='text-secondary'>rendez-vous</span> avec l’équipe
            </>
          }
          description='Vous souhaitez intégrer l’un de nos simulateurs ou obtenir des informations sur les ressources de notre site ?'
        />
      </SectionWideContent>
      <SectionWideContent $size='xs'>
        <Content>
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
                  : "Nous allons revenir vers vous pour convenir d'un temps d'échange."
              }
            />
          ) : (
            <Form onSubmit={onSubmit} data-testid='rendez-vous-form' noValidate>
              <Radio
                required
                id='structure'
                label='Structure'
                hint='Choisissez le type de structure qui vous correspond le mieux'
                errors={errors}>
                <RadioInput
                  name='structure'
                  required
                  label='Média'
                  value='media'
                  selected={structure}
                  setSelected={setStructure}
                />
                <RadioInput
                  name='structure'
                  data-testid='rendez-vous-structure-entreprise'
                  required
                  label='Entreprise'
                  value='entreprise'
                  selected={structure}
                  setSelected={setStructure}
                />
                <RadioInput
                  name='structure'
                  required
                  label='Collectivité'
                  value='collectivite'
                  selected={structure}
                  setSelected={setStructure}
                />
                <RadioInput
                  name='structure'
                  required
                  label='Institution'
                  value='institution'
                  selected={structure}
                  setSelected={setStructure}
                />
                <RadioInput
                  name='structure'
                  required
                  label='Association'
                  value='association'
                  selected={structure}
                  setSelected={setStructure}
                />
                <RadioInput
                  name='structure'
                  required
                  label='Autre'
                  value='autre'
                  selected={structure}
                  setSelected={setStructure}>
                  <Input
                    id='other'
                    value={structure === 'autre' ? other : ''}
                    onChange={(e) => setOther(e.target.value)}
                    placeholder='précisez...'
                    disabled={structure !== 'autre'}
                    required={structure === 'autre'}
                    errors={errors}
                  />
                </RadioInput>
              </Radio>
              <TextArea
                id='besoins'
                label='Besoins'
                hint='Si vous le souhaitez, précisez vos attentes'
                value={needs}
                data-testid='rendez-vous-needs'
                onChange={(e) => setNeeds(e.target.value)}
              />
              <Input
                id='email'
                label='Adresse électronique'
                hint='Par exemple : votrenom@ademe.fr'
                required
                type='email'
                value={email}
                data-testid='rendez-vous-email'
                onChange={(e) => setEmail(e.target.value)}
                errors={errors}
              />
              <Button size='lg' disabled={sending} type='submit' data-testid='rendez-vous-button'>
                Envoyer ma demande
              </Button>
            </Form>
          )}
        </Content>
      </SectionWideContent>
    </Section>
  )
}

export default RendezVous
