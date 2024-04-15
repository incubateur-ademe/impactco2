import { useTranslations } from 'next-intl'
import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import Modal2 from 'components/base/Modal2'
import ExplainArrowContainer from 'components/modals/ExplainArrowContainer.js'

const GetTitle = () => {
  const t = useTranslations('modal.co2')
  return (
    <Title data-testid='modalTitleEqCO2e'>
      {t('understand')} <GreenText>{t('equivalent')}</GreenText>
    </Title>
  )
}

export default function Co2eModal({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  const t = useTranslations('modal.co2')

  return (
    <Modal2 open setOpen={setOpen} getTitle={GetTitle} width='50rem'>
      <Text>{t('intro')}</Text>
      <Text>
        <strong>{t('text')} </strong>
      </Text>
      <ExplainArrowContainer />
    </Modal2>
  )
}

const GreenText = styled.span`
  color: var(--primary-50);
`

const Title = styled.h2`
  margin: 1rem 0;
`

const Text = styled.p`
  margin-bottom: 2rem;
  margin-top: 0;
`
