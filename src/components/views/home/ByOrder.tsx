import Image from 'next/image'
import React from 'react'
import { Section, SectionWideContent } from 'components/base/Section'
import styles from './ByOrder.module.css'
import Header from './heading/Header'

export default function ByOrder() {
  return (
    <>
      <Section>
        <SectionWideContent>
          <Header
            noSeparator
            title={
              <>
                <span>Comparer et communiquer facilement&nbsp;</span>
                <span>
                  les bons<b>&nbsp;ordres de grandeur&nbsp;</b>
                </span>
              </>
            }
            cta={{ to: '/comparateur', label: 'Découvrir le comparateur carbone' }}
          />
          <div className={styles.imageContainer}>
            <Image width={800} height={340} src='/images/home-comparateur.png' alt='' className={styles.image} />
          </div>
        </SectionWideContent>
      </Section>
      <Section $theme='color-light'>
        <SectionWideContent>
          <Header
            noSeparator
            title={
              <>
                <span>
                  Partager votre comparaison <b>au format</b>
                </span>
                <span>
                  <b>étiquette</b>
                </span>
              </>
            }
            cta={{ to: '/comparateur#etiquette', label: 'Découvrir les étiquettes' }}
          />
          <div className={styles.imageContainer}>
            <Image width={800} height={340} src='/images/home-etiquette.png' alt='' className={styles.image} />
          </div>
        </SectionWideContent>
      </Section>
    </>
  )
}
