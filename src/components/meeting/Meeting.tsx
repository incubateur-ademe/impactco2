import React from 'react'
import Card from 'components/base/Card'

const Meeting = ({ from, fromLabel }: { from?: string; fromLabel: string }) => {
  return (
    <Card
      href={`/rendez-vous?${from ? `from=${from}&` : ''}fromLabel=${fromLabel}`}
      title='Obtenir un accompagnement'
      description='Vous avez besoin d’aide pour intégrer les ressources de notre site ou souhaitez obtenir des informations ?'
      link='Prendre rendez-vous'
      image='/images/envelop.png'
    />
  )
}

export default Meeting
