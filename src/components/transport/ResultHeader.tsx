import React, { Dispatch, SetStateAction, useContext } from 'react'
import { Category } from 'types/category'
import formatName from 'utils/formatName'
import { track } from 'utils/matomo'
import Checkbox from 'components/base/Checkbox'
import Instruction from 'components/misc/category/Instruction'
import { Checkboxes, Top } from 'components/misc/category/Top'
import TransportContext from './TransportProvider'

const ResultHeader = ({ category, tracking }: { category: Category; tracking: string }) => {
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
            track(`Transport ${tracking}`, 'Voir tous', displayAll ? 'faux' : 'vrai')
            setDisplayAll((prevDisplayAll) => !prevDisplayAll)
          }}>
          Voir {category.gender === 'f' ? 'toutes' : 'tous'} les {formatName(category.equivalent, 2) || 'équivalents'}
        </Checkbox>
        <Checkbox
          name='carpool'
          checked={carpool}
          onChange={() => {
            track(`Transport ${tracking}`, 'Covoiturage', carpool ? 'faux' : 'vrai')
            setCarpool((prevCarpool) => (prevCarpool ? 0 : 2))
          }}>
          Afficher le covoiturage
        </Checkbox>
      </Checkboxes>
    </Top>
  )
}

export default ResultHeader
