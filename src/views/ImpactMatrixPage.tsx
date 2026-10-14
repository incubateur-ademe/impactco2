import ImpactMatrix from 'components/statistics/ImpactMatrix'
import Block from 'src/components/layout/Block'

const ImpactMatrixPage = () => {
  return (
    <Block title="Matrice d'impact" description="Les métriques clés sur lesquelles repose la stratégie d'Impact CO₂">
      <ImpactMatrix />
    </Block>
  )
}

export default ImpactMatrixPage
