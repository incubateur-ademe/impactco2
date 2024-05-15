'use client'

import React, { useState } from 'react'
import { Example as ExamplteType } from 'types/example'
import DropdownArrowDownIcon from 'components/base/icons/dropdown-arrow-down'
import DropdownArrowUpIcon from 'components/base/icons/dropdown-arrow-up'
import Block, { BlockProps } from 'components/layout/Block'
import Example from './Example'
import styles from './Examples.module.css'

const Examples = ({
  examples,
  extraText,
  forceDisplay,
  ...blockProps
}: {
  examples: ExamplteType[]
  extraText?: string
  forceDisplay?: boolean
} & BlockProps) => {
  const length = examples.length
  const [displayAll, setDisplayAll] = useState(false)
  return !forceDisplay && length === 0 ? null : (
    <Block {...blockProps}>
      <div className={styles.examples}>
        {(displayAll ? examples : examples.slice(0, 6)).map((example) => (
          <Example key={example.name} example={example} />
        ))}
      </div>
      {length > 6 && (
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

export default Examples
