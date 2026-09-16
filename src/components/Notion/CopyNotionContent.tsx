'use client'

import Button from '../base/buttons/Button'
import CopyIcon from '../base/icons/copy'
import styles from './CopyNotionContent.module.css'

const CopyNotionContent = ({ content }: { content: string }) => {
  const handleCopy = async () => {
    try {
      const blob = new Blob([content], { type: 'text/html' })
      const data = [new ClipboardItem({ 'text/html': blob })]
      await navigator.clipboard.write(data)
    } catch (err) {
      console.error('Erreur lors de la copie:', err)
    }
  }

  return (
    <Button asLink className={styles.copyButton} onClick={handleCopy}>
      Copier le contenu <CopyIcon />
    </Button>
  )
}

export default CopyNotionContent
