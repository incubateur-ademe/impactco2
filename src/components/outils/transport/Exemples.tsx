import Image from 'next/image'
import Link from 'src/components/base/buttons/Link'
import styles from './Exemples.module.css'

const Exemples = () => {
  return (
    <>
      <h2 className={styles.title}>Ils ont ajouté Impact Transport :</h2>
      <div className={styles.images}>
        <Image width={191} height={105} src='/images/stadefrance.png' alt='Logo du Stade de France' />
        <Image width={191} height={105} src='/images/carnac.png' alt='Logo de Carnac' />
        <Image width={191} height={105} src='/images/homeexchange.png' alt='Logo de HomeExchange' />
        <Image width={191} height={105} src='/images/franceinfo-grey.png' alt='Logo de France Info' />
      </div>
      <Link
        href={`${process.env.NEXT_PUBLIC_URL}/doc/exemples?activity=all&tool=Impact%20Transport`}
        className={styles.link}>
        Voir tous les exemples
      </Link>
    </>
  )
}

export default Exemples
