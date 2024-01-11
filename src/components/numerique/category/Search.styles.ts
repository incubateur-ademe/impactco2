import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import HorizontalRadio from 'components/base/HorizontalRadio'
import Select from 'components/base/Select'
import Slider from 'components/base/Slider'

export const Wrapper = styled.div`
  background-color: var(--secondary-10);
  border: 0.0625rem solid var(--secondary-10);
  border-radius: 1rem;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 1.5rem;
  ${MEDIA.LT.MEDIUM} {
    padding: 1rem;
  }
  ${MEDIA.LT.IFRAME_MEDIUM} {
    flex-direction: column;
  }
`
export const Label = styled.p`
  font-size: 1.125rem;
  font-weight: 300;
  margin-bottom: 0.5rem;

  strong {
    font-weight: bold;
  }
`
export const Color = styled.span`
  color: ${(props) => props.color};
`
export const Small = styled.span`
  display: block;
  font-size: 0.75rem;

  ${MEDIA.LT.IFRAME_MEDIUM} {
    display: inline;
  }
`
export const StyledSlider = styled(Slider)`
  min-width: 11rem;
`
export const ShowMore = styled.button`
  background-color: transparent;
  border: none;
  display: none;
  margin: 0;
  padding: 0;

  svg {
    height: auto;
    width: 1.5rem;

    path {
      fill: ${(props) => props.color || 'var(--primary-50)'};
    }
  }
  ${MEDIA.LT.IFRAME_MEDIUM} {
    display: block;
  }
`
export const Desktop = styled.div<{ $visible: boolean }>`
  ${MEDIA.LT.IFRAME_MEDIUM} {
    display: ${(props) => (props.$visible ? 'flex' : 'none')};
    gap: 0.5rem;
    margin: 0.5rem 0 0.75rem;
  }
`
export const Parameters = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row-reverse;
  gap: 0.5rem;
  justify-content: flex-start;
  margin: 0.5rem 0 0.75rem;

  ${MEDIA.LT.IFRAME_MEDIUM} {
    margin: 0;
  }
`
export const StyledSelect = styled(Select)`
  flex: 1;
  font-size: 0.875rem;
  margin-bottom: 0 !important;

  select {
    min-width: 5rem;
    width: 100%;
  }

  ${MEDIA.LT.MEDIUM} {
    font-size: 0.75rem;
  }
`
export const StyledHorizontalRadio = styled(HorizontalRadio)`
  font-size: 0.875rem;

  & label {
    padding: 0.5em;
  }

  ${MEDIA.LT.MEDIUM} {
    font-size: 0.75rem;
  }
`
