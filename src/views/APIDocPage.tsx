import classNames from 'classnames'
import React from 'react'
import SwaggerUI, { SwaggerUIProps } from 'swagger-ui-react'
import styles from './Page.module.css'

const APIDocPage = ({ spec }: SwaggerUIProps) => {
  return (
    <div className={classNames(styles.container, 'main-container')}>
      <SwaggerUI spec={spec} />
    </div>
  )
}

export default APIDocPage
