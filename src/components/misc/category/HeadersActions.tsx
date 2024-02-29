import React, { useRef, useState } from 'react'
import { Category } from 'types/category'
import { TransportSimulateur } from 'types/transport'
import { SectionWideContent } from 'components/base/Section'
import Actions from './Actions'
import { CustomParamValue } from './CustomParam'
import { ActionsContainer, ActionsHeader, ActionsName, Content, Separator } from './Header.styles'
import Integrate from './Integrate'
import Share from './Share'
import TransportIntegrate from './TransportIntegrate'
import TransportShare from './TransportShare'

const HeadersActions = ({
  category,
  path,
  params,
  extraParams,
  takeScreenshot,
  tracking,
  type,
  withoutIntegration,
  name,
  withoutShare,
}: {
  category?: Category
  params?: Record<string, CustomParamValue>
  extraParams?: string
  takeScreenshot: () => void
  tracking: string
  type?: TransportSimulateur
  path?: string
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
    <SectionWideContent $size='xs' $noGutter $flex>
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
                <Integrate
                  path={path || category?.slug || ''}
                  params={params}
                  tracking={tracking}
                  extraParams={extraParams}
                />
              ))}
          </Content>
        )}
      </ActionsContainer>
    </SectionWideContent>
  )
}

export default HeadersActions
