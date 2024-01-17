import React, { Dispatch, SetStateAction, useState } from 'react'
import styled from 'styled-components'
import { track } from 'utils/matomo'
import { MEDIA } from 'utils/styles'
import TextInput from 'components/base/TextInput'
import Button from 'components/base/buttons/Button'

const Wrapper = styled.div`
  align-self: flex-end;
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  position: relative;

  ${MEDIA.LT.SMALL} {
    align-self: center;
    margin: 0;
  }
`

const SearchInput = styled(TextInput)`
  font-size: 0.875rem;
  margin: 0;
  width: 12rem;
`
const SortPanel = styled.div`
  background-color: var(--secondary-10);
  border-radius: 0.5rem;
  box-shadow: -0.25rem 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;
  position: absolute;
  right: 2.5rem;
  z-index: 120;

  ${MEDIA.LT.SMALL} {
    right: auto;
    top: 2.5rem;
  }
`
const Option = styled.button<{ $selected: boolean }>`
  background-color: ${(props) => (props.$selected ? 'var(--secondary-10)' : 'transparent')};
  border: none;
  cursor: pointer;
  display: block;
  padding: 0.75rem 1rem;
  text-align: left;
  white-space: nowrap;
  width: 100%;

  &:hover {
    background-color: ${(props) => (props.$selected ? 'var(--secondary-10)' : 'var(--primary-10)')};
  }
`
export default function Search({
  search,
  setSearch,
  sorting,
  setSorting,
}: {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  sorting: string
  setSorting: Dispatch<SetStateAction<string>>
}) {
  const [displaySort, setDisplaySort] = useState(false)

  return (
    <Wrapper>
      <SearchInput
        value={search}
        onChange={({ value }: { value: string }) => {
          track('Fruits et légumes', 'Recherche', value)
          setSearch(value)
        }}
        placeholder={'Recherchez'}
      />
      <Button size='sm' onClick={() => setDisplaySort((prevDisplaySort) => !prevDisplaySort)} aria-label='Trier par'>
        <svg x='0px' y='0px' width='1rem' height='1rem' fill='currentcolor' viewBox='0 0 489.389 489.389'>
          <path
            d='M261.294,326.102c-8.3-7.3-21.8-6.2-29.1,2.1l-77,86.8v-346.9c0-11.4-9.4-20.8-20.8-20.8s-20.8,9.4-20.8,20.8v346.9
			l-77-86.8c-8.3-8.3-20.8-9.4-29.1-2.1c-8.3,8.3-9.4,20.8-2.1,29.1l113.4,126.9c8.5,10.5,23.5,8.9,30.2,0l114.4-126.9
			C270.694,347.002,269.694,333.402,261.294,326.102z'
          />
          <path
            d='M483.994,134.702l-112.4-126.9c-10-10.1-22.5-10.7-31.2,0l-114.4,126.9c-7.3,8.3-6.2,21.8,2.1,29.1
			c12.8,10.2,25.7,3.2,29.1-2.1l77-86.8v345.9c0,11.4,9.4,20.8,20.8,20.8s20.8-8.3,20.8-19.8v-346.8l77,86.8
			c8.3,8.3,20.8,9.4,29.1,2.1C490.194,155.502,491.294,143.002,483.994,134.702z'
          />
        </svg>
      </Button>
      {displaySort && (
        <SortPanel>
          <Option
            onClick={() => {
              track('Fruits et légumes', 'Tri', 'alph_desc')
              setSorting('alph_desc')
              setDisplaySort(false)
            }}
            $selected={sorting === 'alph_desc'}>
            A =&gt; Z
          </Option>
          <Option
            onClick={() => {
              track('Fruits et légumes', 'Tri', 'alph_asc')
              setSorting('alph_asc')
              setDisplaySort(false)
            }}
            $selected={sorting === 'alph_asc'}>
            Z =&gt; A
          </Option>
          <Option
            onClick={() => {
              track('Fruits et légumes', 'Tri', 'co2_desc')
              setSorting('co2_desc')
              setDisplaySort(false)
            }}
            $selected={sorting === 'co2_desc'}>
            Du + émetteur au - émetteur
          </Option>
          <Option
            onClick={() => {
              track('Fruits et légumes', 'Tri', 'co2_asc')
              setSorting('co2_asc')
              setDisplaySort(false)
            }}
            $selected={sorting === 'co2_asc'}>
            Du - émetteur au + émetteur
          </Option>
        </SortPanel>
      )}
    </Wrapper>
  )
}
