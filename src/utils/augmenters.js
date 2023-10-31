Object.assign(String.prototype, {
  amongst(array) {
    return Array.isArray(array) && array.includes(this.toString())
  },
})
