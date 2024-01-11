import React from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import useIframe from 'hooks/useIframe'
import Link from 'components/base/buttons/Link'
import Bar from './item/Bar'
import Emoji from './item/Emoji'
import Title from './item/Title'

const Wrapper = styled(Link)`
  align-items: center;
  background-color: ${(props) => (props.current ? 'var(--secondary-10)' : 'transparent')};
  border-radius: 1rem !important;
  display: flex;
  padding: 0.875rem 0.875rem 1rem;
  position: relative;
  text-decoration: none;

  &:hover {
    background-color: ${(props) => (props.current ? 'var(--secondary-20)' : 'var(--primary-10)')};
  }

  ${MEDIA.LT.SMALL} {
    padding: 0.25rem 0.125rem 1rem;
  }
`
const ChartWrapper = styled.div`
  flex: 1;
`
export default function Item(props) {
  const iframe = useIframe()
  return (
    <Wrapper
      href={(iframe ? process.env.NEXT_PUBLIC_URL : '') + props.to}
      onClick={props.onClick || null}
      noIcon
      className='bar-chart-item'
      data-testid={`bar-chart-item-${props.slug}`}>
      <Emoji emoji={props.emoji} secondEmoji={props.secondEmoji} />
      <ChartWrapper>
        <Title title={props.title} subtitle={props.subtitle}>
          {props.children}
        </Title>
        <Bar value={props.value} usage={props.usage} max={props.max} color={props.color} />
      </ChartWrapper>
    </Wrapper>
  )
}
