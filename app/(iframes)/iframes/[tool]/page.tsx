import { notFound } from 'next/navigation'
import Category from 'components/outils/Category'
import { simulators } from 'components/outils/simulators'
import { getCategory } from 'utils/category'

type Props = { params: Promise<{ tool: string }> }
export const dynamic = 'force-dynamic'

const page = async (props: Props) => {
  const params = await props.params
  const category = getCategory(params.tool)
  if (category) {
    return (
      <Category category={category} simulator={simulators[params.tool]} noBottomBorders={params.tool === 'transport'} />
    )
  }

  return notFound()
}

export default page
