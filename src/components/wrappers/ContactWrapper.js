import React from 'react'

import Contact from 'components/layout/Contact'

export default function ContactWrapper() {
  return (
    <Contact
      options={[
        {
          value: 'Imprecision',
          label: `Les chiffres ne sont pas bon`,
        },
      ]}
    />
  )
}
