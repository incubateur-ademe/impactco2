import React, { useState } from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import useIframe from 'hooks/useIframe'
import Button from 'components/base/buttons/Button'
import Item from './list/Item'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  ${MEDIA.LT.SMALL} {
    gap: 0.75rem;
  }
`
const StyledButton = styled(Button)`
  margin-bottom: 2rem;
`
export default function List(props) {
  const iframe = useIframe()

  const itemPerPage = 12
  const [page, setPage] = useState(1)

  return (
    <>
      <Wrapper>
        {props.items
          .filter((item, index) => index < itemPerPage * page || !iframe)
          .map((item) => (
            <Item key={item.id} item={item} />
          ))}
      </Wrapper>
      {iframe && props.items.length > itemPerPage * page ? (
        <StyledButton asLink onClick={() => setPage((prevPage) => prevPage + 1)}>
          Voir la suite
        </StyledButton>
      ) : null}
    </>
  )
}
