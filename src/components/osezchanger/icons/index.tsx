import codeSSlash from './code-s-slash'
import download from './download'
import information from './information'
import sendPlane from './send-plane'
import sprinkles from './sprinkles'

export type IconId = 'code-s-slash' | 'send-plane' | 'download' | 'information' | 'sprinkles'

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
    default:
      return null
  }
}
