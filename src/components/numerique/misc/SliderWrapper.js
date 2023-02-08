import styled from 'styled-components'

const SliderWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
`
SliderWrapper.Slider = styled.div`
  align-items: center;
  border: 0.125rem solid ${(props) => props.theme.colors.main};
  border-radius: 0.5rem;
  display: flex;
  gap: 0.75rem;
  padding: 0.375rem 0.75rem;
  width: 100%;
`
SliderWrapper.Value = styled.div`
  text-align: right;
  white-space: nowrap;
  width: ${(props) => props.width || 3.5}rem;
`
SliderWrapper.Label = styled.label`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  text-align: center;
  white-space: nowrap;
`
export default SliderWrapper
