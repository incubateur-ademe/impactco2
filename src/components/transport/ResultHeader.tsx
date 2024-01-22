import React from 'react'
import { Category } from 'types/category'
import { TransportSimulateur } from 'types/transport'
import formatName from 'utils/formatName'
import { track } from 'utils/matomo'
import useParamContext from 'components/providers/ParamProvider'
import Checkbox from 'components/base/Checkbox'
import Instruction from 'components/misc/category/Instruction'
import { Checkboxes, Top } from 'components/misc/category/Top'

const ResultHeader = ({
  category,
  tracking,
  type,
}: {
  category: Category
  tracking: string
  type: TransportSimulateur
}) => {
  const params = useParamContext()
  const { displayAll, setDisplayAll, carpool, setCarpool } = params[type]

  return (
    <Top className='noscreenshot'>
      <Instruction title={category.equivalent} gender={category.gender} />
      <Checkboxes $visible>
        <Checkbox
          name='displayAll'
          checked={displayAll}
          onChange={() => {
            track(tracking, 'Voir tous', displayAll ? 'faux' : 'vrai')
            setDisplayAll((prevDisplayAll) => !prevDisplayAll)
          }}>
          Voir {category.gender === 'f' ? 'toutes' : 'tous'} les {formatName(category.equivalent, 2) || 'équivalents'}
        </Checkbox>
        <Checkbox
          name='carpool'
          checked={carpool}
          onChange={() => {
            track(tracking, 'Covoiturage', carpool ? 'faux' : 'vrai')
            setCarpool((prevCarpool) => (prevCarpool ? 0 : 2))
          }}>
          Afficher le covoiturage
        </Checkbox>
      </Checkboxes>
    </Top>
  )
}

export default ResultHeader
