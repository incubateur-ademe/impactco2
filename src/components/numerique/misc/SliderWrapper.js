import styled from 'styled-components'

const SliderWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`
SliderWrapper.Slider = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.375rem 0.75rem;
  border: 0.125rem solid ${(props) => props.theme.colors.main};
  border-radius: 0.5rem;
`
SliderWrapper.Value = styled.div`
  width: ${(props) => props.width || 3.5}rem;
  text-align: right;
  white-space: nowrap;
`
SliderWrapper.Label = styled.label`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  text-align: center;
  white-space: nowrap;
`
export default SliderWrapper
