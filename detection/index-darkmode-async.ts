import { initMatomo, start } from './start'

initMatomo()

// @ts-expect-error: adding on purpose
window.impactCO2Detection = () => start(true)
