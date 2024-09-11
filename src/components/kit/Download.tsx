'use client'

import React from 'react'
import { track } from 'utils/matomo'
import Link from 'components/base/buttons/Link'

const Download = ({ name, customLabel, customHref }: { name: string; customLabel?: string; customHref?: string }) => {
  return (
    <Link
      asButton
      href={customHref || `/kit/${name}.zip`}
      onClick={() => track('Kit de communication', name, 'download-zip')}>
      {customLabel || 'Télécharger les {name} (.zip)'}
    </Link>
  )
}

export default Download
