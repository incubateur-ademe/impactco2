import React from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { Equivalent } from 'types/equivalent'
import { getName } from 'utils/Equivalent/equivalent'
import EquivalentIcon from 'components/base/EquivalentIcon'
import Select, { SelectProps } from './Select'
import styles from './SelectEquivalent.module.css'

const SelectEquivalent = ({
  equivalents,
  equivalent,
  ...rest
}: Omit<SelectProps, 'children'> & { equivalent: Equivalent; equivalents: Equivalent[] }) => {
  const { language } = useParamContext()
  return (
    <div className={styles.container}>
      <Select className={styles.select} {...rest}>
        {equivalents.map((equivalent) => (
          <option key={equivalent.slug} value={equivalent.slug}>
            {getName(language, equivalent)}
          </option>
        ))}
      </Select>
      <div className={styles.equivalentIcon}>
        <EquivalentIcon height={2.5} equivalent={equivalent} />
      </div>
    </div>
  )
}

export default SelectEquivalent
