/*eslint-disable eqeqeq*/

import { useQuery, useMutation } from 'react-query'
import axios from 'axios'
import useDebounce from 'hooks/useDebounce'

export function useWaste() {
  return useQuery(
    ['waste'],
    () =>
      axios
        .get(
          `https://data.ademe.fr/data-fair/api/v1/datasets/que-faire-de-mes-dechets-produits/lines?format=json&q_mode=simple&size=1000&select=Nom%2CSynonymes_existants&sampling=neighbors`
        )
        .then((res) => res.data.results)

        .then((res) => {
          let tempWaste = [...res]

          for (let result of res) {
            if (result['Synonymes_existants']) {
              const synonyms = result['Synonymes_existants'].split(' / ')
              for (let i = 0; i < synonyms.length; i++) {
                if (!tempWaste.find((waste) => waste['Nom'] === synonyms[i])) {
                  tempWaste.push({
                    ...result,
                    Nom: synonyms[i],
                    parent: result['Nom'],
                  })
                }
              }
            }
          }

          return tempWaste.map((waste) => ({
            ...waste,
            searchable: waste['Nom']
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, ''),
            slug: waste[`Nom`]
              .toLowerCase()
              .replaceAll(' ', '-')
              .replaceAll(`'`, '-')
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, ''),
          }))
        }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )
}
export function useSuggestions(suggestions) {
  return useQuery(
    ['suggestions', suggestions],
    () =>
      axios
        .get(
          `https://data.ademe.fr/data-fair/api/v1/datasets/que-faire-de-mes-dechets-produits/lines?format=json&q_mode=simple&ID_in=${suggestions.join()}&sampling=neighbors&select=Nom`
        )
        .then((res) => res.data.results)
        .then((results) =>
          results.map((result) => ({
            ...result,
            slug: result[`Nom`]
              .toLowerCase()
              .replaceAll(' ', '-')
              .replaceAll(`'`, '-')
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, ''),
          }))
        ),
    {
      enabled: suggestions ? true : false,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )
}
export function useSearch(search) {
  return useQuery(
    ['search', search],
    () =>
      search && search.length > 2
        ? axios
            .get(
              `https://api-adresse.data.gouv.fr/search/?q=${search}&type=housenumber`
            )
            .then((res) => res.data.features)
        : Promise.resolve([]),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )
}
export function usePosition(position) {
  return useQuery(
    ['position', position?.timestamp],
    () =>
      axios
        .get(
          `https://api-adresse.data.gouv.fr/reverse/?lon=${position.coords.longitude}&lat=${position.coords.latitude}`
        )
        .then((res) => res.data),
    {
      enabled: position ? true : false,
      refetchOnWindowFocus: false,
    }
  )
}
export function usePlaces(center, zoom, product) {
  const debouncedCenter = useDebounce(center)

  const zoomedEnough = zoom > 10

  const {
    data: decheteries,
    isLoading: isLoadingDecheteries,
    isFetching: isFetchingDecheteries,
  } = useQuery(['decheteries', debouncedCenter], fetchDecheteries, {
    enabled: product['Bdd'] === 'sinoe' && zoomedEnough ? true : false,
    keepPreviousData: product['Bdd'] === 'sinoe' && zoomedEnough ? true : false,
    refetchOnWindowFocus: false,
  })

  const {
    data: pharmacies,
    isLoading: isLoadingPharmacies,
    isFetching: isFetchingPharmacies,
  } = useQuery(['pharmacies', debouncedCenter], fetchPharmacies, {
    enabled:
      (product['Bdd'] === 'google' || product['Code'] === 'ADEME_DASRI') &&
      zoomedEnough
        ? true
        : false,
    keepPreviousData:
      (product['Bdd'] === 'google' || product['Code'] === 'ADEME_DASRI') &&
      zoomedEnough
        ? true
        : false,
    refetchOnWindowFocus: false,
  })

  const {
    data: ocad3e,
    isLoading: isLoadingOcad3e,
    isFetching: isFetchingOcad3e,
  } = useQuery(['ocad3e', debouncedCenter, product['Code']], fetchOcad3e, {
    enabled: product['Bdd'] === 'ocad3e' && zoomedEnough ? true : false,
    keepPreviousData:
      product['Bdd'] === 'ocad3e' && zoomedEnough ? true : false,
    refetchOnWindowFocus: false,
  })

  return {
    data: [...(decheteries || []), ...(pharmacies || []), ...(ocad3e || [])],
    isLoading: isLoadingDecheteries || isLoadingPharmacies || isLoadingOcad3e,
    isFetching:
      isFetchingDecheteries || isFetchingPharmacies || isFetchingOcad3e,
  }
}
const fetchDecheteries = ({ queryKey }) =>
  axios
    .get(
      `https://data.ademe.fr/data-fair/api/v1/datasets/greatersinoe-(r)-annuaire-2017-des-decheteries-de-dechets-menagers-et-assimiles-(dma)/lines?format=json&q_mode=simple&geo_distance=${
        queryKey[1][1]
      }%2C${
        queryKey[1][0]
      }%2C${15000}&size=1000&sampling=neighbors&select=Nom_Déchèterie,Adresse_Déchèterie,Code_postal_Déchèterie,Commune_Déchèterie,_id,_geopoint`
    )
    .then((res) =>
      res.data.results.map((place) => ({
        id: place['_id'],
        latitude: Number(place['_geopoint'].split(',')[0]),
        longitude: Number(place['_geopoint'].split(',')[1]),
        title: place['Nom_Déchèterie'].replaceAll(' ', ' '),
        address: `${place['Adresse_Déchèterie'].replaceAll(' ', ' ')}
                      <br />
                      ${place['Code_postal_Déchèterie']} 
                      ${place['Commune_Déchèterie'].replaceAll(' ', ' ')}`,
      }))
    )

