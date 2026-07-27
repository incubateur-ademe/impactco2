import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { addLearned, updateLearnedChoice, updateNpsRetour } from 'src/serverFunctions/nps'
import { getSource } from 'src/utils/matomo'
import Button from '../base/buttons/Button'
import ThumbsDownIcon from '../base/icons/thumbs-down'
import ThumbsUpIcon from '../base/icons/thumbs-up'
import Checkbox from '../form/Checkbox'
import CheckboxInput from '../form/CheckboxInput'
import TextArea from '../form/TextArea'
import styles from './UserFeedback.module.css'

const yesChoices = ['Étonnement', 'Impact CO₂ découvert', 'Idées d’actions', 'Compréhension des ODG']
const noChoices = ['Connaissance existante', 'Manque de clarté', 'Echec de recherche', 'Désintérêt']

const Learn = ({
  tracking,
  transportTabSelected,
  setClosed,
  setLarge,
}: {
  tracking: string
  transportTabSelected: string
  setClosed: (closed: boolean) => void
  setLarge: (large: boolean) => void
}) => {
  const t = useTranslations('nps')
  const searchParams = useSearchParams()

  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)
  const [step, setStep] = useState('initial')
  const [id, setId] = useState('')

  const [selected, setSelected] = useState<string[]>([])
  const [text, setText] = useState('')

  const send = async (response?: string) => {
    if (sending) {
      return
    }

    setError(false)
    setSending(true)
    try {
      switch (step) {
        case 'initial':
          const createdId = await addLearned({
            choice: response === 'yes' ? true : false,
            tracking: `${tracking} ${transportTabSelected}`,
            source: getSource(),
            params: searchParams.toString(),
          })

          if (!createdId) {
            setError(true)
            return
          }
          setId(createdId)
          setStep(response || 'yes')
          return
        case 'yes':
        case 'no': {
          if (!id || selected.length === 0) {
            return
          }

          const updated = await updateLearnedChoice({ id, choices: selected })
          if (!updated) {
            setError(true)
            return
          }
          setStep('qualification')
          return
        }
        case 'qualification': {
          if (!id || !text.trim()) {
            return
          }
          const updated = await updateNpsRetour(id, text.trim())
          if (!updated) {
            setError(true)
            return
          }
          setStep('end')
          return
        }
        case 'end':
          setClosed(true)
          return
        default:
          return
      }
    } finally {
      setSending(false)
      setLarge(response === 'yes')
    }
  }

  return (
    <>
      {step === 'initial' && (
        <>
          <p className={styles.question}>{t('learned')}</p>
          <div className={styles.learnButtons}>
            <button className={styles.learnButton} onClick={() => send('yes')} disabled={sending}>
              <div className={styles.learnButtonIcon}>
                <ThumbsUpIcon />
              </div>
              {t('yes')}
            </button>
            <button className={styles.learnButton} onClick={() => send('no')} disabled={sending}>
              <div className={styles.learnButtonIcon}>
                <ThumbsDownIcon />
              </div>
              {t('no')}
            </button>
          </div>
        </>
      )}
      {(step === 'yes' || step === 'no') && (
        <>
          <p className={styles.question}>{t('choice')}</p>
          <div className={styles.input}>
            <Checkbox id='nps-choice' label={t('choice')} hiddenLabel>
              {(step === 'yes' ? yesChoices : noChoices).map((choice) => (
                <CheckboxInput
                  id={`nps-choice-${choice}`}
                  key={choice}
                  checked={selected.includes(choice)}
                  setChecked={(checked) => {
                    if (checked) {
                      setSelected([...selected, choice])
                    } else {
                      setSelected(selected.filter((item) => item !== choice))
                    }
                  }}
                  label={t(choice)}
                />
              ))}
            </Checkbox>
          </div>
        </>
      )}
      {step === 'qualification' && (
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
      {step === 'end' && (
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
      {step !== 'initial' && (
        <div className={styles.buttonContainer}>
          <Button className={styles.button} onClick={() => send()} disabled={sending}>
            {step === 'end' ? t('close') : t('send')}
          </Button>
        </div>
      )}
    </>
  )
}

export default Learn
