export const getRevalidate = (key: string | undefined) => {
  const revalidate = key && Number.parseInt(key)
  return revalidate && !Number.isNaN(revalidate) ? revalidate : 1
}
