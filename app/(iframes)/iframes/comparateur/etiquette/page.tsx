import { Suspense } from 'react'
import IFrameEtiquette from 'components/outils/etiquettes/IframeEtiquette'

const page = () => {
  return (
    <Suspense>
      <IFrameEtiquette />
    </Suspense>
  )
}

export default page
