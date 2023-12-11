import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import React, { useContext } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { computeECVWithMultiplier } from 'utils/computeECV'
import formatName from 'utils/formatName'
import formatNumber from 'utils/formatNumber'
import { track } from 'utils/matomo'
import useIframe from 'hooks/useIframe'
import DataContext from 'components/providers/DataProvider'
import Button from 'components/base/Button'
import Emoji from 'components/base/Emoji'

const Wrapper = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.colors[props.background ? 'textLight' : 'second']};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  padding: 1.125rem 0.25rem;
  position: relative;
  width: calc(33.3333% - 1rem);

  ${(props) => props.theme.mq.medium} {
    width: calc(33.3333% - 0.5rem);
  }
  ${(props) => props.theme.mq.small} {
    width: calc(50% - 0.375rem);
  }
`
const ButtonDrag = styled.button`
  background: none;
  border: none;
  cursor: grab;
  height: 1.125rem;
  left: 0.75rem;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0.75rem;

  svg {
    height: 100%;
    transform-origin: center;
    width: auto;

    circle {
      fill: ${(props) => props.theme.colors.main};
    }
  }

  ${(props) => props.theme.mq.small} {
    display: none;
  }
`
const ButtonRemove = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0;
  padding: 0;
  position: absolute;
  right: 0.75rem;
  top: 0.75rem;
  width: 1rem;

  svg {
    height: auto;
    transform-origin: center;
    width: 100%;

    path {
      fill: ${(props) => props.theme.colors.main};
    }
  }

  &:hover {
    svg {
      transform: rotate(360deg);
    }
  }
`
const EmojiWrapper = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;

  img,
  span {
    display: block;
  }
`
const Title = styled.p`
  color: ${(props) => props.theme.colors.text};
  font-size: 0.875rem;
  font-weight: normal;
  line-height: 1.2;
  margin-bottom: 0.25rem;
  text-align: center;
`
const Number = styled.span`
  display: block;
  font-size: 2rem;
  font-weight: bold;

  ${(props) => props.theme.mq.small} {
    font-size: 1.75rem;
  }
`
const Name = styled.span`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 2.125rem;
`
const Subtitle = styled.span`
  display: block;
  font-size: 0.75rem;
  font-weight: 300;
`
const StyledButton = styled(Button)`
  font-size: 0.8125rem;
  padding: 0.5em 0.75rem;

  svg {
    display: block;
    height: 0.75rem;
    width: auto;
  }
`
const Svg = styled.svg`
  height: auto;
  width: 1em;
