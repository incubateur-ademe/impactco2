import Link from 'next/link'
import React from 'react'
import { Example as ExampleType } from 'types/example'
import styles from './Example.module.css'
import Tag from './Tag'

const Example = ({ example, withTags }: { example: ExampleType; withTags?: boolean }) => {
  const image = <img src={example.logo} alt='' className={styles.image} />

  return withTags ? (
    <div className={styles.example}>
      {image}
      <div className={styles.tags}>
        {example.links.map((link) => (
          <Tag key={`${link.href}-${link.label}`} text={link.label} href={link.href} />
        ))}
      </div>
    </div>
  ) : (
    <Link href={example.links[0].href} target='_blank' rel='noopener noreferrer' className={styles.link}>
      {image}
    </Link>
  )
}

export default Example
