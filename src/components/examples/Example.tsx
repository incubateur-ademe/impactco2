import React from 'react'
import { Example as ExampleType } from 'types/example'
import styles from './Example.module.css'
import Tag from './Tag'

const Example = ({ example }: { example: ExampleType }) => {
  return (
    <div className={styles.example}>
      <img src={example.logo} alt='' className={styles.image} />
      <div className={styles.tags}>
        {example.links.map((link) => (
          <Tag key={link.label} text={link.label} href={link.href} />
        ))}
      </div>
    </div>
  )
}

export default Example
