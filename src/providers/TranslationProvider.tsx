'use client'

import { IntlError, IntlErrorCode, NextIntlClientProvider } from 'next-intl'
import React, { ReactNode } from 'react'
import useParamContext from './ParamProvider'
import english from './locales/en.json'
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
      locale={language === 'fr' ? 'fr-FR' : 'en-EN'}
      messages={language === 'fr' ? french : english}
      timeZone='Europe/Paris'
      onError={onError}>
      {children}
    </NextIntlClientProvider>
  )
}

export default TranslationProvider
