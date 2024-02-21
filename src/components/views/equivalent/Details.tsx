import React from 'react'
import { Category } from 'types/category'
import { Equivalent } from 'types/equivalent'
import formatName from 'utils/formatName'
import useModalContext from 'components/providers/ModalProvider'
import { Section, SectionWideContent } from 'components/base/Section'
import Button from 'components/base/buttons/Button'
import Link from 'components/base/buttons/Link'
import Sources from 'components/misc/category/Sources'
import styles from './Details.module.css'
import Value from './details/Value'

export default function Details({ equivalent, category }: { equivalent: Equivalent; category: Category }) {
  const { setCo2e, setWarningNegaoctet } = useModalContext()
  return (
    <>
      <Section $withoutPadding>
        <SectionWideContent $size='sm'>
          <h1>
            {equivalent.prefix && <>{formatName(equivalent.prefix, 1, true)}</>}
            {formatName(equivalent.name, 1, !equivalent.prefix)}
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
                <Button asLink onClick={() => setCo2e(true)}>
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
                <Button asLink onClick={() => setCo2e(true)}>
                  CO<sub>2</sub>e
                </Button>{' '}
                émis {category.include}
              </>
            )}
          </p>
          {equivalent?.slug === 'stockagedonnee' ? (
            <>
              <p className={styles.disclaimer}>
                <Button asLink onClick={() => setWarningNegaoctet(true)}>
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
