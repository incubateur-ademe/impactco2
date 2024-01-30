import React, { useMemo, useState } from 'react'
import { Category } from 'types/category'
import { Equivalent } from 'types/equivalent'
import { Section, SectionWideContent } from 'components/base/Section'
import ShareableContent from 'components/misc/ShareableContent'
import { OverScreenEquivalent } from 'components/misc/category/overScreens/Type'
import { overScreenEquivalentValues } from 'components/misc/category/overScreens/Values'
import Signature from 'components/screenshot/Signature'
import Detail from './ecv/Detail'
import DurationSelector from './ecv/DurationSelector'

export default function Ecv({ category, equivalent }: { category: Category; equivalent: Equivalent }) {
  const [overScreen, setOverScreen] = useState<OverScreenEquivalent | undefined>()
  const overScreenValues = useMemo(() => overScreenEquivalentValues(equivalent), [equivalent])

  const [usage, setUsage] = useState('usage' in equivalent && equivalent.usage ? equivalent.usage.defaultyears : 0)

  return (
    <div id='empreinte'>
      {'ecv' in equivalent && equivalent.ecv ? (
        <Section>
          <SectionWideContent $size='sm'>
            <ShareableContent<OverScreenEquivalent>
              tracking={`${equivalent.slug}-detail`}
              overScreen={overScreen ? overScreenValues[overScreen] : undefined}
              setOverScreen={setOverScreen}
              reverse
              size='lg'
              withoutIntegration
              path={`${category.slug}/${equivalent.slug}#empreinte`}>
              <Detail equivalent={equivalent} years={usage} />
              {usage ? <DurationSelector duration={usage} setDuration={setUsage} /> : null}
              <br />
              <Signature small noLink noMargin />
            </ShareableContent>
          </SectionWideContent>
        </Section>
      ) : null}
    </div>
  )
}
