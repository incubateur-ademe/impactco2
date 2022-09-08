import React from 'react'
import styled from 'styled-components'

import { slugs, getMonth } from 'utils/months'
import MagicLink from 'components/base/MagicLink'
import TextInput from 'components/base/TextInput'

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 0.5rem;
  padding: 1.5rem 2rem;
  background-color: ${(props) => props.theme.colors.second};
  border-radius: 1rem;

  ${(props) => props.theme.mq.small} {
    padding: 1rem;
  }
`
const Text = styled.p`
  max-width: 26rem;
  margin: 0 auto 0.75rem;
  text-align: center;

  ${(props) => props.theme.mq.small} {
    font-size: 0.875rem;
  }
`
const SearchInput = styled(TextInput)`
  width: 20rem;
  margin: 0 auto 1.25rem;
`
export default function Search(props) {
  return (
    <SearchInput
      value={props.search}
      onChange={({ value }) => props.setSearch(value)}
      placeholder={'Entrez un fruit ou un légume'}
    />
  )
}
