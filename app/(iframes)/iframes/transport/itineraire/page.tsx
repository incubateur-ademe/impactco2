import TransportIFramePage from 'src/views/TransportIFramePage'
import { Category as CategoryType } from 'types/category'
import { categories } from 'data/categories'
import { getDefaultParams } from 'utils/params'

const category = categories.find((category) => category.slug === 'transport') as CategoryType

const page = async (props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const defaultParams = getDefaultParams(await props.searchParams)
  return <TransportIFramePage category={category} defaultParams={defaultParams} />
}

export default page
