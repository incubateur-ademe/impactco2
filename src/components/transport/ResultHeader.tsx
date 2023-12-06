import React, { Dispatch, SetStateAction, useContext } from 'react'
import { Category } from 'types/category'
import formatName from 'utils/formatName'
import Checkbox from 'components/base/Checkbox'
import Instruction from 'components/misc/category/Instruction'
import { Checkboxes, Top } from 'components/misc/category/Top'
import TransportContext from './TransportProvider'

const ResultHeader = ({ category }: { category: Category }) => {
  const { displayAll, setDisplayAll, carpool, setCarpool } = useContext<{
    displayAll: boolean
    setDisplayAll: Dispatch<SetStateAction<boolean>>
    carpool: number
    setCarpool: Dispatch<SetStateAction<number>>
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: TODO
  }>(TransportContext)

  return (
    <Top className='noscreenshot'>
      <Instruction title={category.equivalent} gender={category.gender} />
      <Checkboxes $visible>
        <Checkbox
          name='displayAll'
          checked={displayAll}
          onChange={() => {
            setDisplayAll((prevDisplayAll) => !prevDisplayAll)
            window?.please?.track(['trackEvent', 'Interaction', 'Voir tous les équivalents', category.name])
          }}>
          Voir {category.gender === 'f' ? 'toutes' : 'tous'} les {formatName(category.equivalent, 2) || 'équivalents'}
        </Checkbox>
        <Checkbox
          name='carpool'
          checked={carpool}
          onChange={() => {
            setCarpool((prevCarpool) => (prevCarpool ? 0 : 2))
            window?.please?.track(['trackEvent', 'Interaction', 'Covoiturage'])
          }}>
          Afficher le covoiturage
        </Checkbox>
      </Checkboxes>
    </Top>
  )
}

export default ResultHeader
