import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Category } from 'types/category'
import { buildCurrentUrlFor } from 'utils/urls'
import Button from 'components/base/buttons/Button'
import Link from 'components/base/buttons/Link'
import Co2eModal from 'components/modals/Co2eModal'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const Disclaimer = styled.p`
  font-size: 0.875rem;
  max-width: 34rem;
  text-align: center;
`
export default function Bottom({ category, iframe }: { category: Category; iframe?: boolean }) {
  const t = useTranslations('category.bottom')
  const [openModal, setOpenModal] = useState(false)

  return (
    <Wrapper>
      {openModal && <Co2eModal setOpen={setOpenModal} />}
      <Disclaimer data-testid='bottomText'>
        {t('before')}{' '}
        <Button asLink onClick={() => setOpenModal(true)}>
          CO₂e
        </Button>{' '}
        {t('after')} {t(`include-${category.slug}`)}
      </Disclaimer>
      <div data-testid='bottomButton'>
        <Link className={'noscreenshot'} href={iframe ? buildCurrentUrlFor('/thematiques') : '/thematiques'}>
          {t('thematiques')}
        </Link>
      </div>
    </Wrapper>
  )
}
