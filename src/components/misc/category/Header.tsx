import React, { useRef, useState } from 'react'
import { Category } from 'types/category'
import { TransportSimulateur } from 'types/transport'
import PageTitle from 'components/base/PageTitle'
import { SectionWideContent } from 'components/base/Section'
import Actions from './Actions'
import { CustomParamValue } from './CustomParam'
import { ActionsContainer, ActionsHeader, ActionsName, Container, Content, Separator } from './Header.styles'
import Integrate from './Integrate'
import Share from './Share'
import TransportIntegrate from './TransportIntegrate'
import TransportShare from './TransportShare'

const Header = ({
  category,
  path,
  params,
  takeScreenshot,
  tracking,
  type,
  title,
  withoutIntegration,
  name,
  withoutShare,
}: {
  category?: Category
  params?: Record<string, CustomParamValue>
  takeScreenshot: () => void
  tracking: string
  type?: TransportSimulateur
  path?: string
  title?: string
  withoutIntegration?: boolean
  withoutShare?: boolean
  name?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [opened, setOpened] = useState('')

  const open = (section: string) => {
    if (opened === section) {
      setOpened('')
    } else {
      setOpened(section)
      if (ref.current && ref.current.scrollIntoView) {
        ref.current.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        })
      }
    }
  }
  return (
    <Container>
      {category ? (
        <PageTitle
          title={
            <>
              Sensibiliser à l'impact <span className='text-secondary'>{category.header} sur le climat</span>
            </>
          }
          description={category.description}
        />
      ) : (
        title && <PageTitle title={title} />
      )}
      <SectionWideContent $size='xs' $noGutter>
        <ActionsContainer ref={ref}>
          <ActionsHeader $center={!name}>
            {name && <ActionsName>{name}</ActionsName>}
            <Actions
              tracking={tracking}
              onClick={(value) => (value === 'telecharger' ? takeScreenshot() : open(value))}
              withoutIntegration={withoutIntegration}
              withoutShare={withoutShare}
            />
          </ActionsHeader>
          {opened && (
            <Content>
              <Separator />
              {opened === 'partager' &&
                (type ? (
                  <TransportShare tracking={tracking} type={type} />
                ) : (
                  <Share category={category} params={params} path={path} />
                ))}
              {opened === 'integrer' &&
                (type ? (
                  <TransportIntegrate tracking={tracking} type={type} />
                ) : (
                  <Integrate path={path || category?.slug || ''} params={params} tracking={tracking} />
                ))}
            </Content>
          )}
        </ActionsContainer>
      </SectionWideContent>
    </Container>
  )
}

export default Header
