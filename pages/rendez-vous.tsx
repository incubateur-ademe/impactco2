import { useRouter } from 'next/router'
import React from 'react'
import RendezVous from 'components/contact/RendezVous'
import Web from 'components/layout/Web'

export default function RendezVousPage() {
  const router = useRouter()
  return (
    <Web
      title='Prendre rendez-vous'
      breadcrumb={
        router.query.from && router.query.fromLabel
          ? {
              type: 'other',
              previous: { to: router.query.from as string, label: router.query.fromLabel as string },
              current: 'Prendre rendez-vous',
            }
          : {
              type: 'accueil',
              page: 'Prendre rendez-vous',
            }
      }>
      <RendezVous from={router.query.fromLabel as string} />
    </Web>
  )
}
