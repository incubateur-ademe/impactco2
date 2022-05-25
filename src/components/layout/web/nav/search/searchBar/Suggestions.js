import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components'

import { formatName } from 'utils/formatters'
import Emoji from 'components/base/Emoji'

const Wrapper = styled.div`
  max-height: 60vh;
  overflow: hidden;
`
const Suggestion = styled.div`
  padding: 0.75em 0.75em 0.75em 2em;
  cursor: pointer;
  transition: background-color 200ms ease-out;
  background-color: ${(props) =>
    props.theme.colors[props.current ? 'second' : 'background']};

  &:hover {
    background-color: ${(props) => props.theme.colors.mainLight};
  }
  &:last-child {
    padding-bottom: 1.5em;
  }
`
const Name = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`
const Subtitle = styled.span`
  font-weight: 300;
`
export default function Suggestions(props) {
  const onKeyDown = useCallback(
    (e) => {
      if (e.code === 'ArrowDown') {
        e.preventDefault()
        props.current < 9
          ? props.setCurrent((prevCurrent) => prevCurrent + 1)
          : props.setCurrent(0)
      }
      if (e.code === 'ArrowUp') {
        e.preventDefault()
        props.current > 0 && props.setCurrent((prevCurrent) => prevCurrent - 1)
      }
    },
    [props]
  )

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown])
  console.log(props.results)
  return (
    <Wrapper>
      {props.results.map(
        (product, index) =>
          index < 10 && (
            <Suggestion
              current={index === props.current}
              key={product.item.id}
              onClick={() => props.handleSuggestionClick(product)}
              onMouseDown={(e) => e.preventDefault()}
            >
              <Name>
                <Emoji>{product.item.emoji}</Emoji>
                <span>
                  {formatName(product.item.name.fr, 1)}{' '}
                  {product.item.subtitle && (
                    <Subtitle>
                      {' '}
                      ({formatName(product.item.subtitle.fr, 1)})
                    </Subtitle>
                  )}
                </span>
              </Name>
            </Suggestion>
          )
      )}
    </Wrapper>
  )
}
