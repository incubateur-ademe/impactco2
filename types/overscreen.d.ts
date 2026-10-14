export type OverScreenInfo = {
  title: string
  hideTitle?: boolean
  noHeaderSeparator?: boolean
  bottomButtonLabel?: string
  image?: string
  children: ReactNode
  fullHeight?: boolean
  cancel?: (onClose: () => void) => ReactNode
}
