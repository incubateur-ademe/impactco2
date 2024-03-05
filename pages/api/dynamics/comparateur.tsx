import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import Comparateur from 'components/metaImages/Comparateur'

export const config = {
  runtime: 'edge',
}

const getFont = async (url: URL) => {
  const res = await fetch(url)
  return await res.arrayBuffer()
}

export default async function handler(req: NextRequest) {
  return new ImageResponse(
    (
      <Comparateur
        value={Number(req.nextUrl.searchParams.get('value') || '100') * 1000}
        comparisons={(req.nextUrl.searchParams.get('comparisons') || 'ananas').split(',')}
      />
    ),
    {
      width: 1200,
      height: 630,
      emoji: 'twemoji',
      fonts: [
        {
          name: 'Marianne',
          data: await getFont(new URL('../../../public/fonts/Marianne-Regular.woff', import.meta.url)),
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Marianne',
          data: await getFont(new URL('../../../public/fonts/Marianne-Medium.woff', import.meta.url)),
          style: 'normal',
          weight: 500,
        },
        {
          name: 'Marianne',
          data: await getFont(new URL('../../../public/fonts/Marianne-Bold.woff', import.meta.url)),
          style: 'normal',
          weight: 700,
        },
        {
          name: 'Marianne',
          data: await getFont(new URL('../../../public/fonts/Marianne-ExtraBold.woff', import.meta.url)),
          style: 'normal',
          weight: 900,
        },
      ],
    }
  )
}
