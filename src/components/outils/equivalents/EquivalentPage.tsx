import { ReactNode, useMemo } from 'react'
import { Category } from 'types/category'
import { ComputedEquivalent } from 'types/equivalent'
import { getName } from 'utils/Equivalent/equivalent'
import Sources from 'components/base/Sources'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import ToolCard from 'components/cards/ToolCard'
import { tools } from 'components/cards/tools'
import Block from 'components/layout/Block'
import Etiquette from '../etiquettes/Etiquette'
import Equivalent from './Equivalent'
import ImageInfography from './infographies/ImageInfography'
import Infography from './infographies/Infography'
import { imageInfographies, infographies } from './infographies/list'
import styles from '../CategoryPage.module.css'

const EquivalentPage = ({
  category,
  equivalent,
  simulator,
}: {
  category: Category
  equivalent: ComputedEquivalent
  simulator?: ReactNode
}) => {
  const tool = tools.find((tool) => tool.slug === category.slug)
  const equivalentsInfography = useMemo(() => {
    const slugs = infographies[equivalent.slug]
    if (slugs && equivalent.carpool) {
      return slugs.map((slug) => (slug === equivalent.slug ? `${equivalent.slug}+${equivalent.carpool}` : slug))
    }
    return slugs
  }, [equivalent])

  const images = useMemo(() => imageInfographies[equivalent.slug], [equivalent])

  const sources = equivalent.sources || category.sources
  return (
    <>
      <Breadcrumbs
        current={getName('fr', equivalent)}
        links={[
          { label: 'Accueil', link: '/' },
          { label: 'Les outils', link: '/outils' },
          category.slug === 'caspratiques'
            ? { label: 'Comparateur carbone', link: '/outils/comparateur' }
            : { label: category.name, link: `/outils/${category.slug}` },
        ]}
      />
      <Block title={getName('fr', equivalent)} as='h1' description="Détail de l'impact carbone">
        <Equivalent category={category} equivalent={equivalent} simulator={simulator} />
        {sources && sources.length > 0 && (
          <Sources className={styles.sources} sources={sources} tracking={category.name} />
        )}
      </Block>
      {equivalentsInfography && (
        <Block title='Infographie' description='Une image vaut mieux que mille mots' id='infographie'>
          <Infography equivalent={equivalent} equivalents={equivalentsInfography} />
        </Block>
      )}
      {images &&
        images.map(({ image, alt }, index) => (
          <Block key={image} id={`image-infographie-${index}`}>
            <ImageInfography equivalent={equivalent} image={image} alt={alt} index={index} />
          </Block>
        ))}
      <Block title='Étiquette' description='Le petit format à intégrer dans vos contenus et applications.'>
        <Etiquette equivalent={equivalent} />
      </Block>
      {tool && (
        <Block>
          <ul>
            <ToolCard
              horizontal
              title={tool.title}
              description={tool.description}
              slug={tool.slug}
              linkLabel={tool.linkLabel}
            />
          </ul>
        </Block>
      )}
    </>
  )
}

export default EquivalentPage
