import React, { MouseEventHandler, ReactNode } from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import useIframe from 'hooks/useIframe'
import Link from 'components/base/buttons/Link'
import Bar from './item/Bar'
import Emoji from './item/Emoji'
import Title from './item/Title'

const Wrapper = styled(Link)`
  align-items: center;
  background-color: transparent;
  border-radius: 1rem !important;
  display: flex;
  padding: 0.875rem 0.875rem 1rem;
  position: relative;
  text-decoration: none;

  &:hover {
    background-color: var(--primary-10);
  }

  ${MEDIA.LT.SMALL} {
    padding: 0.25rem 0.125rem 1rem;
  }
`
const ChartWrapper = styled.div`
  flex: 1;
`
export default function Item({
  to,
  onClick,
  slug,
  emoji,
  secondEmoji,
  title,
  subtitle,
  value,
  usage,
  max,
  color,
  children,
}: {
  to: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
  slug: string
  emoji: string
  secondEmoji?: string
  title?: string
  subtitle?: string
  value: number
  usage?: number
  max: number
  color?: string
  children: ReactNode
}) {
  const iframe = useIframe()
  return (
    <Wrapper
      href={(iframe ? process.env.NEXT_PUBLIC_URL : '') + to}
      onClick={onClick}
      noIcon
      className='bar-chart-item'
      data-testid={`bar-chart-item-${slug}`}>
      <Emoji emoji={emoji} secondEmoji={secondEmoji} />
      <ChartWrapper>
        <Title title={title} subtitle={subtitle}>
          {children}
        </Title>
        <Bar value={value} usage={usage} max={max} color={color} />
      </ChartWrapper>
    </Wrapper>
  )
}
