import styled from 'styled-components'

const ActualResult = styled.span`
  font-size: 36px;
  font-weight: 700;
  line-height: 56px;
`
const Units = styled.span`
  font-size: 18px;
  font-weight: 400;
  line-height: 40px;
`

const Subexplain = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
`

const Wrapper = styled.div`
  margin-top: 1rem;
`

export default function Resultat() {
  return (
    <Wrapper>
      <div>
        <ActualResult>0 </ActualResult>
        <Units>kg de CO2e </Units>
      </div>
      <div>
        <Subexplain>par an</Subexplain>
      </div>
    </Wrapper>
  )
}
