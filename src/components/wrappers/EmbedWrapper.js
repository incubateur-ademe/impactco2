import React from 'react'

import Embed from 'components/layout/Embed'

export default function EmbedWrapper(props) {
  return (
    <Embed
      small={props.small}
      id={process.env.GATSBY_IFRAME_ID}
      result={props.result}
    ></Embed>
  )
}
