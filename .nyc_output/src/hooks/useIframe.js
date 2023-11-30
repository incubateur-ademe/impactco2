__webpack_require__.r(__webpack_exports__)
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */ default: function () {
    return /* binding */ useIframe
  },
  /* harmony export */
})
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
  /*! react */ './node_modules/preact/compat/dist/compat.module.js'
)
var _s = $RefreshSig$()

function useIframe() {
  _s()
  const [iframe, setIframe] = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(false)
  ;(0, react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setIframe(window.location.pathname.includes('iframe'))
  }, [])
  return iframe
}
_s(useIframe, '3y//LgbIR9S9KAUcZNuGC8N3Kpg=')

// Wrapped in an IIFE to avoid polluting the global scope
;(function () {
  var _a, _b
  // Legacy CSS implementations will `eval` browser code in a Node.js context
  // to extract CSS. For backwards compatibility, we need to check we're in a
  // browser context before continuing.
  if (
    typeof self !== 'undefined' &&
    // AMP / No-JS mode does not inject these helpers:
    '$RefreshHelpers$' in self
  ) {
    // @ts-ignore __webpack_module__ is global
    var currentExports = module.exports
    // @ts-ignore __webpack_module__ is global
    var prevSignature =
      (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0
        ? _b
        : null
    // This cannot happen in MainTemplate because the exports mismatch between
    // templating and execution.
    self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id)
    // A module can be accepted automatically based on its exports, e.g. when
    // it is a Refresh Boundary.
    if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
      // Save the previous exports signature on update so we can compare the boundary
      // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
      module.hot.dispose(function (data) {
        data.prevSignature = self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports)
      })
      // Unconditionally accept an update to this module, we'll check if it's
      // still a Refresh Boundary later.
      // @ts-ignore importMeta is replaced in the loader
      module.hot.accept()
      // This field is set when the previous version of this module was a
      // Refresh Boundary, letting us know we need to check for invalidation or
      // enqueue an update.
      if (prevSignature !== null) {
        // A boundary can become ineligible if its exports are incompatible
        // with the previous exports.
        //
        // For example, if you add/remove/change exports, we'll want to
        // re-execute the importing modules, and force those components to
        // re-render. Similarly, if you convert a class component to a
        // function, we want to invalidate the boundary.
        if (
          self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(
            prevSignature,
            self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports)
          )
        ) {
          module.hot.invalidate()
        } else {
          self.$RefreshHelpers$.scheduleUpdate()
        }
      }
    } else {
      // Since we just executed the code for the module, it's possible that the
      // new exports made it ineligible for being a boundary.
      // We only care about the case when we were _previously_ a boundary,
      // because we already accepted this update (accidental side effect).
      var isNoLongerABoundary = prevSignature !== null
      if (isNoLongerABoundary) {
        module.hot.invalidate()
      }
    }
  }
})()
//# sourceURL=[module]
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaG9va3MvdXNlSWZyYW1lLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUEyQztBQUU1QixTQUFTRTs7SUFDdEIsTUFBTSxDQUFDQyxRQUFRQyxVQUFVLEdBQUdILCtDQUFRQSxDQUFDO0lBQ3JDRCxnREFBU0EsQ0FBQztRQUNSSSxVQUFVQyxPQUFPQyxRQUFRLENBQUNDLFFBQVEsQ0FBQ0MsUUFBUSxDQUFDO0lBQzlDLEdBQUcsRUFBRTtJQUVMLE9BQU9MO0FBQ1Q7R0FQd0JEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9ob29rcy91c2VJZnJhbWUuanM/ODAyMyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZUlmcmFtZSgpIHtcbiAgY29uc3QgW2lmcmFtZSwgc2V0SWZyYW1lXSA9IHVzZVN0YXRlKGZhbHNlKVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldElmcmFtZSh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuaW5jbHVkZXMoJ2lmcmFtZScpKVxuICB9LCBbXSlcblxuICByZXR1cm4gaWZyYW1lXG59XG4iXSwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJ1c2VJZnJhbWUiLCJpZnJhbWUiLCJzZXRJZnJhbWUiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwiaW5jbHVkZXMiXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=webpack-internal:///./src/hooks/useIframe.js
