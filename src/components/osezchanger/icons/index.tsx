import arrowDown from './arrow-down'
import arrowLeft from './arrow-left'
import arrowRight from './arrow-right'
import check from './check'
import close from './close'
import closeThick from './close-thick'
import codeSSlash from './code-s-slash'
import copy from './copy'
import download from './download'
import dropdownArrowDown from './dropdown-arrow-down'
import dropdownArrowRight from './dropdown-arrow-right'
import dropdownArrowUp from './dropdown-arrow-up'
import error from './error'
import facebook from './facebook'
import fullArrowRight from './full-arrow-right'
import fullStar from './full-star'
import image from './image'
import infinity from './infinity'
import information from './information'
import informationFill from './information-fill'
import link from './link'
import linkedin from './linkedin'
import magicWand from './magic-wand'
import minus from './minus'
import plus from './plus'
import refresh from './refresh'
import sendPlane from './send-plane'
import sprinkles from './sprinkles'
import star from './star'
import twitter from './twitter'
import whatsapp from './whatsapp'

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
  | 'star'
  | 'full-star'
  | 'check'
  | 'error'
  | 'refresh'
  | 'image'
  | 'link'
  | 'infinity'

export const Icon = ({ iconId }: { iconId: IconId }) => {
  switch (iconId) {
    case 'infinity':
      return infinity
    case 'link':
      return link
    case 'image':
      return image
    case 'refresh':
      return refresh
    case 'magic-wand':
      return magicWand
    case 'code-s-slash':
      return codeSSlash
    case 'send-plane':
      return sendPlane
    case 'download':
      return download
    case 'information':
      return information
    case 'information-fill':
      return informationFill
    case 'sprinkles':
      return sprinkles
    case 'close':
      return close
    case 'close-thick':
      return closeThick
    case 'arrow-left':
      return arrowLeft
    case 'arrow-right':
      return arrowRight
    case 'full-arrow-right':
      return fullArrowRight
    case 'arrow-down':
      return arrowDown
    case 'dropdown-arrow-up':
      return dropdownArrowUp
    case 'dropdown-arrow-down':
      return dropdownArrowDown
    case 'dropdown-arrow-right':
      return dropdownArrowRight
    case 'copy':
      return copy
    case 'facebook':
      return facebook
    case 'twitter':
      return twitter
    case 'linkedin':
      return linkedin
    case 'whatsapp':
      return whatsapp
    case 'plus':
      return plus
    case 'minus':
      return minus
    case 'check':
      return check
    case 'error':
      return error
    case 'star':
      return star
    case 'full-star':
      return fullStar
    default:
      return null
  }
}
