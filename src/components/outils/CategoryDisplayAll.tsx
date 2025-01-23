'use client'

import { track } from 'utils/matomo'
import DropdownArrowDownIcon from 'components/base/icons/dropdown-arrow-down'
import DropdownArrowUpIcon from 'components/base/icons/dropdown-arrow-up'
import styles from './CategoryDisplayAll.module.css'

const CategoryDisplayAll = ({
  id,
  tracking,
  displayAll,
  setDisplayAll,
  displayAllText,
  hideAllText,
}: {
  id?: string
  tracking: string
  displayAll: boolean
  setDisplayAll: (value: boolean) => void
  displayAllText: string
  hideAllText: string
}) => {
  return (
    <button
      className={styles.displayAll}
      aria-expanded={displayAll}
      aria-controls={`category-${id || ''}-equivalents-list`}
      onClick={() => {
        track(tracking, displayAll ? 'HideMore' : 'DisplayMore', 'category_display_more')
        setDisplayAll(!displayAll)
      }}>
      {displayAll ? hideAllText : displayAllText} {displayAll ? <DropdownArrowUpIcon /> : <DropdownArrowDownIcon />}
    </button>
  )
}

export default CategoryDisplayAll
