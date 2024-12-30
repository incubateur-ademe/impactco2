'use client'

import { IntlError, IntlErrorCode, NextIntlClientProvider } from 'next-intl'
import { ReactNode } from 'react'
import english from './locales/en.json'
import spanish from './locales/es.json'
import french from './locales/fr.json'
import { useGlobalStore } from './stores/global'

const onError = (error: IntlError) => {
  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    return
  }
  console.error(error)
}

const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const { language } = useGlobalStore()

  return (
    <NextIntlClientProvider
      defaultTranslationValues={{
        important: (chunks) => <b>{chunks}</b>,
      }}
      locale={language === 'fr' ? 'fr-FR' : language === 'es' ? 'es-ES' : 'en-EN'}
      messages={language === 'fr' ? french : language === 'es' ? spanish : english}
      timeZone='Europe/Paris'
      onError={onError}>
      {children}
    </NextIntlClientProvider>
  )
}

export default TranslationProvider
