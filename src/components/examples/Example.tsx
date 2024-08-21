'use client'

import React from 'react'
import { Example as ExampleType } from 'types/example'
import { track } from 'utils/matomo'
import IframeableLink from 'components/base/IframeableLink'
import styles from './Example.module.css'
import Tag from './Tag'

const Example = ({ example, withTags }: { example: ExampleType; withTags?: boolean }) => {
  const image = <img src={example.logo} alt={example.name} className={styles.image} />

  return (
    <li className={styles.list}>
      {withTags ? (
        <div className={styles.example}>
          {image}
          <div className={styles.tags}>
            {example.links.map((link) => (
              <Tag key={`${link.href}-${link.label}`} text={link.label} href={link.href} name={example.name} />
            ))}
          </div>
        </div>
      ) : (
        <IframeableLink
          href={example.links[0].href}
          target='_blank'
          rel='noopener noreferrer'
          className={styles.link}
          title={`Lien externe : Aller voir l'exemple d'utilisation sur ${example.name}`}
          onClick={() => track('Exemple', example.name, example.links[0].href)}>
          {image}
        </IframeableLink>
      )}
    </li>
  )
}

export default Example