/*const fetchPharmacies = ({ queryKey }) =>
  axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/pharmacie.json?proximity=${queryKey[1][1]},${queryKey[1][0]}&language=fr&access_token=${process.env.GATSBY_MAPBOX_API_TOKEN}&limit=10`
    )
    .then((res) =>
      res.data.features.map((place) => ({
        id: place['id'],
        latitude: place['center'][1],
        longitude: place['center'][0],
        title: place['text_fr'],
        address: place['place_name_fr'].replace(place['text_fr'] + ', ', ''),
      }))
    )*/

const fetchPharmacies = ({ queryKey }) =>
  axios
    .get(
      `https://quefairedemesdechets.netlify.app/.netlify/functions/callGMap?latitude=${queryKey[1][0]}&longitude=${queryKey[1][1]}`
    )
    .then((res) =>
      res.data.results.map((place) => ({
        id: place['place_id'],
        latitude: place['geometry']['location']['lat'],
        longitude: place['geometry']['location']['lng'],
        title: place['name'],
        address: place['vicinity'],
      }))
    )

const fetchOcad3e = ({ queryKey }) =>
  axios
    .get(
      `https://quefairedemesdechets.netlify.app/.netlify/functions/callOcad3e?latitude=${queryKey[1][0]}&longitude=${queryKey[1][1]}&category=${queryKey[2]}`
    )
    .then((res) =>
      res.data.placemarks
        .map((place) => ({
          id:
            place['name'] +
            place['position']['lat'] +
            place['position']['lng'] +
            String(Math.random()),
          latitude: Number(place['position']['lat']),
          longitude: Number(place['position']['lng']),
          distance: Number(place['position']['distance']),
          title: place['name'],
          hours: place['details']['timeTable'],
          address: `${place['address']['address1']}
                      <br />
                      ${place['address']['postalCode']} 
                      ${place['address']['city']}`,
        }))
        .sort((a, b) => (a.distance > b.distance ? 1 : -1))
    )

export function useRebuildSite() {
  return useMutation(() =>
    axios.post(`https://api.netlify.com/build_hooks/615189df8b8ed42b27ae36d7`)
  )
}
