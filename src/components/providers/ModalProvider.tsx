import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import Co2eModal2 from 'components/modals/Co2eModal2'
import DetailLivraisonModal2 from 'components/modals/DetailLivraisonModal2'
import DetailsUsagesNumModal from 'components/modals/DetailsUsagesNumModal'
import DevicesModal from 'components/modals/DevicesModal'
import EcvModal from 'components/modals/EcvModal'
import EqModal4 from 'components/modals/EqModal4'
import IFrameLivraisonModal3 from 'components/modals/IFrameLivraisonModal3'
import ReduireModal3 from 'components/modals/ReduireModal3'
import ShareModal from 'components/modals/ShareModal'
import SocialModal3 from 'components/modals/SocialModal3'
import TilesModal from 'components/modals/TilesModal'
import WarningNegaoctet from 'components/modals/WarningNegaoctet'

const ModalContext = React.createContext<{
  Co2e: boolean
  setCo2e: Dispatch<SetStateAction<boolean>>
  tiles: boolean
  setTiles: Dispatch<SetStateAction<boolean>>
  share: string | boolean
  setShare: Dispatch<SetStateAction<string | boolean>>
  social: boolean
  setSocial: Dispatch<SetStateAction<boolean>>
  reduire: boolean
  setReduire: Dispatch<SetStateAction<boolean>>
  ecv: boolean
  setEcv: Dispatch<SetStateAction<boolean>>
  eqv: boolean
  setEqv: Dispatch<SetStateAction<boolean>>
  ifl: boolean
  setIfl: Dispatch<SetStateAction<boolean>>
  devices: boolean
  setDevices: Dispatch<SetStateAction<boolean>>
  hypothesis: boolean
  setHypothesis: Dispatch<SetStateAction<boolean>>
  hypothesisLivraison: boolean
  setHypothesisLivraison: Dispatch<SetStateAction<boolean>>
  warningNegaoctet: boolean
  setWarningNegaoctet: Dispatch<SetStateAction<boolean>>
  //@ts-expect-error: empty init
}>({})

export function ModalProvider({ children }: { children: ReactNode }) {
  const [Co2e, setCo2e] = useState(false)
  const [tiles, setTiles] = useState(false)
  const [share, setShare] = useState<string | boolean>(false)
  const [social, setSocial] = useState(false)
  const [reduire, setReduire] = useState(false)
  const [ecv, setEcv] = useState(false)
  const [eqv, setEqv] = useState(false)
  const [ifl, setIfl] = useState(false) //Ifl == IFrameLivraison
  const [devices, setDevices] = useState(false)
  const [hypothesis, setHypothesis] = useState(false)
  const [hypothesisLivraison, setHypothesisLivraison] = useState(false)
  const [warningNegaoctet, setWarningNegaoctet] = useState(false)

  return (
    <ModalContext.Provider
      value={{
        Co2e,
        setCo2e,
        tiles,
        setTiles,
        share,
        setShare,
        social,
        setSocial,
        reduire,
        setReduire,
        ecv,
        setEcv,
        eqv,
        setEqv,
        ifl,
        setIfl,
        devices,
        setDevices,
        hypothesis,
        setHypothesis,
        warningNegaoctet,
        setWarningNegaoctet,
        hypothesisLivraison,
        setHypothesisLivraison,
      }}>
      {children}
      <Co2eModal2 />
      <EqModal4 />
      <IFrameLivraisonModal3 />
      <SocialModal3 />
      <ReduireModal3 />
      <TilesModal />
      <ShareModal />
      <EcvModal />
      <DevicesModal />
      <DetailsUsagesNumModal />
      <DetailLivraisonModal2 />
      <WarningNegaoctet />
    </ModalContext.Provider>
  )
}

export default ModalContext