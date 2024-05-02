import React, { useRef, useState } from 'react'
import { Category } from 'types/category'
import { TransportSimulateur } from 'types/transport'
import { SectionWideContent } from 'components/base/Section'
import Actions from '../shareable/Actions'
import { CustomParamValue } from '../shareable/overScreens/CustomParam'
import { ActionsContainer, ActionsHeader, ActionsName, Content, Separator } from './Header.styles'

const HeadersActions = ({
  takeScreenshot,
  tracking,
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
          </Content>
        )}
      </ActionsContainer>
    </SectionWideContent>
  )
}

export default HeadersActions
