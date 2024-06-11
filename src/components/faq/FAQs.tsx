import React from 'react'
import { FAQ as FAQType } from 'types/faq'
import Link from 'components/base/buttons/Link'
import Block, { BlockProps } from 'components/layout/Block'
import FAQ from './FAQ'
import styles from './FAQs.module.css'

const FAQs = ({ faqs, page, ...blockProps }: { faqs: FAQType[]; page?: string } & BlockProps) => {
  return faqs.length === 0 ? null : (
    <Block {...blockProps}>
      {faqs.map((faq) => (
        <FAQ key={faq.title} faq={faq} page={page} />
      ))}
      {page && (
        <div className={styles.footer}>
          <div>Vous ne trouvez pas de réponse à vos questions ?</div>
          <Link href={`/rendez-vous?fromLabel=${page}`}>Contactez-nous</Link>
          <div className={styles.separator} />
          <Link href='/doc/questions-frequentes'>Toutes les questions</Link>
        </div>
      )}
    </Block>
  )
}

export default FAQs
