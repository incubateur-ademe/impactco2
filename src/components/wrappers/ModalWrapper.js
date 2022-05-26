import React from 'react'

import Co2eModal from 'components/modals/Co2eModal'
import TilesModal from 'components/modals/TilesModal'
import ShareModal from 'components/modals/ShareModal'

export default function ModalWrapper() {
  return (
    <>
      <Co2eModal />
      <TilesModal />
      <ShareModal />
    </>
  )
}
