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
  padding: 0.5rem;
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

export default function ResultatLivraison(props) {
  console.log('iiinnnsssiidde---------', props)

  return (
    <Wrapper>
      <div className='item1'>
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M6 3C9.49 3 12.383 5.554 12.913 8.895C14.088 7.724 15.71 7 17.5 7H22V9.5C22 13.09 19.09 16 15.5 16H13V21H11V13H9C5.134 13 2 9.866 2 6V3H6ZM20 9H17.5C15.015 9 13 11.015 13 13.5V14H15.5C17.985 14 20 11.985 20 9.5V9ZM6 5H4V6C4 8.761 6.239 11 9 11H11V10C11 7.239 8.761 5 6 5Z'
            fill='#90B3F8'
          />
        </svg>
      </div>
      <div className='item2' data-testid='resultAsText'>
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
