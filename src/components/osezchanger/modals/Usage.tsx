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
        href='https://www.notion.so/Kit-de-diffusion-b9d08930a49a4346830b7a12fd7cb733?pvs=4'
        target='_blank'
        rel='noreferrer noopener'>
        kit de diffusion Impact CO2
      </Link>
      <br />
      pour vous emparer facilement du simulateur et l’intégrer à votre publication.
      <br />
      <br />
      Besoin d'inspiration?
      <br />
      <Link
        href='https://www.notion.so/2274283430e94d1db71eced54c338997?pvs=4'
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
            <Link href='mailto:impactco2@ademe.fr'>impactco2@ademe.fr</Link>.
            <br />
            <br />
            Pour réutiliser{' '}
            <Link href='https://github.com/incubateur-ademe/impactco2' target='_blank' rel='noreferrer noopener'>
              le code
            </Link>{' '}
            du simulateur, consultez le code du site Impact CO2, développé de manière ouverte (open source).
          </BoxContent>
        )}
      </Box>
    </Container>
  )
}

export default Usage
