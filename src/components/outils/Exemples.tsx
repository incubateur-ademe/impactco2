import Image from 'next/image'
import Link from 'src/components/base/buttons/Link'
import styles from './Exemples.module.css'

const Exemples = ({ title, items, tool }: { title: string; items: { src: string; alt: string }[]; tool: string }) => {
  return (
    <>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.images}>
        {items.map((item, index) => (
          <Image key={index} width={191} height={105} src={item.src} alt={item.alt} />
        ))}
      </div>
      <Link href={`/doc/exemples?activity=all&tool=${tool}`} className={styles.link}>
        Voir tous les exemples
      </Link>
    </>
  )
}

export default Exemples
