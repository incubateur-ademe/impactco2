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
  placeholder,
  address,
  setPlace,
}: {
  placeholder: string
  address?: string
  setPlace: Dispatch<SetStateAction<Point | undefined>>
}) {
  return (
    <Wrapper data-testid={`Address-${placeholder}`}>
      <Search
        placeholder={placeholder}
        address={address}
        setAddress={(address: AddressType) => {
          setPlace({
            latitude: address.geometry.coordinates[1],
            longitude: address.geometry.coordinates[0],
            city: address.properties.city || address.properties.name || '',
            address: displayAddress(address),
          })
        }}
      />
    </Wrapper>
  )
}
