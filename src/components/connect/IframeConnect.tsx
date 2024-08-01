'use client'

import React, { useEffect, useRef } from 'react'
import styles from './IframeConnect.module.css'

const IframeConnect = ({ src, title }: { src?: string; title: string }) => {
  const ref = useRef<HTMLIFrameElement>(null)
  useEffect(() => {
    if (ref.current) {
      const resize = function (e: MessageEvent) {
        if (ref.current && e.data.s === ref.current.src) {
          if (e.data && e.data.t === 'h') {
            ref.current.style.height = e.data.h + 'px'
          }
        }
      }
      window.addEventListener('message', resize)
      return () => window.removeEventListener('message', resize)
    }
  }, [ref])

  return <iframe ref={ref} id='iframeUAT' title={title} className={styles.iframe} src={src} />
}

export default IframeConnect
