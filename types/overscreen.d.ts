export type OverScreenInfo = {
  title: string
  hideTitle?: boolean
  hideFooter?: boolean
  noHeaderSeparator?: boolean
  bottomButtonLabel?: string
  image?: string
  children: ReactNode
  fullHeight?: boolean
  onClose?: () => void
}
