import styled from 'styled-components'
import fullSentenceFormat from 'utils/fullSentenceFormat'
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
  ${(props) => props.theme.mq.large} {
    padding-left: 1rem;
  }
  ${(props) => props.theme.mq.medium} {
    padding-left: 1rem;
  }
  ${(props) => props.theme.mq.small} {
    align-items: ${(props) => (props.$nbCol === 3 ? 'center' : 'flex-start')};
  }
  ${(props) => props.theme.mq.xsmall} {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  > div {
    ${(props) => props.theme.mq.small} {
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
  ${(props) => props.theme.mq.large} {
    font-size: 1rem;
  }
  ${(props) => props.theme.mq.medium} {
    font-size: 0.9rem;
  }
  font-weight: 500;
  letter-spacing: 0em;
`

const OfWhat = styled.div`
  color: ${(props) => props.theme.colors.textGray};
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0em;
  line-height: 16px;
  margin-top: -2px;
`
