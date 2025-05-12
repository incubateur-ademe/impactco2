export type OverScreenInfo = {
  title: string
  hideTitle?: boolean
  image?: string
  children: ReactNode
  fullHeight?: boolean
  cancel?: (onClose: () => void) => ReactNode
}
