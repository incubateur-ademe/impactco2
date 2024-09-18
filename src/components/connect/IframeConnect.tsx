'use client'

import React, { useEffect, useRef, useState } from 'react'
import LoadingIcon from 'components/base/icons/loading'
import styles from './IframeConnect.module.css'

const IframeConnect = ({ src, title }: { src?: string; title: string }) => {
  const ref = useRef<HTMLIFrameElement>(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (ref.current) {
      const resize = function (e: MessageEvent) {
        if (ref.current && e.data.s === ref.current.src) {
          if (e.data && e.data.t === 'h') {
            ref.current.style.height = e.data.h + 'px'
            setReady(true)
          }
        }
      }
      window.addEventListener('message', resize)
      return () => window.removeEventListener('message', resize)
    }
  }, [ref])

  return (
    <>
      {!ready && (
        <div className={styles.loading}>
          Chargement du formulaire en cours <LoadingIcon />
        </div>
      )}
      <iframe ref={ref} id='iframeUAT' title={title} className={ready ? styles.iframe : styles.hidden} src={src} />
    </>
  )
}

export default IframeConnect
