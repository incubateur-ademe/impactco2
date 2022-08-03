import React from 'react'
import { Flipper, Flipped } from 'react-flip-toolkit'

import Item from './barChart/Item'

export default function BarChart(props) {
  return (
    <Flipper flipKey={props.items.map((item) => item.id).join()}>
      {props.items.map((item) => (
        <Flipped flipId={item.id} key={item.id}>
          <Item
            onClick={item.onClick}
            to={item.to}
            title={item.title}
            subtitle={item.subtitle}
            emoji={item.emoji}
            color={item.color}
            value={item.value}
            max={props.max}
          />
        </Flipped>
      ))}
    </Flipper>
  )
}
