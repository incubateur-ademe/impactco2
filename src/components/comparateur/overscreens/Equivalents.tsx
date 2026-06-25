import { RefObject, useMemo } from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import Checkbox from './Checkbox'
import SubCategoryEquivalent from './SubCategoryEquivalent'
import { subCategories } from './equivalentCategories'

const Equivalents = ({
  equivalentsToDisplay,
  setEquivalents,
  equivalents,
  firstRef,
  list,
}: {
  equivalentsToDisplay: ComputedEquivalent[]
  equivalents: string[]
  setEquivalents: (value: string[]) => void
  firstRef?: RefObject<HTMLInputElement | null>
  list?: boolean
}) => {
  const Container = list ? 'li' : 'div'
  const { categoriesEquivalents, categorizedSlugs } = useMemo(() => {
    if (list) {
      return { categoriesEquivalents: {}, categorizedSlugs: [] }
    }
    const result = {} as Record<string, Record<string, ComputedEquivalent[]>>
    Object.entries(subCategories).forEach(([category, categoryEquivalents]) => {
      const categories = {} as Record<string, ComputedEquivalent[]>
      Object.entries(categoryEquivalents).forEach(([subCategory, subCategoryEquivalents]) => {
        const filteredEquivalents = subCategoryEquivalents
          .map((subCategoryEquivalent) =>
            equivalentsToDisplay.find((equivalent) => equivalent.slug === subCategoryEquivalent)
          )
          .filter((equivalent) => equivalent !== undefined)
        if (filteredEquivalents.length > 0) {
          categories[subCategory] = filteredEquivalents
        }
      })
      if (Object.keys(categories).length > 0) {
        result[category] = categories
      }
    })
    return {
      categoriesEquivalents: result,
      categorizedSlugs: Object.values(result).flatMap((subCategories) =>
        Object.values(subCategories).flatMap((subCategoryEquivalents) =>
          subCategoryEquivalents.map((equivalent) => equivalent.slug)
        )
      ),
    }
  }, [equivalentsToDisplay, list])

  return (
    <>
      {Object.entries(categoriesEquivalents).map(([category, subCategories]) => (
        <SubCategoryEquivalent
          category={equivalentsToDisplay.find((equivalent) => equivalent.slug === category) as ComputedEquivalent}
          categoriesEquivalents={subCategories}
          equivalents={equivalents}
          setEquivalents={setEquivalents}
          checkbox
          key={category}
        />
      ))}
      {equivalentsToDisplay
        .filter((equivalent) => !categorizedSlugs.includes(equivalent.slug))
        .map((equivalent, index) => (
          <Container key={equivalent.slug}>
            <Checkbox
              equivalents={equivalents}
              equivalent={equivalent}
              setEquivalents={setEquivalents}
              ref={index === 0 ? firstRef : undefined}
            />
          </Container>
        ))}
    </>
  )
}

export default Equivalents
