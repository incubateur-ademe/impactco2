import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ClipboardBox from 'components/base/ClipboardBox'

const Wrapper = styled.div`
  position: relative;
`
const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`

export default function Code(props) {
  const [script, setScript] = useState(null)

  useEffect(() => {
    setScript(
      `<script name="impact-co2" src="${window.location.origin}/iframe.js" data-type="${props.type}" data-search="?theme=${props.theme}"></script>`
    )
  }, [props.theme, props.type])

  return (
    <Wrapper>
      <Label htmlFor='code'>
        3) Copiez le code ci-dessous où vous souhaitez afficher l&apos;iframe sur votre site.
      </Label>
      <ClipboardBox tracking='Integration'>{script}</ClipboardBox>
    </Wrapper>
  )
}
