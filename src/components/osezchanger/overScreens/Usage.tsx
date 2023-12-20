import Link from 'next/link'
import React, { useState } from 'react'
import { Icon } from '../icons'
import { Box, BoxContent, Button, Container } from './Usage.styles'

const Usage = () => {
  const [open, setOpen] = useState(false)
  return (
    <Container>
      <p>
        <b>💡 Utiliser cette ressource</b>
      </p>
      Consultez le{' '}
      <Link
        href='https://accelerateur-transition-ecologique-ademe.notion.site/Kit-de-diffusion-b9d08930a49a4346830b7a12fd7cb733'
        target='_blank'
        rel='noreferrer noopener'>
        kit de diffusion Impact CO<sub>2</sub>
      </Link>
      <br />
      pour vous emparer facilement du simulateur et l’intégrer à votre publication.
      <br />
      <br />
      Besoin d'inspiration?
      <br />
      <Link
        href='https://accelerateur-transition-ecologique-ademe.notion.site/2274283430e94d1db71eced54c338997?v=4638552e710e44339afbc9de1b83f785'
        target='_blank'
        rel='noreferrer noopener'>
        Découvrez des exemples de réutilisation
      </Link>
      <Box>
        <Button onClick={() => setOpen(!open)}>
          <Icon iconId={open ? 'arrow-down' : 'arrow-right'} /> Aller plus loin
        </Button>
        {open && (
          <BoxContent>
            Pour réutiliser les données brutes ou obtenir de l'aide pour intégrer ce simulateur, contactez l’équipe à{' '}
            <Link href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}>impactco2@ademe.fr</Link>.
            <br />
            <br />
            Pour réutiliser{' '}
            <Link href='https://github.com/incubateur-ademe/impactco2' target='_blank' rel='noreferrer noopener'>
              le code
            </Link>{' '}
            du simulateur, consultez le code du site Impact CO<sub>2</sub>, développé de manière ouverte (open source).
          </BoxContent>
        )}
      </Box>
    </Container>
  )
}

export default Usage
