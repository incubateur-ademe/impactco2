import { useTranslations } from 'next-intl'
import React, { Dispatch, SetStateAction } from 'react'
import Modal from 'components/base/Modal'
import Link from 'components/base/buttons/Link'

export default function Occupancy({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  const t = useTranslations('modal.occupancy')
  return (
    <Modal setOpen={setOpen}>
      <h2>{t('title')}</h2>
      <p>{t('intro')}</p>
      <p>
        {t('pre-source')}{' '}
        <Link href='https://bilans-ges.ademe.fr/documentation/UPLOAD_DOC_FR/index.htm?transport_de_personnes.htm'>
          {t('source')}
        </Link>
        , {t('post-source')}
      </p>
    </Modal>
  )
}
