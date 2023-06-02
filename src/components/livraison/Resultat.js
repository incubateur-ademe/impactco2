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

function convertGramsToKilograms(grams) {
  const kilograms = grams / 1000 // Convert grams to kilograms
  const formattedKilograms = kilograms.toLocaleString('fr', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) // Format kilograms with two decimal places and comma as separator
  return formattedKilograms
}

export default function Resultat(props) {
  return (
    <Wrapper>
      <div>
        <ActualResult>{convertGramsToKilograms(props.co2eq)}</ActualResult>
        <Units>kg de CO2e </Units>
      </div>
      <div>
        <Subexplain>par an</Subexplain>
      </div>
    </Wrapper>
  )
}
