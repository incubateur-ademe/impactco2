import React, { useMemo } from 'react'
import styled from 'styled-components'
import ClipboardBox from 'components/base/ClipboardBox'

export default function IflCode(props) {
  const script = useMemo(
    () =>
      `<script name="impact-co2" src="${window?.location.origin}/iframe.js" data-type="livraison" data-search="?theme=${props.theme}"></script>`,
    [props.theme]
  )

  return (
    <>
      <Label htmlFor='code'>
        2) Copiez le <strong>code</strong> ci-dessous où vous souhaitez afficher l&apos;iframe sur votre site.
      </Label>
      <ClipboardBox tracking='Livraison'>{script}</ClipboardBox>
    </>
  )
}

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`
