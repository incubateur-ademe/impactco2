import React, { useState } from 'react'
import { Category } from 'types/category'
import { ComputedEquivalent } from 'types/equivalent'
import formatName from 'utils/formatName'
import { Section, SectionWideContent } from 'components/base/Section'
import Button from 'components/base/buttons/Button'
import Link from 'components/base/buttons/Link'
import Sources from 'components/misc/category/Sources'
import Co2eModal from 'components/modals/Co2eModal'
import WarningNegaoctet from 'components/modals/WarningNegaoctet'
import styles from './Details.module.css'
import Value from './details/Value'

export default function Details({ equivalent, category }: { equivalent: ComputedEquivalent; category: Category }) {
  const [openModal, setOpenModal] = useState(false)
  const [openWarningModal, setOpenWarningModal] = useState(false)

  return (
    <>
      {openModal && <Co2eModal setOpen={setOpenModal} />}
      {openWarningModal && <WarningNegaoctet setOpen={setOpenWarningModal} />}
      <Section $withoutPadding>
        <SectionWideContent $size='sm'>
          <h1>
            {formatName(equivalent.name, 1, true)}
            {equivalent.suffix}
            <br className={styles.br} />
            {equivalent.subtitle && <span className={styles.subtitle}> ({formatName(equivalent.subtitle, 1)})</span>}
          </h1>
        </SectionWideContent>
      </Section>
      <Value equivalent={equivalent} category={category} />
      <Section $withoutPadding>
        <SectionWideContent $flex $size='sm'>
          <p className={styles.disclaimer}>
            {equivalent.include ? (
              <>
                {equivalent.include.pre}
                <br />
                Valeurs exprimées en kg{' '}
                <Button asLink onClick={() => setOpenModal(true)}>
                  CO<sub>2</sub>e
                </Button>{' '}
                émis{equivalent.include.post ? ` ${equivalent.include.post}` : '.'}
                {equivalent.include.postNewLine && (
                  <>
                    <br />
                    {equivalent.include.postNewLine}
                  </>
                )}
              </>
            ) : (
              <>
                Valeurs exprimées en kg{' '}
                <Button asLink onClick={() => setOpenModal(true)}>
                  CO<sub>2</sub>e
                </Button>{' '}
                émis {category.include}
              </>
            )}
          </p>
          {equivalent?.slug === 'stockagedonnee' ? (
            <>
              <p className={styles.disclaimer}>
                <Button asLink onClick={() => setOpenWarningModal(true)}>
                  Source
                </Button>
              </p>
            </>
          ) : (
            <div className={styles.link}>
              {equivalent.source ? (
                <Link href={equivalent.source}>Source</Link>
              ) : (
                category.sources && <Sources sources={category.sources} tracking={equivalent.name} />
              )}
            </div>
          )}
        </SectionWideContent>
      </Section>
    </>
  )
}
