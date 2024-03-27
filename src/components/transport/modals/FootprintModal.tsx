import React, { Dispatch, SetStateAction } from 'react'
import Modal from 'components/base/Modal'
import Link from 'components/base/buttons/Link'

export default function SetFootprintModal({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  return (
    <Modal setOpen={setOpen}>
      <h2>Mon empreinte carbone</h2>
      <p>
        Aujourd&apos;hui, un·e français·e en émet en moyenne 9,9 tonnes de gaz à effet de serre (GES) par an (
        <Link href='https://www.statistiques.developpement-durable.gouv.fr/estimation-de-lempreinte-carbone-de-1995-2019'>
          source
        </Link>
        ).
      </p>
      <p>
        La cible à atteindre pour{' '}
        <Link href={'https://datagir.ademe.fr/blog/budget-empreinte-carbone-c-est-quoi/'}>
          respecter l&apos;accord de Paris
        </Link>{' '}
        est de moins de 2 tonnes de GES par an et par personne d&apos;ici 2050.
      </p>
      <p>
        Si vous ne la connaissez pas encore votre empreinte carbone, vous pouvez la calculer simplement grâce à notre
        simulateur <Link href={`https://nosgestesclimat.fr/`}>Nos Gestes Climat</Link>
      </p>
    </Modal>
  )
}
