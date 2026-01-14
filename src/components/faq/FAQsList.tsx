import classNames from 'classnames'
import { ElementType } from 'react'
import { FAQ as FAQType } from 'types/faq'
import { DynamicNotionProps } from 'components/Notion/DynamicNotion'
import Link from 'components/base/buttons/Link'
import Block, { BlockProps } from 'components/layout/Block'
import FAQ from './FAQ'
import styles from './FAQsList.module.css'

export type FAQSListProps = {
  faqs: FAQType[]
  page?: string
  DynamicNotion?: ElementType<DynamicNotionProps>
  small?: boolean
  inSimulator?: boolean
} & BlockProps

const FAQsList = ({ faqs, page, DynamicNotion, small, inSimulator, ...blockProps }: FAQSListProps) => {
  const content = (
    <>
      <ul>
        {faqs.map((faq) => (
          <FAQ key={faq.title} faq={faq} page={page} DynamicNotion={DynamicNotion} small={small} />
        ))}
      </ul>
      {page && (
        <div className={classNames(styles.footer, styles.footerTop)}>
          <p>Vous ne trouvez pas de réponse à vos questions ?</p>
          <ul className={styles.footer}>
            <li className={styles.footer}>
              <Link href={inSimulator ? `/suggestion?fromLabel=${page}` : `/rendez-vous?fromLabel=${page}`}>
                Contactez-nous
              </Link>
            </li>
            {!inSimulator && (
              <li>
                <div className={styles.separator} />
                <Link href='/doc/questions-frequentes'>Toutes les questions</Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  )

  return faqs.length === 0 ? null : !small ? <Block {...blockProps}>{content}</Block> : content
}

export default FAQsList
