// See https://stackoverflow.com/a/20392392/2595513
export function tryParseJSONObject(jsonString) {
  let result = {}
  try {
    var o = JSON.parse(jsonString)

    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // but... JSON.parse(null) returns null, and typeof null === "object",
    // so we must check for that, too. Thankfully, null is falsey, so this suffices:
    if (o && typeof o === 'object') {
      return o
    }
    // eslint-disable-next-line no-empty
  } catch (e) {
    result = {}
  }

  return result
}
