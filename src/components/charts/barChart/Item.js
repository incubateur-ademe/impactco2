import React from 'react'
import styled from 'styled-components'
import useIframe from 'hooks/useIframe'
import MagicLink from 'components/base/MagicLink'
import Bar from './item/Bar'
import Emoji from './item/Emoji'
import Title from './item/Title'

const Wrapper = styled(MagicLink)`
  align-items: flex-end;
  background-color: ${(props) => (props.current ? props.theme.colors.second : 'transparent')};
  border-radius: 1rem;
  display: flex;
  padding: 0.875rem 0.875rem 1rem;
  position: relative;
  text-decoration: none;

  &:hover {
    background-color: ${(props) => props.theme.colors.mainLight};
  }

  ${(props) => props.theme.mq.small} {
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
      {...props}
      to={(iframe ? process.env.NEXT_PUBLIC_URL : '') + props.to}
      onClick={props.onClick || null}
      noIcon
      className='bar-chart-item'
      data-testid={`bar-chart-item-${props['data-flip-id']}`}>
      <Emoji emoji={props.emoji} secondEmoji={props.secondEmoji} />
      <ChartWrapper>
        <Title title={props.title} subtitle={props.subtitle} component={props.component} />
        <Bar value={props.value} usage={props.usage} max={props.max} color={props.color} />
      </ChartWrapper>
    </Wrapper>
  )
}
