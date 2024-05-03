'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { track } from 'utils/matomo'
import FullArrowRightIcon from 'components/base/icons/full-arrow-right'
import styles from './Card.module.css'

const Card = ({
  href,
  title,
  description,
  link,
  image,
  small,
  onClick,
  trackingCategory,
  trackingAction,
}: {
  href?: string
  title: string
  description?: string
  link?: string
  image: string
  small?: boolean
  onClick?: () => void
  trackingCategory?: string
  trackingAction?: string
}) => {
  const inside = (
    <>
      <div className={styles.leftSide}>
        <div className={styles.imageContainer}>
          <Image src={image} width={small ? 24 : 42} height={small ? 24 : 42} alt='' />
        </div>
      </div>
      <div className={styles.content}>
        <div>
          <p className={small ? '' : 'text-xl'}>
            <b>{title}</b>
          </p>
          <p>{description}</p>
        </div>
        {small ? (
          <div className={styles.arrow}>
            <FullArrowRightIcon />
          </div>
        ) : (
          <div className={styles.linkText}>
            {link}
            <div className={styles.arrow}>
              <FullArrowRightIcon />
            </div>
          </div>
        )}
      </div>
    </>
  )
  return (
    <div className={styles.container}>
      {href ? (
        <Link
          href={href}
          target='_blank'
          rel='noreferrer noopener'
          onClick={() => {
            if (trackingCategory && trackingAction) {
              track(trackingCategory, trackingAction, href)
            }
          }}>
          {inside}
        </Link>
      ) : (
        <button
          onClick={() => {
            if (trackingCategory && trackingAction) {
              track(trackingCategory, trackingAction, title)
            }
            if (onClick) {
              onClick()
            }
          }}>
          {inside}
        </button>
      )}
    </div>
  )
}

export default Card
