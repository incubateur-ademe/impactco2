export function getMetaName(container: HTMLElement, metaName: string) {
  const metas = container.querySelectorAll('meta')
  for (let i = 0; i < metas.length; i += 1) {
    if (metas[i].getAttribute('name') === metaName) {
      return metas[i].getAttribute('content')
    }
  }
  return ''
}

export function getMetaProperty(container: HTMLElement, metaProperty: string) {
  const metas = container.querySelectorAll('meta')
  for (let i = 0; i < metas.length; i += 1) {
    if (metas[i].getAttribute('property') === metaProperty) {
      return metas[i].getAttribute('content')
    }
  }
  return ''
}
