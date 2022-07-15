import React from 'react'

import ScreenshotWrapper from 'components/misc/ScreenshotWrapper'
import { test } from 'components/visualizations/list'

export default function Visualization(props) {
  return test[props.rule.dottedName] ? (
    <ScreenshotWrapper equivalent={props.rule.dottedName} fixed>
      {test[props.rule.dottedName]}
    </ScreenshotWrapper>
  ) : null
}
