'use client'

import { useState } from 'react'
import Button from '../base/buttons/Button'
import CopyIcon from '../base/icons/copy'
import styles from './CopyNotionContent.module.css'

const CopyNotionContent = ({ content }: { content: string }) => {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    try {
      const blob = new Blob([content], { type: 'text/html' })
      const data = [new ClipboardItem({ 'text/html': blob })]
      await navigator.clipboard.write(data)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Erreur lors de la copie:', err)
    }
  }

  return (
    <Button asLink className={styles.copyButton} onClick={handleCopy}>
      {copied ? 'Contenu copié' : 'Copier le contenu'} <CopyIcon />
    </Button>
  )
}

export default CopyNotionContent
