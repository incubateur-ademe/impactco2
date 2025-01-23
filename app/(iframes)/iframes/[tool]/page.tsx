import { notFound } from 'next/navigation'
import { categories } from 'data/categories'
import Category from 'components/outils/Category'
import { simulators } from 'components/outils/simulators'
import { getCategory } from 'utils/category'
import { getDefaultParams } from 'utils/params'

type Props = {
  params: Promise<{ tool: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateStaticParams() {
  return categories.map((category) => ({ tool: category.slug }))
}

const page = async (props: Props) => {
  const params = await props.params
  const defaultParams = getDefaultParams(await props.searchParams)

  const category = getCategory(params.tool)
  if (category) {
    const simulator = simulators[params.tool]
    return <Category category={category} simulator={simulator ? simulator(defaultParams) : undefined} />
  }

  return notFound()
}

export default page
