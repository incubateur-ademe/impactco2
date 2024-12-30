import { create } from 'zustand'

interface States {
  theme: string
  setTheme: (theme: string) => void
}

export const useThemeStore = create<States>((set) => ({
  theme: 'default',
  setTheme: (theme) => set((state) => (state.theme === theme ? state : { theme })),
}))

useThemeStore.subscribe((state) => {
  if (state.theme === 'night') {
    document.body.classList.add('night')
  } else {
    document.body.classList.remove('night')
  }
})
