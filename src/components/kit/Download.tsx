'use client'

import React from 'react'
import { track } from 'utils/matomo'
import Link from 'components/base/buttons/Link'

const Download = ({ name }: { name: string }) => {
  return (
    <Link asButton href={`/kit/${name}.zip`} onClick={() => track('Kit de communication', name, 'download-zip')}>
      Télécharger les {name} (.zip)
    </Link>
  )
}

export default Download
