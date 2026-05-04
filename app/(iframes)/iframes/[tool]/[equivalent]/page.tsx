import { notFound } from 'next/navigation'
import { categories } from 'data/categories'
import Equivalent from 'components/outils/equivalents/Equivalent'
import { equivalentsSimulators } from 'components/outils/equivalents/simulators/equivalentsSimulators'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ tool: string; equivalent: string }>
}

const page = async (props: Props) => {
  const params = await props.params
  const category = categories.find((category) => category.slug === params.tool)
  if (!category || !category.equivalents) {
    return notFound()
  }

  const [slug, carpool] = decodeURIComponent(params.equivalent).split('+')
  const equivalent = category.equivalents.find((equivalent) => equivalent.slug === slug)
  if (!equivalent) {
    return notFound()
  }
  return (
    <Equivalent
      category={category}
      equivalent={
        carpool ? { ...equivalent, carpool: Number(carpool), link: `${equivalent.link}+${carpool}` } : equivalent
      }
      simulator={equivalentsSimulators[equivalent.slug]}
    />
  )
}

export default page
