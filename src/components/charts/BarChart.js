import React from 'react'
import { Flipped, Flipper } from 'react-flip-toolkit'
import Item from './barChart/Item'

export default function BarChart(props) {
  return (
    <Flipper className={props.className} flipKey={props.items.map((item) => item.id).join()}>
      {props.items.map((item) => (
        <Flipped flipId={item.id} key={item.id}>
          <Item
            key={item.id}
            onClick={item.onClick}
            to={item.to}
            title={item.title}
            subtitle={item.subtitle}
            emoji={item.emoji}
            secondEmoji={item.secondEmoji}
            color={item.color}
            value={item.value}
            usage={item.usage}
            component={item.component}
            max={props.max}
          />
        </Flipped>
      ))}
    </Flipper>
  )
}
