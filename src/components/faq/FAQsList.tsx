import classNames from 'classnames'
import { FAQ as FAQType } from 'types/faq'
import IframeableLink from 'components/base/IframeableLink'
import Block, { BlockProps } from 'components/layout/Block'
import FAQ from './FAQ'
import styles from './FAQsList.module.css'

export type FAQSListProps = {
  faqs: FAQType[]
  page?: string
} & BlockProps

const FAQsList = ({ faqs, page, ...blockProps }: FAQSListProps) => {
  return faqs.length === 0 ? null : (
    <Block {...blockProps}>
      <ul>
        {faqs.map((faq) => (
          <FAQ key={faq.title} faq={faq} page={page} />
        ))}
      </ul>
      {page && (
        <div className={classNames(styles.footer, styles.footerTop)}>
          <p>Vous ne trouvez pas de réponse à vos questions ?</p>
          <ul className={styles.footer}>
            <li className={styles.footer}>
              <IframeableLink href={`/rendez-vous?fromLabel=${page}`}>Contactez-nous</IframeableLink>
              <div className={styles.separator} />
            </li>
            <li>
              <IframeableLink href='/doc/questions-frequentes'>Toutes les questions</IframeableLink>
            </li>
          </ul>
        </div>
      )}
    </Block>
  )
}

export default FAQsList
