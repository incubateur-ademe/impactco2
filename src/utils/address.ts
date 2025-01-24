import { Address as AddressType } from 'types/address'

export const displayAddress = (address: AddressType) => {
  if (!address) {
    return ''
  }

  // an address can have multiple postcode, display the first
  const postcode = (address.properties.postcode || '').split(';')
  const { name, housenumber, street, city, country } = address.properties
  return [name, housenumber, street, city, postcode[0], country].filter((value) => value).join(' ')
}
