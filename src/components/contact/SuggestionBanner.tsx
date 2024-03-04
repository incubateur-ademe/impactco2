import { SectionWideContent } from 'components/base/Section'
import Link from 'components/base/buttons/Link'
import { FlexContainer, StyledSection, Subtitle } from './SuggestionBanner.styles'

const SuggestionBanner = ({
  from,
  fromLabel,
  simulatorName,
}: {
  from?: string
  fromLabel: string
  simulatorName: string
}) => {
  return (
    <StyledSection>
      <SectionWideContent>
        <FlexContainer>
          <div>
            <span className='text-xl'>
              <b>Un avis, une suggestion ?</b>
            </span>
            <Subtitle>
              Vos retours sont précieux pour améliorer le site Impact CO<sub>2</sub>.
            </Subtitle>
          </div>
          <Link
            asButton
            href={`/suggestion?${from ? `from=${from}&` : ''}fromLabel=${fromLabel}&simulatorName=${simulatorName}`}>
            Faire une suggestion
          </Link>
        </FlexContainer>
      </SectionWideContent>
    </StyledSection>
  )
}

export default SuggestionBanner
