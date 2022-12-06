import styled from 'styled-components'

import Slider from 'components/base/Slider'
import Select from 'components/base/Select'
import HorizontalRadio from 'components/base/HorizontalRadio'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  background-color: ${(props) => props.theme.colors.second};
  border: 0.0625rem solid ${(props) => props.theme.colors.second};
  border-radius: 1rem;

  ${(props) => props.theme.mq.medium} {
    padding: 1rem;
  }
  ${(props) => props.theme.mq.iframemedium} {
    flex-direction: column;
    gap: 0.5rem;
  }
`
Wrapper.Column = styled.div``
Wrapper.Label = styled.p`
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  font-weight: 300;

  strong {
    font-weight: bold;
  }
`
Wrapper.Color = styled.span`
  color: ${(props) => props.color};
`
Wrapper.Small = styled.span`
  display: block;
  font-size: 0.75rem;

  ${(props) => props.theme.mq.iframemedium} {
    display: inline;
  }
`
Wrapper.StyledSlider = styled(Slider)`
  min-width: 11rem;
`
Wrapper.ShowMore = styled.button`
  display: none;
  margin: 0;
  padding: 0;
  border: none;
  background-color: transparent;

  svg {
    width: 1.5rem;
    height: auto;

    path {
      fill: ${(props) => props.color || props.theme.colors.main};
    }
  }
  ${(props) => props.theme.mq.iframemedium} {
    display: block;
  }
`
Wrapper.Desktop = styled.div`
  ${(props) => props.theme.mq.iframemedium} {
    display: ${(props) => (props.visible ? 'flex' : 'none')};
    gap: 0.5rem;
    margin: 0.5rem 0 0.75rem;
  }
`
Wrapper.Parameters = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0 0.75rem;

  ${(props) => props.theme.mq.iframemedium} {
    margin: 0;
  }
`
Wrapper.StyledSelect = styled(Select)`
  flex: 1;
  margin: 0;
  font-size: 0.875rem;

  select {
    width: 100%;
    min-width: 5rem;
  }

  ${(props) => props.theme.mq.medium} {
    font-size: 0.75rem;
  }
`
Wrapper.StyledHorizontalRadio = styled(HorizontalRadio)`
  font-size: 0.875rem;

  & label {
    padding: 0.5em;
  }

  ${(props) => props.theme.mq.medium} {
    font-size: 0.75rem;
  }
`

export default Wrapper
