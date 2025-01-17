import { DefaultParams } from 'utils/params'
import Shareable from 'components/shareable/Shareable'
import { overScreenComparateurValues } from 'components/shareable/overScreens/Values'
import ComparateurSimulator from './ComparateurSimulator'

const Comparateur = ({ defaultParams }: { defaultParams: DefaultParams['comparateur'] }) => {
  return (
    <Shareable slug='comparateur' tracking='Comparateur' overScreens={overScreenComparateurValues}>
      <ComparateurSimulator defaultParams={defaultParams} />
    </Shareable>
  )
}

export default Comparateur
