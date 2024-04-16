import { useTranslations } from 'next-intl'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import ExplainArrow from 'components/modals/ExplainArrow.js'

const Wrapper = styled.div`
  border: 1px solid #457be7;
  border-radius: 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 1rem;
  ${MEDIA.LT.XLARGE} {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
  }
`

export default function ExplainArrowContainer() {
  const t = useTranslations('modal.co2')

  return (
    <Wrapper>
      <ExplainArrow />
      <ExplainEqContainer>
        <ExplainEq>
          <div>
            <ActualResult>28</ActualResult>
            <Units> {t('co2')} </Units>
          </div>
          <div>
            <GreyText>...{t('co2-impact')}</GreyText>
            <GreyText>{t('co2-value')}</GreyText>
            <GreyText>({t('co2-equivalent')})</GreyText>
          </div>
        </ExplainEq>
      </ExplainEqContainer>
    </Wrapper>
  )
}

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

const GreyText = styled.div`
  color: #746770;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
`

const ExplainEq = styled.div`
  padding: 0.5rem;
  ${MEDIA.LT.XLARGE} {
    padding: 1rem;
  }
  width: 15rem;
`

const ExplainEqContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
`
