import React, { Dispatch, SetStateAction } from 'react'
import Modal from 'components/base/Modal'
import Agribalyse from './ecvModal/Agribalyse'
import Numerique from './ecvModal/Numerique'
import Standard from './ecvModal/Standard'
import Transport from './ecvModal/Transport'

export default function EcvModal({
  value,
  setOpen,
}: {
  value: number | string
  setOpen: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <Modal setOpen={setOpen}>
      <h2>Étapes du cycle de vie</h2>
      {typeof value === 'number' ? (
        <>
          {[1, 2, 3, 4, 8].includes(value) && <Standard />}
          {[5, 6, 7].includes(value) && <Transport />}
          {[30, 31, 32, 33, 34, 35].includes(value) && <Agribalyse />}
        </>
      ) : (
        <>
          {[
            ' . terminaux . construction',
            ' . terminaux . usage',
            ' . transmission',
            ' . data center',
            ' . data center . construction',
            ' . data center . usage',
          ].includes(value) && <Numerique />}
        </>
      )}
    </Modal>
  )
}
