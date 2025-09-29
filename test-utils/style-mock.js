// Mock CSS modules pour Jest
module.exports = new Proxy(
  {},
  {
    get: function getter(target, key) {
      if (key === '__esModule') {
        return false
      }
      return key
    },
  }
)
