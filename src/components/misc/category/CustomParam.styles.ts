import styled from 'styled-components'
import Input from 'components/form/Input'

export const Title = styled.div`
  color: var(--neutral-80);
  font-weight: 500;
  margin-bottom: 0.5rem;
`

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  justify-content: space-between;
  margin-bottom: 2rem;
`

export const InputContainer = styled.div<{ $fullWidth?: boolean }>`
  position: relative;
  ${({ $fullWidth }) => $fullWidth && 'width: 100%;'}
`

export const StyledInput = styled(Input)`
  padding: 0.5rem 3rem 0.5rem 1rem;
  text-align: right;
`

export const InputSuffix = styled.span<{ $disabled: boolean }>`
  color: var(--neutral-50);
  position: absolute;
  right: 1rem;
  top: 0.5rem;
  ${({ $disabled }) => $disabled && 'color: var(--neutral-30);'}
`

export const Inputs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 2rem;
  margin-top: 1rem;
  min-width: 100%;

  > div {
    flex: 1;
    min-width: 300px;
  }
`

export const Params = styled.div`
  display: flex;
  gap: 0.25rem;
`

export const Param = styled.div`
  align-items: center;
  background: var(--neutral-10);
  border: 1px solid var(--neutral-20);
  border-radius: 4px;
  color: var(--neutral-50);
  display: flex;
  font-weight: 500;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
`
