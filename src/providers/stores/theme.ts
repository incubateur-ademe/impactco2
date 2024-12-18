import { create } from 'zustand'

interface States {
  theme: string
  setTheme: (theme: string) => void
}

export const useThemeStore = create<States>((set) => ({
  theme: 'fr',
  setTheme: (theme) => set(() => ({ theme })),
}))

useThemeStore.subscribe((state) => {
  if (state.theme === 'night') {
    document.body.classList.add('night')
  } else {
    document.body.classList.remove('night')
  }
})
