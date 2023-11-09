import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'

export function useItinerary(start, end, mode) {
  return useQuery({
    queryKey: ['car', start, end, mode],
    queryFn: () =>
      axios
        .get(
          `/api/callGMap?destinations=${start.latitude}%2C${start.longitude}&origins=${end.latitude}%2C${end.longitude}&mode=${mode}`
        )
        .then((res) => res.data.rows),
    enabled: start.latitude && end.latitude && mode ? true : false,
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })
}

export default function useItineraries(start, end) {
  const { data: carItineraries } = useItinerary(start, end, 'driving')
  const { data: footItineraries } = useItinerary(start, end, 'walking')
  const { data: railItineraries } = useItinerary(start, end, 'transit')
  const [planeDistance, setPlaneDistance] = useState(0)
  useEffect(() => {
    if (start && end) {
      const R = 6371e3 // metres
      const φ1 = (start.latitude * Math.PI) / 180 // φ, λ in radians
      const φ2 = (end.latitude * Math.PI) / 180
      const Δφ = ((end.latitude - start.latitude) * Math.PI) / 180
      const Δλ = ((end.longitude - start.longitude) * Math.PI) / 180

      const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

      setPlaneDistance(R * c)
    }
  }, [start, end])

  const [datas, setDatas] = useState({ car: 0, foot: 0, rail: 0, plane: 0 })
  useEffect(() => {
    setDatas({
      car:
        carItineraries &&
        carItineraries[0].elements[0].status === 'OK' &&
        carItineraries[0].elements[0].distance.value / 1000,
      foot:
        footItineraries &&
        footItineraries[0].elements[0].status === 'OK' &&
        footItineraries[0].elements[0].distance.value / 1000,
      rail:
        railItineraries &&
        (railItineraries[0].elements[0].status === 'OK'
          ? railItineraries[0].elements[0].distance.value / 1000
          : carItineraries &&
            carItineraries[0].elements[0].status === 'OK' &&
            carItineraries[0].elements[0].distance.value / 1000),
      plane: planeDistance / 1000,
    })
  }, [carItineraries, footItineraries, railItineraries, planeDistance])

  return datas
}
