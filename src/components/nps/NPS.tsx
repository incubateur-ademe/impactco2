import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { addNpsNote, updateNpsRetour } from 'src/serverFunctions/nps'
import { getSource } from 'src/utils/matomo'
import Button from '../base/buttons/Button'
import TextArea from '../form/TextArea'
import ScoreInput from './ScoreInput'
import styles from './UserFeedback.module.css'

const NPS = ({
  tracking,
  transportTabSelected,
  setClosed,
}: {
  tracking: string
  transportTabSelected: string
  setClosed: (closed: boolean) => void
}) => {
  const t = useTranslations('nps')
  const searchParams = useSearchParams()

  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)
  const [step, setStep] = useState(0)
  const [id, setId] = useState('')

  const [selected, setSelected] = useState<number | null>(null)
  const [text, setText] = useState('')

  const send = async () => {
    if (sending) {
      return
    }

    setError(false)
    setSending(true)
    try {
      switch (step) {
        case 0:
          if (selected === null) {
            return
          }

          const createdId = await addNpsNote({
            note: selected,
            tracking: tracking === 'Transport' ? `${tracking} ${transportTabSelected}` : tracking,
            source: getSource(),
            params: searchParams.toString(),
          })
          if (!createdId) {
            setError(true)
            return
          }
          setId(createdId)
          setStep(1)
          return
        case 1:
          if (!id || !text.trim()) {
            return
          }
          const updated = await updateNpsRetour(id, text.trim())
          if (!updated) {
            setError(true)
            return
          }
          setStep(2)
          return
        case 2:
          setClosed(true)
          return
        default:
          return
      }
    } finally {
      setSending(false)
    }
  }
  return (
    <>
      {step === 0 && (
        <>
          <p className={styles.question}>{t('question')}</p>
          <div className={styles.input}>
            <ScoreInput selected={selected} setSelected={setSelected} />
          </div>
        </>
      )}
      {step === 1 && (
        <>
          <p className={styles.question}>{t('amelioration')}</p>
          <div className={styles.input}>
            <TextArea
              id='nps-improvement'
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t('ameliorationPlaceholder')}
              rows={2}
            />
          </div>
        </>
      )}
      {step === 2 && (
        <div className={styles.thanks}>
          <p className={styles.question}>{t('thanksTitle')}</p>
          <p className={styles.subtitle}>{t('thanks')}</p>
        </div>
      )}
      {error && (
        <div className={styles.errorAlert} role='alert' aria-live='polite'>
          {t('error')}
        </div>
      )}
      <div className={styles.buttonContainer}>
        <Button className={styles.button} onClick={send} disabled={sending}>
          {step === 2 ? t('close') : t('send')}
        </Button>
      </div>
    </>
  )
}

export default NPS
