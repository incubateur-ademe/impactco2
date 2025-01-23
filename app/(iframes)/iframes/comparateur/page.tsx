import Comparateur from 'components/outils/comparateur/Comparateur'
import { getDefaultParams } from 'utils/params'

const page = async (props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const defaultParams = getDefaultParams(await props.searchParams)
  return <Comparateur defaultParams={defaultParams.comparateur} />
}

export default page
