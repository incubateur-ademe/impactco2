import React, { useMemo, useState } from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'
import { Category } from 'types/category'
import { Equivalent } from 'types/equivalent'
import { Section, SectionWideContent } from 'components/base/Section'
import ShareableContent from 'components/misc/ShareableContent'
import { OverScreenEquivalent } from 'components/misc/category/overScreens/Type'
import { overScreenEquivalentValues } from 'components/misc/category/overScreens/Values'
import visualizations from 'components/visualizations/list'

const Background = styled.div`
  background-color: var(--secondary-10);
  border-radius: 16px;
  padding: 1.5rem;
`

const StyledSection = styled(Section)`
  width: 100vw;
  .slick-track {
    display: flex !important;
  }

  .slick-slide {
    position: relative;
    height: inherit !important;

    & > div {
      height: 100%;
    }
  }

  .slick-slide.slick-current {
    z-index: 2;
  }

  .slick-prev {
    background-image: url("data:image/svg+xml,%3Csvg width='27' height='31' viewBox='0 0 27 31' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.5 17.9187C-0.499999 16.764 -0.500001 13.8772 1.5 12.7225L22.5 0.598169C24.5 -0.556532 27 0.886842 27 3.19624L27 27.445C27 29.7544 24.5 31.1977 22.5 30.043L1.5 17.9187Z' fill='%2326827C'/%3E%3C/svg%3E%0A");
    left: -1rem;
  }

  .slick-next {
    background-image: url("data:image/svg+xml,%3Csvg width='27' height='31' viewBox='0 0 27 31' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25.5 12.7224C27.5 13.8771 27.5 16.7639 25.5 17.9186L4.5 30.0429C2.5 31.1976 -1.38802e-06 29.7543 -1.28708e-06 27.4449L-2.27131e-07 3.19616C-1.26184e-07 0.886754 2.5 -0.556626 4.5 0.598075L25.5 12.7224Z' fill='%2326827C'/%3E%3C/svg%3E%0A");
    right: -1rem;
  }
`

export default function Visualization({
  category,
  equivalent,
  iframe,
}: {
  category: Category
  equivalent: Equivalent
  iframe?: boolean
}) {
  const [overScreen, setOverScreen] = useState<OverScreenEquivalent | undefined>()
  const overScreenValues = useMemo(() => overScreenEquivalentValues(equivalent), [equivalent])

  const list = visualizations[equivalent.slug]
  const content = list?.map((visualization, index) =>
    iframe ? (
      <Background key={index}>{visualization}</Background>
    ) : (
      <ShareableContent<OverScreenEquivalent>
        key={index}
        tracking={equivalent.name}
        overScreen={overScreen ? overScreenValues[overScreen] : undefined}
        setOverScreen={setOverScreen}
        size='sm'
        reverse
        theme='color'
        withoutIntegration
        path={`${category.slug}/${equivalent.slug}#infographie`}>
        {visualization}
      </ShareableContent>
    )
  )
  return (
    <div id='infographie'>
      {content ? (
        <StyledSection>
          <SectionWideContent $size='sm'>
            {list.length > 1 ? (
              <Slider
                dots={false}
                infinite
                speed={200}
                fade
                slidesToShow={1}
                slidesToScroll={1}
                responsive={[
                  {
                    breakpoint: 930,
                    settings: {
                      dots: true,
                      arrows: false,
                    },
                  },
                ]}>
                {content}
              </Slider>
            ) : (
              content
            )}
          </SectionWideContent>
        </StyledSection>
      ) : null}
    </div>
  )
}
