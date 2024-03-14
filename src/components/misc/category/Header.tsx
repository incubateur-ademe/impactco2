import React from 'react'
import { Category } from 'types/category'
import { TransportSimulateur } from 'types/transport'
import PageTitle from 'components/base/PageTitle'
import { CustomParamValue } from './CustomParam'
import { Container } from './Header.styles'
import HeadersActions from './HeadersActions'

const Header = ({
  category,
  path,
  params,
  extraParams,
  takeScreenshot,
  tracking,
  type,
  title,
  withoutIntegration,
  name,
  withoutShare,
  noActions,
}: {
  category?: Category
  params?: Record<string, CustomParamValue>
  extraParams?: string
  takeScreenshot: () => void
  tracking: string
  type?: TransportSimulateur
  path?: string
  title?: string
  withoutIntegration?: boolean
  withoutShare?: boolean
  name?: string
  noActions?: boolean
}) => {
  return (
    <Container>
      {category ? (
        <PageTitle
          title={
            <>
              Sensibiliser à l'impact <span className='text-secondary'>{category.header} sur le climat</span>
            </>
          }
          description={category.description}
        />
      ) : (
        title && <PageTitle title={title} />
      )}
      {!noActions && (
        <HeadersActions
          category={category}
          path={path}
          params={params}
          extraParams={extraParams}
          takeScreenshot={takeScreenshot}
          tracking={tracking}
          type={type}
          withoutIntegration={withoutIntegration}
          name={name}
          withoutShare={withoutShare}
        />
      )}
    </Container>
  )
}

export default Header
