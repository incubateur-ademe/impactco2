import { useState, useEffect, useContext } from 'react'

import {
  formatName,
  formatNumber,
  formatTotal,
  formatUsage,
} from 'utils/formatters'
import DataContext from 'components/providers/DataProvider'
import TransportContext from 'components/transport/TransportProvider'
import Carpool from 'components/transport/Carpool'

export default function useTransportations(itineraries) {
  const [transportations, setTransportations] = useState([])

  const { equivalents, categories } = useContext(DataContext)

  const { km, displayAll, carpool } = useContext(TransportContext)

  useEffect(() => {
    setTransportations(
      equivalents
        .filter((equivalent) => equivalent.category === 4)
        .filter((equivalent) =>
          itineraries ? itineraries[equivalent.type] : km
        )
        .filter((equivalent) => equivalent.default || displayAll)
        .reduce(
          (acc, cur) =>
            cur.carpool
              ? [
                  ...acc,
                  cur,
                  { ...cur, id: cur.slug + '_nocarpool', carpool: false },
                ]
              : [...acc, cur],
          []
        )
        .filter((equivalent) => carpool || !equivalent.carpool)
        .filter(
          (equivalent) =>
            // Display all transportations
            displayAll ||
            // No display indicator at all
            !equivalent.display ||
            // Empty display indicator
            (!equivalent.display.min && !equivalent.display.max) ||
            //Only max
            (!equivalent.display.min &&
              equivalent.display.max >=
                (itineraries ? itineraries[equivalent.type] : km)) ||
            //Only min
            (!equivalent.display.max &&
              equivalent.display.min <=
                (itineraries ? itineraries[equivalent.type] : km)) ||
            //Both min and max
            (equivalent.display.min <=
              (itineraries ? itineraries[equivalent.type] : km) &&
              equivalent.display.max >=
                (itineraries ? itineraries[equivalent.type] : km))
        )
        .map((equivalent) => ({
          id: `${equivalent.id || equivalent.slug}`,
          title: `${formatName(equivalent.name.fr, 1, true)}`,
          subtitle:
            `${
              (displayAll || equivalent.name.fr === 'Voiture') &&
              equivalent.subtitle
                ? `(${formatName(equivalent.subtitle?.fr)})`
                : ''
            }` +
            (itineraries
              ? ` - ${formatNumber(
                  itineraries ? itineraries[equivalent.type] : km
                )} km`
              : ''),
          emoji: equivalent.emoji,
          secondEmoji: equivalent.secondEmoji,
          value:
            (formatTotal(equivalent) *
              (itineraries ? itineraries[equivalent.type] : km)) /
            (equivalent.carpool && carpool ? carpool : 1),
          usage:
            (formatUsage(equivalent) *
              (itineraries ? itineraries[equivalent.type] : km)) /
            (equivalent.carpool && carpool ? carpool : 1),
          component: equivalent.carpool && <Carpool />,
          to: `/categories/${
            categories.find((category) => category.id === equivalent.category)
              .slug
          }/${equivalent.slug}`,
          onClick: () =>
            window?._paq?.push([
              'trackEvent',
              'Interaction',
              'Navigation via graph categorie',
              equivalent.slug,
            ]),
        }))
        .sort((a, b) => (a.value > b.value ? 1 : -1))
    )
  }, [km, displayAll, carpool, itineraries])
  return transportations
}
