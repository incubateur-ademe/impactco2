import styled from 'styled-components'

export const SliderWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
`

export const SliderWrapperSlider = styled.div`
  align-items: center;
  border: 0.125rem solid var(--primary-50);
  border-radius: 0.5rem;
  display: flex;
  gap: 0.75rem;
  padding: 0.375rem 0.75rem;
  width: 100%;
`

export const SliderWrapperValue = styled.div`
  text-align: right;
  white-space: nowrap;
  width: ${(props) => props.width || 3.5}rem;
`

export const SliderWrapperLabel = styled.label`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  text-align: center;
  white-space: nowrap;
`

export const SliderWrapperHint = styled.span`
  color: var(--neutral-60);
  font-weight: 400;
`
