import TransportIFramePage from 'src/views/TransportIFramePage'
import { Category as CategoryType } from 'types/category'
import { categories } from 'data/categories'

const category = categories.find((category) => category.slug === 'transport') as CategoryType

const page = () => {
  return <TransportIFramePage category={category} />
}

export default page
