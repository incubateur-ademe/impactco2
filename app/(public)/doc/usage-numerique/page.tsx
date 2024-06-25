import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Documentation des Usages du numérique | Impact CO₂',
  description: "Documentation du simulateur usage numérique d'Impact CO₂.",
  openGraph: {
    creators: 'ADEME',
    images: `${process.env.NEXT_PUBLIC_URL}/meta/usagenumerique.png`,
  },
}

export default function Documentation() {
  redirect('/doc/usage-numerique/acv')
}
