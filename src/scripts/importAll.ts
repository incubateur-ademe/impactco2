import 'dotenv/config'
import { importFAQsFromNotion } from './importFAQs'
import { importKitRSEFromNotion } from './importKitRSE'

const importAll = async () => {
  await importKitRSEFromNotion()
  await importFAQsFromNotion()
}

importAll()
