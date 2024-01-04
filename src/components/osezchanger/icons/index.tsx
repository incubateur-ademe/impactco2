import arrowDown from './arrow-down'
import arrowLeft from './arrow-left'
import arrowRight from './arrow-right'
import check from './check'
import close from './close'
import codeSSlash from './code-s-slash'
import copy from './copy'
import download from './download'
import dropdownArrowRight from './dropdown-arrow-right'
import error from './error'
import facebook from './facebook'
import fullArrowRight from './full-arrow-right'
import fullStar from './full-star'
import information from './information'
import linkedin from './linkedin'
import minus from './minus'
import plus from './plus'
import sendPlane from './send-plane'
import sprinkles from './sprinkles'
import star from './star'
import twitter from './twitter'
import whatsapp from './whatsapp'

export type IconId =
  | 'code-s-slash'
  | 'send-plane'
  | 'download'
  | 'information'
  | 'sprinkles'
  | 'close'
  | 'arrow-left'
  | 'arrow-right'
  | 'full-arrow-right'
  | 'arrow-down'
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

export const Icon = ({ iconId }: { iconId: IconId }) => {
  switch (iconId) {
    case 'code-s-slash':
      return codeSSlash
    case 'send-plane':
      return sendPlane
    case 'download':
      return download
    case 'information':
      return information
    case 'sprinkles':
      return sprinkles
    case 'close':
      return close
    case 'arrow-left':
      return arrowLeft
    case 'arrow-right':
      return arrowRight
    case 'full-arrow-right':
      return fullArrowRight
    case 'arrow-down':
      return arrowDown
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
