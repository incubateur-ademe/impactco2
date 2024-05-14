'use client'

import React, { Dispatch, SetStateAction } from 'react'
import DropdownArrowDownIcon from 'components/base/icons/dropdown-arrow-down'
import DropdownArrowUpIcon from 'components/base/icons/dropdown-arrow-up'
import styles from './CategoryDisplayAll.module.css'

const CategoryDisplayAll = ({
  displayAll,
  setDisplayAll,
  displayAllText,
  hideAllText,
}: {
  displayAll: boolean
  setDisplayAll: Dispatch<SetStateAction<boolean>>
  displayAllText: string
  hideAllText: string
}) => {
  return (
    <button className={styles.displayAll} onClick={() => setDisplayAll(!displayAll)}>
      {displayAll ? hideAllText : displayAllText} {displayAll ? <DropdownArrowUpIcon /> : <DropdownArrowDownIcon />}
    </button>
  )
}

export default CategoryDisplayAll
