import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'

import { formatName } from 'utils/formatters'

import Emoji from 'components/base/Emoji'

const Wrapper = styled.div`
  font-size: clamp(0.75rem, 1em, 1.125rem);
  max-height: 60vh;
  overflow: hidden;
`
const Suggestion = styled.div`
  background-color: ${(props) =>
    props.theme.colors[props.current ? 'second' : 'background']};
  cursor: pointer;
  padding: 0.75em 0.75em 0.75em 2em;
  transition: background-color 200ms ease-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.mainLight};
  }
  &:last-child {
    padding-bottom: 1em;
  }
`
const NotFound = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  font-weight: 300;
  padding: 0.75em 0.75em 0.75em 2em;
`
const Name = styled.span`
  align-items: center;
  display: flex;
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

  return (
    <Wrapper data-testid='suggestions'>
      {props.enabled &&
        (props.results.length ? (
          props.results.map(
            (product, index) =>
              index < 10 && (
                <Suggestion
                  current={index === props.current}
                  key={product.item.id}
                  onClick={() => props.handleSuggestionClick(product)}
                  onMouseDown={(e) => e.preventDefault()}
                  title='simple suggestion'
                >
                  <Name>
                    <Emoji>{product.item.emoji}</Emoji>
                    <span>
                      {formatName(product.item.name, 1)}{' '}
                      {product.item.subtitle && (
                        <Subtitle>
                          {' '}
                          ({formatName(product.item.subtitle, 1)})
                        </Subtitle>
                      )}
                    </span>
                  </Name>
                </Suggestion>
              )
          )
        ) : (
          <>
            <NotFound
              onMouseDown={(e) => e.preventDefault()}
              small
              title='pas de résultat'
            >
              Nous n&apos;avons rien trouvé :(
              <br />
              Essayez de naviguer par catégorie
            </NotFound>
            {props.categories
              .filter((category) => category.display)
              .map((category, index) => (
                <Suggestion
                  current={index === props.current}
                  key={category.slug}
                  onClick={() =>
                    props.handleSuggestionClick({ item: category })
                  }
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <Name>
                    <Emoji>{category.emoji}</Emoji>
                    <span>{category.name}</span>
                  </Name>
                </Suggestion>
              ))}
          </>
        ))}
    </Wrapper>
  )
}
