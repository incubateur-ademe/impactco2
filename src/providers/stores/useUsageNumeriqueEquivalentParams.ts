import { useEmailStore } from './email'
import { useStreamingStore } from './streaming'
import { useVisioStore } from './visio'

const useUsageNumeriqueEquivalentParams = () => {
  const visio = useVisioStore()
  const streaming = useStreamingStore()
  const email = useEmailStore()
  return { visio, streaming, email }
}

export default useUsageNumeriqueEquivalentParams
