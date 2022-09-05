import React, { useState } from 'react'

import Co2eModal from 'components/modals/Co2eModal'
import TilesModal from 'components/modals/TilesModal'
import ShareModal from 'components/modals/ShareModal'
import SurveyModal from 'components/modals/SurveyModal'
import EcvModal from 'components/modals/EcvModal'

const ModalContext = React.createContext({})

export function ModalProvider(props) {
  const [Co2e, setCo2e] = useState(false)
  const [tiles, setTiles] = useState(false)
  const [share, setShare] = useState(false)
  const [survey, setSurvey] = useState(false)
  const [ecv, setEcv] = useState(true)

  return (
    <ModalContext.Provider
      value={{
        Co2e,
        setCo2e: (value) => {
          window?._paq?.push(['trackEvent', 'Interaction', 'Modal', 'CO2e'])
          setCo2e(value)
        },
        tiles,
        setTiles: (value) => {
          window?._paq?.push(['trackEvent', 'Interaction', 'Modal', 'Tuiles'])
          setTiles(value)
        },
        share,
        setShare: (value) => {
          window?._paq?.push(['trackEvent', 'Interaction', 'Modal', 'Partage'])
          setShare(value)
        },
        survey,
        setSurvey: (value) => {
          window?._paq?.push([
            'trackEvent',
            'Interaction',
            'Modal',
            'Questionnaire',
          ])
          setSurvey(value)
        },
        ecv,
        setEcv: (value) => {
          window?._paq?.push(['trackEvent', 'Interaction', 'Modal', 'ECV'])
          setEcv(value)
        },
      }}
    >
      {props.children}
      <Co2eModal />
      <TilesModal />
      <ShareModal />
      <SurveyModal />
      <EcvModal />
    </ModalContext.Provider>
  )
}

export default ModalContext
