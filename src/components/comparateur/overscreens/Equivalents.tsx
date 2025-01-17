import { RefObject } from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import Checkbox from './Checkbox'

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
  return equivalentsToDisplay.map((equivalent, index) => (
    <Container key={equivalent.slug}>
      <Checkbox
        equivalents={equivalents}
        equivalent={equivalent}
        setEquivalents={setEquivalents}
        ref={index === 0 ? firstRef : undefined}
      />
    </Container>
  ))
}

export default Equivalents
