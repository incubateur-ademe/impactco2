import React from 'react'
import styled from 'styled-components'
import Search from './address/Search'

const Wrapper = styled.div`
  height: 2.5rem;
  margin-bottom: 1rem;
  position: relative;
  width: 100%;
`

export const displayAddress = (address) =>
  `${address.properties.name ? address.properties.name + ' ' : ''}${
    address.properties.housenumber ? address.properties.housenumber + ' ' : ''
  }${address.properties.street ? address.properties.street + ', ' : ''}${
    address.properties.city ? address.properties.city + ' ' : ''
  } ${address.properties.country}`

export default function Address(props) {
  return (
    <Wrapper>
      <Search
        placeholder={props.placeholder}
        address={props.address}
        setAddress={(address) => {
          props.setPlace({
            latitude: address.geometry.coordinates[1],
            longitude: address.geometry.coordinates[0],
            city: address.properties.city,
            address: displayAddress(address),
          })
        }}
      />
    </Wrapper>
  )
}
