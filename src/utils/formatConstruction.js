export default function formatConstruction(equivalent) {
  return equivalent.total || equivalent.total === 0
    ? equivalent.total
    : equivalent.ecv.reduce((acc, cur) => acc + ([1, 2, 3, 4, 5].includes(cur.id) ? cur.value : 0), 0)
}
