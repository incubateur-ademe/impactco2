// Voir https://stackoverflow.com/a/20392392/2595513
// Converti une String en objet JSON
// Renvoi un objet vide si la conversion n'est pas possible
// Est utile dans les tests, pour éviter de trop charger la partie des assertions
export function tryParseJSONObject(jsonString) {
  let result = {}
  try {
    var o = JSON.parse(jsonString)

    if (o && typeof o === 'object') {
      return o
    }
    // eslint-disable-next-line no-empty
  } catch (e) {
    result = {}
  }

  return result
}
