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
  background-color: #457be7;
  border-radius: 16px;
  color: white;
  display: grid;
  grid-template-columns: 30px 1fr;
  margin-top: 1rem;
  max-width: 350px;
  > .item1 {
    align-items: center;
    display: flex;
    justify-content: end;
    margin-right: 4px;
    margin-top: 7px;
  }
  > .item4 {
    color: #aec8fc;
    margin-bottom: 1rem;
    margin-top: -5px;
  }
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
      <div className='item1'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='#AEC8FC'
          viewBox='0 0 16 16'
        >
          <path d='M8.416.223a.5.5 0 0 0-.832 0l-3 4.5A.5.5 0 0 0 5 5.5h.098L3.076 8.735A.5.5 0 0 0 3.5 9.5h.191l-1.638 3.276a.5.5 0 0 0 .447.724H7V16h2v-2.5h4.5a.5.5 0 0 0 .447-.724L12.31 9.5h.191a.5.5 0 0 0 .424-.765L10.902 5.5H11a.5.5 0 0 0 .416-.777l-3-4.5zM6.437 4.758A.5.5 0 0 0 6 4.5h-.066L8 1.401 10.066 4.5H10a.5.5 0 0 0-.424.765L11.598 8.5H11.5a.5.5 0 0 0-.447.724L12.69 12.5H3.309l1.638-3.276A.5.5 0 0 0 4.5 8.5h-.098l2.022-3.235a.5.5 0 0 0 .013-.507z' />
        </svg>
      </div>
      <div className='item2'>
        <ActualResult>{convertGramsToKilograms(props.co2eq)}</ActualResult>
        <Units> kg de CO2e </Units>
      </div>
      <div className='item3'></div>
      <div className='item4'>
        <Subexplain>par an</Subexplain>
      </div>
    </Wrapper>
  )
}
