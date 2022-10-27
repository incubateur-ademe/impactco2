import React, { useContext } from 'react'

import { formatNumber } from 'utils/formatters'
import RulesContext from 'components/numerique/RulesProvider'

export default function Chart(props) {
  const { engine } = useContext(RulesContext)

  return engine ? (
    <div>
      {formatNumber(
        (engine.evaluate('email').nodeValue * props.numberEmails +
          engine.evaluate('streaming').nodeValue +
          engine.evaluate('visio').nodeValue) /
          1000
      )}
    </div>
  ) : null
}
