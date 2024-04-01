import { useTranslations } from 'next-intl'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'

export default function ExplainArrow() {
  const t = useTranslations('modal.co2')

  return (
    <Wrapper>
      <BlueGrid>
        <BlueGridInsider>
          <div>
            <ActualResult>1</ActualResult>
            <Units> {t('methane')} </Units>
          </div>
          <Subexplain>
            <div>{t('methane-example')}</div>
            <div>{t('methane-product')}</div>
            <div>
              <strong>{t('methane-comparison')}</strong>
            </div>
          </Subexplain>
        </BlueGridInsider>
      </BlueGrid>
      <Arrow />
    </Wrapper>
  )
}

const BlueGrid = styled.div`
  background-color: #457be7;
  border-bottom-left-radius: 14px;
  border-top-left-radius: 14px;
  color: var(--neutral-00);
  ${MEDIA.LT.XLARGE} {
    border-bottom-left-radius: 0;
    border-top-right-radius: 16px;
    max-width: 100%;
  }
`

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
  color: #aec8fc;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
`

const Arrow = styled.div`
  background: #457be7;
  clip-path: polygon(0% 0%, 52.5% 49.75%, 52.5% 52.5%, 0% 100%);
  height: 100%;
  margin-left: -1px;
  width: 30px;
  ${MEDIA.LT.XLARGE} {
    clip-path: polygon(100% 0%, 52.5% 49.75%, 48.75% 49.75%, 0% 0%);
    height: 30px;
    margin-top: -1px;
    width: 100%;
  }
`

const Wrapper = styled.div`
  display: flex;
  ${MEDIA.LT.XLARGE} {
    flex-direction: column;
  }
`

const BlueGridInsider = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
  padding-top: 0.35rem;
  width: 15rem;
`
