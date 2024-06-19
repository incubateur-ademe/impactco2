import React from 'react'
import styles from './Email.module.css'

const Email = () => {
  return <iframe title='Laisser votre email' className={styles.iframe} src={process.env.CONNECT_IFRAME_HOME} />
}

export default Email
