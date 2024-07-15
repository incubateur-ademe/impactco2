import { initMatomo, start } from './start'

initMatomo()
start(true)
setTimeout(() => start(true), 2000)