`
export default function Tile(props) {
  const { categories } = useContext(DataContext)

  const iframe = useIframe()

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.equivalent.id,
    animateLayoutChanges: ({ wasDragging }) => !wasDragging,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  }

  return (
    <Wrapper background={props.background} ref={setNodeRef} style={style}>
      {!props.reference && (
        <ButtonDrag {...attributes} {...listeners} aria-label={'Déplacer'}>
          <svg width='12' height='16' viewBox='0 0 12 16' fill='none'>
            <circle cx='2' cy='2' r='2' />
            <circle cx='10' cy='2' r='2' />
            <circle cx='2' cy='8' r='2' />
            <circle cx='10' cy='8' r='2' />
            <circle cx='2' cy='14' r='2' />
            <circle cx='10' cy='14' r='2' />
          </svg>
        </ButtonDrag>
      )}
      {props.removeEquivalent && (
        <ButtonRemove
          onClick={() => {
            props.removeEquivalent(props.equivalent.id)
          }}
          aria-label={'Supprimer'}>
          <svg x='0px' y='0px' width='41.756px' height='41.756px' viewBox='0 0 41.756 41.756'>
            <path
              // eslint-disable-next-line max-len
              d='M27.948,20.878L40.291,8.536c1.953-1.953,1.953-5.119,0-7.071c-1.951-1.952-5.119-1.952-7.07,0L20.878,13.809L8.535,1.465c-1.951-1.952-5.119-1.952-7.07,0c-1.953,1.953-1.953,5.119,0,7.071l12.342,12.342L1.465,33.22c-1.953,1.953-1.953,5.119,0,7.071C2.44,41.268,3.721,41.755,5,41.755c1.278,0,2.56-0.487,3.535-1.464l12.343-12.342l12.343,12.343c0.976,0.977,2.256,1.464,3.535,1.464s2.56-0.487,3.535-1.464c1.953-1.953,1.953-5.119,0-7.071L27.948,20.878z'
            />
          </svg>
        </ButtonRemove>
      )}
      <EmojiWrapper>
        <Emoji>{props.equivalent.emoji}</Emoji>
      </EmojiWrapper>
      <Title>
        <Number>
          {props.noAnimation ? (
            formatNumber(props.weight / computeECVWithMultiplier(props.equivalent))
          ) : (
            <CountUp end={props.weight / computeECVWithMultiplier(props.equivalent)} duration={0.5} separator=' ' />
          )}
        </Number>
        <Name>
          {formatName(
            (props.equivalent.prefix || '') + props.equivalent.name,
            props.weight / computeECVWithMultiplier(props.equivalent)
          )}
          {props.showSubtitle && props.equivalent.subtitle ? (
            <Subtitle>
              {formatName(props.equivalent.subtitle, props.weight / computeECVWithMultiplier(props.equivalent))}
            </Subtitle>
          ) : (
            ''
          )}
        </Name>
      </Title>
      {props.reference ? (
        !props.equivalentPage && (
          <Button.Wrapper>
            <StyledButton
              to={`${iframe ? process.env.NEXT_PUBLIC_URL : ''}/${
                categories.find((category) => category.id === props.equivalent.category)?.slug
              }/${props.equivalent.slug}`}>
              Voir le détail
              {iframe && (
                <Svg x='0px' y='0px' viewBox='0 0 283.178 283.178'>
                  <path
                    d='M254.812,140.713h-20c-4.142,0-7.5,3.358-7.5,7.5v91.186c0,4.84-3.939,8.778-8.779,8.778H43.776
		c-4.839,0-8.775-3.938-8.775-8.778V64.645c0-4.841,3.936-8.78,8.775-8.78h95.855c4.142,0,7.5-3.358,7.5-7.5v-20
		c0-4.142-3.358-7.5-7.5-7.5H43.776c-24.138,0-43.775,19.64-43.775,43.78v174.755c0,24.14,19.638,43.778,43.775,43.778h174.756
		c24.14,0,43.779-19.639,43.779-43.778v-91.186C262.312,144.071,258.954,140.713,254.812,140.713z'
                  />
                  <path
                    d='M275.677,0h-79.553c-4.142,0-7.5,3.358-7.5,7.5v20c0,4.142,3.358,7.5,7.5,7.5h27.304
		L120.683,137.743c-2.929,2.929-2.929,7.677,0,10.607l14.142,14.143c1.407,1.407,3.314,2.197,5.304,2.197
		c1.989,0,3.897-0.79,5.303-2.197L248.177,59.748v27.303c0,4.142,3.358,7.5,7.5,7.5h20c4.142,0,7.5-3.358,7.5-7.5V7.5
		C283.177,3.358,279.819,0,275.677,0z'
                  />
                </Svg>
              )}
            </StyledButton>
          </Button.Wrapper>
        )
      ) : (
        <Button.Wrapper>
          <StyledButton
            onClick={() => {
              track('Comparateur', 'Comparer', props.equivalent.slug)
              props.setCurEquivalent(props.equivalent)
            }}
            hollow>
            <svg width='292' height='388' viewBox='0 0 292 388' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M168.627 9.37298C162.378 3.12397 154.19 -4.25109e-05 146 -4.32269e-05C137.812 -4.39427e-05 129.62 3.12497 123.373 9.37297L9.99496 122.75C-2.50204 135.247 -2.50205 155.508 9.99495 168.005C22.492 180.502 42.753 180.502 55.25 168.005L114 109.255L114 356.001C114 373.674 128.327 388.001 146 388.001C163.673 388.001 178 373.674 178 356.001L178 109.255L236.75 168.005C249.247 180.502 269.508 180.502 282.005 168.005C294.502 155.508 294.502 135.247 282.005 122.75L168.627 9.37298Z' />
            </svg>
            Comparer
          </StyledButton>
        </Button.Wrapper>
      )}
    </Wrapper>
  )
}
