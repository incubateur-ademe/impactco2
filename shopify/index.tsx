import React, { render } from 'preact/compat'
import Shopify from '../src/components/externalModules/shopify/ShopifyEquivalent'

const shopify = React.createElement(Shopify, null)
render(shopify, document.getElementById('container') as HTMLElement)
