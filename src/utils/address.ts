import { Address as AddressType } from 'types/address'
import { searchAddress } from 'hooks/useAddress'
import { Point } from 'hooks/useItineraries'

export const displayAddress = (address: AddressType) => {
  if (!address) {
    return ''
  }

  // an address can have multiple postcode, display the first
  const postcode = (address.properties.postcode || '').split(';')
  const { name, housenumber, street, city, country } = address.properties
  return [name, housenumber, street, city, postcode[0], country].filter((value) => value).join(' ')
}

export const completeAddress = (setter: (point: Point | undefined) => void, value?: string) => {
  if (value) {
    searchAddress(value, 1).then((result) => {
      if (result.length > 0) {
        const address = result[0]
        setter({
          latitude: address.geometry.coordinates[1],
          longitude: address.geometry.coordinates[0],
          city: address.properties.city,
          address: displayAddress(address),
        })
      }
    })
  }
}
