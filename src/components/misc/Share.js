import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useLocation } from '@reach/router'

import Mail from './share/Mail'
import Facebook from './share/Facebook'
import Twitter from './share/Twitter'
import Linkedin from './share/Linkedin'
import Whatsapp from './share/Whatsapp'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 0.75rem;
  margin: ${(props) => (props.title ? '0.5rem' : 0)}
    ${(props) => (props.title ? 0 : 'auto')} 0;

  svg {
    display: block;
    width: 1.75rem;
    height: auto;

    path {
      fill: ${(props) => props.theme.colors.main};
    }
  }
`
export default function Share(props) {
  let location = useLocation()
  const [url, setUrl] = useState()
  useEffect(() => {
    setUrl(`${window.location.origin}`)
  }, [location.search, location.pathname])

  return (
    <Wrapper title={props.title}>
      <Mail subject={'subject'} body={'body'} url={url} />
      <Facebook quote={'quote'} url={url} />
      <Twitter title={'title'} url={url} />
      <Linkedin
        title={'title'}
        summary={'summary'}
        source={'source'}
        url={url}
      />
      <Whatsapp title={'title'} url={url} />
    </Wrapper>
  )
}
