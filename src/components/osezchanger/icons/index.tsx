import dynamic from 'next/dynamic'
import React from 'react'

export type IconId =
  | 'magic-wand'
  | 'code-s-slash'
  | 'send-plane'
  | 'download'
  | 'information'
  | 'information-fill'
  | 'sprinkles'
  | 'close-thick'
  | 'close'
  | 'arrow-left'
  | 'arrow-right'
  | 'full-arrow-right'
  | 'arrow-down'
  | 'dropdown-arrow-up'
  | 'dropdown-arrow-down'
  | 'dropdown-arrow-right'
  | 'copy'
  | 'facebook'
  | 'twitter'
  | 'linkedin'
  | 'whatsapp'
  | 'plus'
  | 'minus'
  | 'open'
  | 'star'
  | 'full-star'
  | 'check'
  | 'error'
  | 'image'
  | 'link'
  | 'infinity'

const InfinityIcon = dynamic(() => import('./infinity'))
const Link = dynamic(() => import('./link'))
const Image = dynamic(() => import('./image'))
const MagicWand = dynamic(() => import('./magic-wand'))
const CodeSSlash = dynamic(() => import('./code-s-slash'))
const SendPlane = dynamic(() => import('./send-plane'))
const Download = dynamic(() => import('./download'))
const Information = dynamic(() => import('./information'))
const InformationFill = dynamic(() => import('./information-fill'))
const Sprinkles = dynamic(() => import('./sprinkles'))
const Close = dynamic(() => import('./close'))
const CloseThick = dynamic(() => import('./close-thick'))
const ArrowLeft = dynamic(() => import('./arrow-left'))
const ArrowRight = dynamic(() => import('./arrow-right'))
const FullArrowRight = dynamic(() => import('./full-arrow-right'))
const ArrowDown = dynamic(() => import('./arrow-down'))
const DropdownArrowUp = dynamic(() => import('./dropdown-arrow-up'))
const DropdownArrowDown = dynamic(() => import('./dropdown-arrow-down'))
const DropdownArrowRight = dynamic(() => import('./dropdown-arrow-right'))
const Copy = dynamic(() => import('./copy'))
const Facebook = dynamic(() => import('./facebook'))
const Twitter = dynamic(() => import('./twitter'))
const Linkedin = dynamic(() => import('./linkedin'))
const Whatsapp = dynamic(() => import('./whatsapp'))
const Plus = dynamic(() => import('./plus'))
const Open = dynamic(() => import('./open'))
const Minus = dynamic(() => import('./minus'))
const Check = dynamic(() => import('./check'))
const Error = dynamic(() => import('./error'))
const Star = dynamic(() => import('./star'))
const FullStar = dynamic(() => import('./full-star'))

export const Icon = ({ iconId }: { iconId: IconId }) => {
  switch (iconId) {
    case 'infinity':
      return <InfinityIcon />
    case 'link':
      return <Link />
    case 'image':
      return <Image />
    case 'magic-wand':
      return <MagicWand />
    case 'code-s-slash':
      return <CodeSSlash />
    case 'send-plane':
      return <SendPlane />
    case 'download':
      return <Download />
    case 'information':
      return <Information />
    case 'information-fill':
      return <InformationFill />
    case 'sprinkles':
      return <Sprinkles />
    case 'close':
      return <Close />
    case 'close-thick':
      return <CloseThick />
    case 'arrow-left':
      return <ArrowLeft />
    case 'arrow-right':
      return <ArrowRight />
    case 'full-arrow-right':
      return <FullArrowRight />
    case 'arrow-down':
      return <ArrowDown />
    case 'dropdown-arrow-up':
      return <DropdownArrowUp />
    case 'dropdown-arrow-down':
      return <DropdownArrowDown />
    case 'dropdown-arrow-right':
      return <DropdownArrowRight />
    case 'copy':
      return <Copy />
    case 'facebook':
      return <Facebook />
    case 'twitter':
      return <Twitter />
    case 'linkedin':
      return <Linkedin />
    case 'whatsapp':
      return <Whatsapp />
    case 'plus':
      return <Plus />
    case 'open':
      return <Open />
    case 'minus':
      return <Minus />
    case 'check':
      return <Check />
    case 'error':
      return <Error />
    case 'star':
      return <Star />
    case 'full-star':
      return <FullStar />
    default:
      return null
  }
}
