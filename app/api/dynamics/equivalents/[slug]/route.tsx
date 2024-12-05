import { FontStyle, FontWeight } from 'next/dist/compiled/@vercel/og/satori'
import { ImageResponse } from 'next/og'
import { NextRequest, NextResponse } from 'next/server'
import { computedEquivalents } from 'src/providers/equivalents'
import { Category } from 'types/category'
import { categories } from 'data/categories'
import { getName } from 'utils/Equivalent/equivalent'
import Equivalent from 'components/metaImages/Equivalent'

export const runtime = 'edge'

const getFont = async (url: URL) => {
  const res = await fetch(url)
  return await res.arrayBuffer()
}

let fonts: { name: string; data: ArrayBuffer; style: FontStyle; weight: FontWeight }[] = []

export async function GET(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  if (process.env.NO_IMAGE === 'true') {
    return NextResponse.json(`Please use ${process.env.NEXT_PUBLIC_IMAGE_URL}`, { status: 400 })
  }

  const [slug, carpool] = decodeURIComponent((await context.params).slug).split('+')
  if (!slug) {
    return NextResponse.json('No slug specified', { status: 400 })
  }
  const equivalent = computedEquivalents.find((equivalent) => equivalent.slug === slug)
  if (!equivalent) {
    return NextResponse.json('Equivalent not found', { status: 400 })
  }

  const category = categories.find((category) => category.id === equivalent.category) as Category

  if (fonts.length === 0) {
    fonts = (
      await Promise.all([
        getFont(
          new URL('https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.12.1/dist/fonts/Marianne-Regular.woff', import.meta.url)
        ),
        getFont(
          new URL('https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.12.1/dist/fonts/Marianne-Medium.woff', import.meta.url)
        ),
        getFont(
          new URL('https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.12.1/dist/fonts/Marianne-Bold.woff', import.meta.url)
        ),
      ])
    ).map((font, index) => ({
      name: 'Marianne',
      data: font,
      style: 'normal',
      weight: index === 0 ? 400 : index === 1 ? 500 : index === 2 ? 700 : 900,
    }))
  }

  const { searchParams } = new URL(req.url)
  const language = searchParams.get('language') || 'fr'

  return new ImageResponse(
    (
      <Equivalent
        slug={equivalent.slug}
        carpool={!!carpool}
        name={getName(language, { ...equivalent, category: 0, carpool: Number(carpool) })}
        quantity={equivalent.value / ((Number(carpool) || 0) + 1)}
        unit={equivalent.unit || category.unit}
        language={language}
      />
    ),
    {
      width: 1200,
      height: 630,
      fonts,
    }
  )
}
