import React, { useState } from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import { useSearchEquivalent } from 'components/providers/useSearchEquivalent'
import TextInput from 'components/base/TextInput'
import AllSearchCategory from './AllSearchCategory.js'

export default function AllSearch(props) {
  const [search, setSearch] = useState('')
  const results = useSearchEquivalent(search)

  return (
    <Wrapper>
      <SearchInput
        value={search}
        onChange={({ value }) => setSearch(value)}
        placeholder={'Rechercher un objet ou un geste'}
      />
      {props.open && (
        <>
          <AllSearchCategory
            eqvArray={props.eqvArray}
            setEqvArray={props.setEqvArray}
            items={results}
            cat={'numerique'}
            singleton={results?.length === 1}
          />
          <AllSearchCategory
            eqvArray={props.eqvArray}
            setEqvArray={props.setEqvArray}
            items={results}
            cat={'usagenumerique'}
            singleton={results?.length === 1}
          />
          <AllSearchCategory
            eqvArray={props.eqvArray}
            setEqvArray={props.setEqvArray}
            items={results}
            cat={'fruitsetlegumes'}
            singleton={results?.length === 1}
          />
          <AllSearchCategory
            eqvArray={props.eqvArray}
            setEqvArray={props.setEqvArray}
            items={results}
            cat={'repas'}
            singleton={results?.length === 1}
          />
          <AllSearchCategory
            eqvArray={props.eqvArray}
            setEqvArray={props.setEqvArray}
            items={results}
            cat={'chauffage'}
            singleton={results?.length === 1}
          />
          <AllSearchCategory
            eqvArray={props.eqvArray}
            setEqvArray={props.setEqvArray}
            items={results}
            cat={'transport'}
            singleton={results?.length === 1}
          />
          <AllSearchCategory
            eqvArray={props.eqvArray}
            setEqvArray={props.setEqvArray}
            items={results}
            cat={'habillement'}
            singleton={results?.length === 1}
          />
          <AllSearchCategory
            eqvArray={props.eqvArray}
            setEqvArray={props.setEqvArray}
            items={results}
            cat={'electromenager'}
            singleton={results?.length === 1}
          />
          <AllSearchCategory
            eqvArray={props.eqvArray}
            setEqvArray={props.setEqvArray}
            items={results}
            cat={'boisson'}
            singleton={results?.length === 1}
          />
          <AllSearchCategory
            eqvArray={props.eqvArray}
            setEqvArray={props.setEqvArray}
            items={results}
            cat={'mobilier'}
            singleton={results?.length === 1}
            mb={'17rem'}
          />
        </>
      )}
    </Wrapper>
  )
}

const SearchInput = styled(TextInput)`
  background-image: url("data:image/svg+xml,%3Csvg width='72px' height='68px' viewBox='0 0 72 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='imgloop' transform='translate(5.000000, 5.000000)' stroke='%2326827C' stroke-width='10'%3E%3Ccircle id='Oval' cx='25.5' cy='25.5' r='25.5'%3E%3C/circle%3E%3Cpath d='M47.5,43.5 L59.5415946,55.5415946' id='Line' stroke-linecap='square'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-position: 98% 53%;
  background-repeat: no-repeat;
  background-size: 4%;
  input::placeholder {
    font-weight: 300;
  }
  ${MEDIA.LT.MEDIUM} {
    background-size: 3%;
  }
  ${MEDIA.LT.SMALL} {
    background-size: 5%;
  }
  margin: 0.5rem 0.5rem 0.5rem 0;
`

const Wrapper = styled.div`
  margin: 1rem 2rem 1rem 1rem;
  ${MEDIA.LT.MEDIUM} {
    margin-left: 2.25rem;
  }
`
