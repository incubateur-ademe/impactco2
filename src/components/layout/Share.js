import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

import UXContext from 'utils/UXContext'
import Select from 'components/base/FancySelect'
import Panel from 'components/base/Panel'
import Integration from './share/Integration'
import Link from './share/Link'
import Mail from './share/Mail'
import Facebook from './share/Facebook'
import Twitter from './share/Twitter'
import Linkedin from './share/Linkedin'
import Whatsapp from './share/Whatsapp'

const ShareButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;

  svg {
    display: block;
    width: 3.5rem;
    height: auto;

    ${(props) => props.theme.mq.small} {
      width: 2.5rem;
    }

    path {
      fill: ${(props) => props.theme.colors.main};
    }
  }
`
export default function Share(props) {
  const { shareOpen, setShareOpen, typeShare, setTypeShare, setEmbedOpen } =
    useContext(UXContext)

  let location = useLocation()
  const [url, setUrl] = useState()
  useEffect(() => {
    setUrl(
      `${window.location.origin}${
        typeShare === 'result' ? location.pathname + location.search : ''
      }`
    )
  }, [location.search, location.pathname, typeShare])

  return (
    <Panel
      small={props.small}
      id={props.small ? 'share-mobile' : null}
      open={shareOpen}
      toggleClose={() => setShareOpen((prevOpen) => !prevOpen)}
      index={1}
    >
      <h2>
        Partager{' '}
        <Select
          fancy
          value={typeShare}
          onChange={setTypeShare}
          options={[
            { value: 'simulator', label: `ce simulateur` },
            {
              value: 'result',
              label: `cette fiche`,
            },
          ]}
        />
      </h2>
      <ShareButtons>
        <Integration onClick={() => setEmbedOpen(true)} />
        <Mail
          subject={props.messages.mail[typeShare].subject}
          body={props.messages.mail[typeShare].body}
          url={url}
        />
        <Facebook quote={props.messages.facebook[typeShare].quote} url={url} />
        <Twitter title={props.messages.twitter[typeShare].title} url={url} />
        <Linkedin
          title={props.messages.linkedin[typeShare].title}
          summary={props.messages.linkedin[typeShare].summary}
          source={props.messages.linkedin[typeShare].source}
          url={url}
        />
        <Whatsapp title={props.messages.whatsapp[typeShare].title} url={url} />
      </ShareButtons>
      <Link url={url} />
    </Panel>
  )
}
