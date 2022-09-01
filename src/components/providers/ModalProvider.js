import React, { useState } from 'react'

import Co2eModal from 'components/modals/Co2eModal'
import TilesModal from 'components/modals/TilesModal'
import ShareModal from 'components/modals/ShareModal'
import OccupancyModal from 'components/modals/OccupancyModal'
import SurveyModal from 'components/modals/SurveyModal'

const ModalContext = React.createContext({})

export function ModalProvider(props) {
  const [Co2e, setCo2e] = useState(false)
  const [tiles, setTiles] = useState(false)
  const [share, setShare] = useState(false)
  const [occupancy, setOccupancy] = useState(false)
  const [survey, setSurvey] = useState(false)

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
        occupancy,
        setOccupancy: (value) => {
          window?._paq?.push([
            'trackEvent',
            'Interaction',
            'Modal',
            'Par personne',
          ])
          setOccupancy(value)
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
      }}
    >
      {props.children}
      <Co2eModal />
      <TilesModal />
      <ShareModal />
      <OccupancyModal />
      <SurveyModal />
    </ModalContext.Provider>
  )
}

export default ModalContext
