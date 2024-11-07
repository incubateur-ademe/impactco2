import Image from 'next/image'
import React from 'react'
import Card from 'components/cards/Card'
import styles from './MiniCard.module.css'

const MiniCard = ({ image, title, description }: { image: string; title: string; description: string }) => {
  return (
    <li className={styles.miniCard}>
      <Card colored className={styles.card}>
        <Image src={image} width={88} height={88} alt='' />
      </Card>
      <p>
        <span className={styles.miniCardTitle}>{title}</span> {description}
      </p>
    </li>
  )
}

export default MiniCard
