import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { Address as AddressType } from 'types/address'
import { Point } from 'hooks/useItineraries'
import Search from './address/Search'

const Wrapper = styled.div`
  height: 2.5rem;
  margin-bottom: 1rem;
  position: relative;
  width: 100%;
`

export const displayAddress = (address: AddressType) =>
  `${address.properties.name ? address.properties.name + ' ' : ''}${
    address.properties.housenumber ? address.properties.housenumber + ' ' : ''
  }${address.properties.street ? address.properties.street + ', ' : ''}${
    address.properties.city ? address.properties.city + ' ' : ''
  } ${address.properties.country}`

export default function Address({
  id,
  placeholder,
  address,
  setPlace,
}: {
  id?: string
  placeholder: string
  address?: string
  setPlace: Dispatch<SetStateAction<Point | undefined>>
}) {
  return (
    <Wrapper data-testid={`Address-${placeholder}`} id={id}>
      <Search placeholder={placeholder} address={address} setAddress={setPlace} />
    </Wrapper>
  )
}
