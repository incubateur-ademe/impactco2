'use client'

import { useState } from 'react'
import { Example as ExampleType } from 'types/example'
import DropdownArrowDownIcon from 'components/base/icons/dropdown-arrow-down'
import DropdownArrowUpIcon from 'components/base/icons/dropdown-arrow-up'
import Block, { BlockProps } from 'components/layout/Block'
import Example from './Example'
import styles from './ExamplesList.module.css'

export type ExamplesListProps = {
  examples: ExampleType[]
  extraText?: string
  forceDisplay?: boolean
  withTags?: boolean
} & BlockProps

const ExamplesList = ({ examples, extraText, forceDisplay, withTags, ...blockProps }: ExamplesListProps) => {
  const length = examples.length
  const [displayAll, setDisplayAll] = useState(false)

  return !forceDisplay && length === 0 ? null : (
    <Block {...blockProps}>
      <ul className={styles.examples}>
        {(displayAll
          ? examples.sort((a, b) => new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime())
          : examples.sort((a, b) => new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime()).slice(0, 9)
        ).map((example) => (
          <Example key={example.name} example={example} withTags={withTags} />
        ))}
      </ul>
      {length > 9 && (
        <div className={styles.displayAll}>
          <button className={styles.button} onClick={() => setDisplayAll(!displayAll)}>
            Voir {displayAll ? 'moins' : 'plus'} {extraText || "d'exemples"}{' '}
            {displayAll ? <DropdownArrowUpIcon /> : <DropdownArrowDownIcon />}
          </button>
        </div>
      )}
      {length === 0 && <>Pas de résultat</>}
    </Block>
  )
}

export default ExamplesList
