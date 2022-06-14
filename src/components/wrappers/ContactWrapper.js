import React from 'react'

import Contact from 'components/layout/Contact'

export default function ContactWrapper(props) {
  return (
    <Contact
      small={props.small}
      options={[
        {
          value: 'Erreur',
          label: `Je souhaite signaler une erreur pour un déchet`,
        },
        {
          value: 'Manquant',
          label: `Je souhaite signaler un déchet manquant`,
        },
      ]}
    />
  )
}
