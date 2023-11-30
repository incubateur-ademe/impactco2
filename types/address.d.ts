export type Address = {
  geometry: {
    coordinates: [number, number]
  }
  properties: {
    osm_id: number
    country: string
    city: string
    type: string
    postcode?: string
    name?: string
    housenumber?: string
    street?: string
  }
}
