import React from 'react'
import Web from 'components/layout/Web'
import Categories from 'components/misc/Categories'

const Thematiques = () => {
  return (
    <Web
      title='Thématiques'
      breadcrumb={{
        type: 'accueil',
        page: 'Thématiques',
      }}>
      <Categories main />
    </Web>
  )
}

export default Thematiques
