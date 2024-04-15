import { notFound } from 'next/navigation'
import React from 'react'
import Outil from 'components/outils/Outil'
import { devTools, smallTools } from 'components/cards/tools'
import Suggestion from 'components/layout/web/Suggestion'

const tools = [...devTools, ...smallTools]
export async function generateStaticParams() {
  return tools.map((tool) => ({
    tool: tool.slug,
  }))
}

const OutilPage = async ({ params }: { params: { tool: string } }) => {
  const tool = tools.find((tool) => tool.slug === params.tool)
  if (!tool) {
    return notFound()
  }
  return (
    <>
      <Outil tool={tool} />
      <Suggestion from={`/outils/${tool.slug}`} fromLabel={tool.title} simulatorName={tool.title} />
    </>
  )
}

export default OutilPage
