import React, { useContext } from 'react'

import StyleContext from 'utils/StyleContext'
import UXContext from 'utils/UXContext'
import CO2NumberContext from 'utils/CO2NumberContext'
import ModalContext from 'utils/ModalContext'

import EmbedConfigurator from 'components/base/EmbedConfigurator'

export default function Embed() {
  const { themes, theme, setTheme } = useContext(StyleContext)
  const {
    configuratorOpen,
    setConfiguratorOpen,
    displayTitle,
    setDisplayTitle,
  } = useContext(UXContext)
  const { CO2, setCO2 } = useContext(CO2NumberContext)
  const { setEquivalents } = useContext(ModalContext)

  return (
    <EmbedConfigurator
      id='datagir-mon-convertisseur-co2'
      configuratorOpen={configuratorOpen}
      setConfiguratorOpen={setConfiguratorOpen}
      themes={themes}
      theme={theme}
      setTheme={setTheme}
      setDisplayTitle={setDisplayTitle}
      options={[
        {
          label: 'Choisir les équivalents',
          setter: setEquivalents,
          type: 'button',
        },
        {
          label: 'CO2e',
          value: CO2,
          setter: setCO2,
          type: 'number',
        },
        {
          label: 'Afficher le titre',
          value: displayTitle,
          setter: setDisplayTitle,
          default: true,
          type: 'boolean',
        },
      ]}
    />
  )
}
