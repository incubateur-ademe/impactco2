import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Search from './address/Search'
import { useAddress } from 'hooks/useAddress'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 2.5rem;
  margin-bottom: 1rem;
`
export default function Address(props) {
  const [placeId, setPlaceId] = useState()
  const { data } = useAddress(placeId)
  const setPlace = props.setPlace
  useEffect(() => {
    data?.result?.geometry?.location &&
      setPlace({
        latitude: data.result.geometry.location.lat,
        longitude: data.result.geometry.location.lng,
        address: data.result.formatted_address,
      })
  }, [data, setPlace])

  return (
    <Wrapper>
      <Search
        placeholder={props.placeholder}
        address={props.address}
        setAddress={(address) => {
          setPlaceId(address?.place_id)
        }}
      />
    </Wrapper>
  )
}
