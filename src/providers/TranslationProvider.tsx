'use client'

import { IntlError, IntlErrorCode, NextIntlClientProvider } from 'next-intl'
import React, { ReactNode } from 'react'
import useParamContext from './ParamProvider'
import english from './locales/en.json'
import spanish from './locales/es.json'
import french from './locales/fr.json'

const onError = (error: IntlError) => {
  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    return
  }
  console.error(error)
}

const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const { language } = useParamContext()

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
