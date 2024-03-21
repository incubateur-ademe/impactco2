import React, { Dispatch, SetStateAction, useState } from 'react'
import styled from 'styled-components'
import { buildCurrentUrlFor } from 'utils/urls'
import useParamContext from 'components/providers/ParamProvider'
import FancySelect from 'components/base/FancySelect'
import Modal from 'components/base/Modal'
import Button from 'components/base/buttons/Button'
import Link from 'components/base/buttons/Link'

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`
export default function TeletravailModal({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  const {
    teletravail: { days, setDays, holidays, setHolidays, extraKm, setExtraKm },
  } = useParamContext()

  const [pristine, setPristine] = useState(true)

  return (
    <Modal setOpen={setOpen}>
      <h2>Mode télétravail</h2>
      <p>
        Nous comptons{' '}
        <FancySelect
          value={days}
          onChange={(value: string) => {
            setDays(Number.parseInt(value))
            setPristine(false)
          }}
          options={[
            { value: 1, label: '1 jour' },
            { value: 2, label: '2 jours' },
            { value: 3, label: '3 jours' },
            { value: 4, label: '4 jours' },
            { value: 5, label: '5 jours' },
            { value: 6, label: '6 jours' },
            { value: 7, label: '7 jours' },
          ]}
        />{' '}
        travaillé{days > 1 && 's'} par semaine et{' '}
        <FancySelect
          value={holidays}
          onChange={(value: string) => {
            setHolidays(Number.parseInt(value))
            setPristine(false)
          }}
          options={[
            { value: 1, label: '1 semaine' },
            { value: 2, label: '2 semaines' },
            { value: 3, label: '3 semaines' },
            { value: 4, label: '4 semaines' },
            { value: 5, label: '5 semaines' },
            { value: 6, label: '6 semaines' },
            { value: 7, label: '7 semaines' },
            { value: 8, label: '8 semaines' },
            { value: 9, label: '9 semaines' },
            { value: 10, label: '10 semaines' },
            { value: 11, label: '11 semaines' },
            { value: 12, label: '12 semaines' },
            { value: 13, label: '13 semaines' },
          ]}
        />{' '}
        de congé par an (+ 7 jours fériés).
      </p>
      <p>
        Nous considérons que{' '}
        <FancySelect
          value={extraKm * 100}
          onChange={(value: string) => {
            setExtraKm(Number.parseInt(value) / 100)
            setPristine(false)
          }}
          options={[
            { value: 0, label: '0 %' },
            { value: 10, label: '10 %' },
            { value: 15, label: '15 %' },
            { value: 20, label: '20 %' },
            { value: 25, label: '25 % (défaut)' },
            { value: 30, label: '30 %' },
            { value: 35, label: '35 %' },
            { value: 40, label: '40 %' },
            { value: 45, label: '45 %' },
            { value: 50, label: '50 %' },
          ]}
        />{' '}
        des émissions évitées via le télétravail sont émises pour d&apos;autres trajets (courses, école, etc.). Cette
        valeur par défaut (25
        <span
          dangerouslySetInnerHTML={{
            __html: '&nbsp;',
          }}
        />
        %) est tirée de cette{' '}
        <Link href='https://librairie.ademe.fr/mobilite-et-transport/3776-caracterisation-des-effets-rebond-induits-par-le-teletravail.html'>
          étude de l&apos;ADEME
        </Link>
        .
      </p>
      <p>
        Les autres effets rebonds non liés aux déplacements (consommation d&apos;électricité du foyer, achat de matériel
        pour le télétravail, etc.) ne sont pas modélisés ici. Pour donner un ordre de grandeur,{' '}
        <Link href={buildCurrentUrlFor('/?co2=248&equivalents=27006_27002_27976_27010_206589')}>
          la fabrication d&apos;un écran d&apos;ordinateur émet autant que 1 285 km de voiture (248 kg CO<sub>2</sub>e)
        </Link>
        .
      </p>
      {!pristine && (
        <ButtonWrapper>
          <Button onClick={() => setOpen(false)}>Valider</Button>
        </ButtonWrapper>
      )}
    </Modal>
  )
}
