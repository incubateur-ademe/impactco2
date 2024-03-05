import { GetServerSideProps } from 'next'
import React from 'react'
import Page from 'components/comparateur/Page'

const Convertisseur = ({ resolvedUrl }: { resolvedUrl: string }) => {
  return <Page resolvedUrl={resolvedUrl} />
}

export const getServerSideProps: GetServerSideProps<{ resolvedUrl: string }> = async (context) => {
  return { props: { resolvedUrl: context.resolvedUrl } }
}

export default Convertisseur
