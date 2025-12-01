import Link from 'components/base/buttons/Link'
import ArrowRightIcon from 'components/base/icons/arrow-right'
import styles from './Breadcrumbs.module.css'

const Breadcrumbs = ({ links, current }: { links: { label: string; link: string }[]; current: string }) => {
  return (
    <nav role='navigation' aria-label="Fil d'Ariane" className='main-container'>
      <ol className={styles.container}>
        {links.map(({ label, link }) => (
          <li key={label} className={styles.li}>
            <Link className={styles.link} href={link}>
              {label}
            </Link>
            <ArrowRightIcon />
          </li>
        ))}
        <li className={styles.current} aria-current='page'>
          {current}
        </li>
      </ol>
    </nav>
  )
}

export default Breadcrumbs
