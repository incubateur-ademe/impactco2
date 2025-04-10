import Shareable from 'components/shareable/Shareable'
import { overScreenOsezChangerValues } from 'components/shareable/overScreens/Values'
import OsezChangerSimulator from './OsezChangerSimulator'

const OsezChanger = () => {
  const overScreens = overScreenOsezChangerValues()
  return (
    <Shareable slug='osez-changer' small tracking='OsezChanger' overScreens={overScreens}>
      <OsezChangerSimulator />
    </Shareable>
  )
}

export default OsezChanger
