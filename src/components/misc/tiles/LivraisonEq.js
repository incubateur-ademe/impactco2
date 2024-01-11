import styled from 'styled-components'
import fullSentenceFormat from 'utils/fullSentenceFormat'
import { MEDIA } from 'utils/styles'
import Emoji from 'components/base/Emoji'
import { Media, MediaBody, MediaFigure } from 'components/base/Media'

const first2WordsOnly = (sentence) => sentence.split(' ').slice(0, 2).join(' ')
const first2WordsRemoved = (sentence) => sentence.split(' ').slice(2).join(' ')

export default function LivraisonEq(props) {
  return (
    <Wrapper $nbCol={props.nbCol}>
      <Media>
        <MediaFigure>
          <EmojiWrapper>
            <Emoji>{props?.equivalent?.emoji}</Emoji>
          </EmojiWrapper>
        </MediaFigure>
        <MediaBody>
          <Number id={`eq_nb_${props.position}`}>{first2WordsOnly(fullSentenceFormat(props))}</Number>
          <div />
          <OfWhat id={`eq_what_${props.position}`}>
            {first2WordsRemoved(fullSentenceFormat(props)) || <span>&nbsp;</span>}
          </OfWhat>
          <div />
          <div />
        </MediaBody>
      </Media>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  align-items: ${(props) => (props.$nbCol === 3 ? 'inherit' : 'center')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 2.5rem;
  ${MEDIA.LT.LARGE} {
    padding-left: 1rem;
  }
  ${MEDIA.LT.MEDIUM} {
    padding-left: 1rem;
  }
  ${MEDIA.LT.SMALL} {
    align-items: ${(props) => (props.$nbCol === 3 ? 'center' : 'flex-start')};
  }
  ${MEDIA.LT.XSMALL} {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  > div {
    ${MEDIA.LT.SMALL} {
      margin-bottom: 1rem;
      width: ${(props) => (props.$nbCol === 3 ? '10rem' : 'inherit')};
    }
  }
`

const EmojiWrapper = styled.div`
  > span > img.emoji {
    height: 32px;
    width: 32px;
  }
`

const Number = styled.div`
  font-size: 1.125rem;
  ${MEDIA.LT.LARGE} {
    font-size: 1rem;
  }
  ${MEDIA.LT.MEDIUM} {
    font-size: 0.9rem;
  }
  font-weight: 500;
  letter-spacing: 0em;
`

const OfWhat = styled.div`
  color: var(--neutral-50);
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0em;
  line-height: 16px;
  margin-top: -2px;
`
