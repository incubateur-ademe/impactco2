import classNames from 'classnames'
import Link from 'components/base/buttons/Link'
import styles from './Page.module.css'

const DocumentationLivraisonPage = () => {
  return (
    <div className={classNames(styles.container, 'main-container')}>
      <h1>Documentation</h1>
      <ul>
        <li>
          <Link href='/doc/livraison/livraison-colis'>Livraison de colis</Link>
        </li>
        <li>
          <Link href='/doc/livraison/livraison-colis-par-avion'>Livraison de colis par avion</Link>
        </li>
      </ul>
    </div>
  )
}

export default DocumentationLivraisonPage
