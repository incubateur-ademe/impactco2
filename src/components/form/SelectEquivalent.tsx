import classNames from 'classnames'
import { useMemo } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { computedEquivalents } from 'src/providers/equivalents'
import { Equivalent } from 'types/equivalent'
import { getName } from 'utils/Equivalent/equivalent'
import EquivalentIcon from 'components/base/EquivalentIcon'
import Select, { SelectProps } from './Select'
import styles from './SelectEquivalent.module.css'

const SelectEquivalent = ({ equivalents, ...rest }: Omit<SelectProps, 'children'> & { equivalents: Equivalent[] }) => {
  const { language } = useParamContext()

  const equivalent = useMemo(() => {
    const [slug] = (rest.value as string).split('+')
    return slug === 'avion'
      ? computedEquivalents.find((equivalent) => equivalent.slug.startsWith('avion'))
      : computedEquivalents.find((equivalent) => equivalent.slug === slug)
  }, [rest.value])
  return (
    <div className={styles.container}>
      <Select className={styles.select} {...rest}>
        {equivalents.map((equivalent) => (
          <option key={equivalent.slug} value={equivalent.slug}>
            {getName(language, equivalent)}
          </option>
        ))}
      </Select>
      {equivalent && (
        <div className={classNames(styles.equivalentIcon, { [styles.disabled]: rest.disabled })}>
          <EquivalentIcon
            height={2.5}
            equivalent={{ ...equivalent, carpool: rest.value?.toString().includes('+') ? 1 : undefined }}
          />
        </div>
      )}
    </div>
  )
}

export default SelectEquivalent
