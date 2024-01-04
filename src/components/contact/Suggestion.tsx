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
import Stars from 'components/form/Stars'
import TextArea from 'components/form/TextArea'
import { Content } from './RendezVous.styles'

const descriptions: Record<string, { label: string; hint: string }> = {
  bug: { label: 'Description du bug', hint: 'Essayez de décrire autant que possible le problème que vous rencontrez' },
  idee: { label: 'Votre idée', hint: 'Essayez de décrire autant que possible votre idée' },
  avis: { label: 'Description', hint: 'Précisez ce que vous avez apprécié ou non' },
}

const Suggestion = ({ from, simulatorName }: { from: string; simulatorName: string }) => {
  const [errors, setErrors] = useState<ZodError | null>()

  const [email, setEmail] = useState('')
  const [text, setText] = useState('')
  const [avis, setAvis] = useState<number>()
  const [suggestionType, setSuggestionType] = useState('bug')

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
  }, [email, text, suggestionType, from, avis])

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
              Faire une <span className='text-secondary'>suggestion</span>
            </>
          }
          description='Vous avez identifié des bugs, des améliorations ou vous souhaitez partager votre avis ?'
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
                  : 'Nous allons prendre connaissance de votre message prochainement. Si vous avez laissé une adresse électronique et que votre message nécessite une réponse de notre part, nous vous répondrons dans les plus brefs délais.'
              }
            />
          ) : (
            <Form onSubmit={onSubmit} data-testid='suggestion-form' noValidate>
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
              {suggestionType === 'avis' && (
                <Stars
                  id='avis'
                  label={`Que pensez-vous du ${simulatorName} ?`}
                  hint='Évaluez ce contenu en lui donnant une note de 1 à 5'
                  value={avis}
                  setValue={setAvis}
                  required
                  errors={errors}
                />
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
              <Button size='lg' disabled={sending} type='submit' data-testid='suggestion-button'>
                Envoyer ma réponse
              </Button>
            </Form>
          )}
        </Content>
      </SectionWideContent>
    </Section>
  )
}

export default Suggestion
