import { Suspense } from 'react'
import IframeInfography from 'components/outils/equivalents/infographies/IframeInfography'

const page = () => {
  return (
    <Suspense>
      <IframeInfography />
    </Suspense>
  )
}

export default page
