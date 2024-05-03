import { NextResponse } from 'next/server'
import { doc } from 'components/swagger/utils'

export async function GET() {
  return NextResponse.json(doc, { status: 200 })
}
