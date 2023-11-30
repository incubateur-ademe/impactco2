__webpack_require__.r(__webpack_exports__)
/* harmony import */ var _swc_helpers_tagged_template_literal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
  /*! @swc/helpers/_/_tagged_template_literal */ './node_modules/@swc/helpers/esm/_tagged_template_literal.js'
)
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
  /*! react/jsx-dev-runtime */ './node_modules/preact/compat/jsx-dev-runtime.mjs'
)
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
  /*! react */ './node_modules/preact/compat/dist/compat.module.js'
)
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
  /*! styled-components */ './node_modules/styled-components/dist/styled-components.browser.esm.js'
)

function _templateObject() {
  const data = (0, _swc_helpers_tagged_template_literal__WEBPACK_IMPORTED_MODULE_0__._)([
    '\n  overflow: hidden;\n  position: relative;\n',
  ])
  _templateObject = function () {
    return data
  }
  return data
}
function _templateObject1() {
  const data = (0, _swc_helpers_tagged_template_literal__WEBPACK_IMPORTED_MODULE_0__._)([
    "\n  background-image: url(\"data:image/svg+xml,%3Csvg width='72px' height='68px' viewBox='0 0 72 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='imgloop' transform='translate(5.000000, 5.000000)' stroke='%23B5ABB2' stroke-width='10'%3E%3Ccircle id='Oval' cx='25.5' cy='25.5' r='25.5'%3E%3C/circle%3E%3Cpath d='M47.5,43.5 L59.5415946,55.5415946' id='Line' stroke-linecap='square'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E\");\n  background-position: 96% 53%;\n  background-repeat: no-repeat;\n  background-size: 6%;\n  ",
    ' {\n    background-size: 4%;\n  }\n  ',
    ' {\n    background-size: 5%;\n  }\n  border: none;\n  color: ',
    ';\n  font-size: 1em;\n  font-weight: normal;\n  line-height: 1.25;\n  padding: 0.5em 1em;\n  width: 100%;\n\n  &::placeholder {\n    color: ',
    ';\n    opacity: 0.5;\n  }\n  &:focus {\n    outline: none;\n  }\n',
  ])
  _templateObject1 = function () {
    return data
  }
  return data
}

const Wrapper = styled_components__WEBPACK_IMPORTED_MODULE_3__['default'].div.withConfig({
  displayName: 'TextInputSmall__Wrapper',
  componentId: 'sc-6b6f3f3b-0',
})(_templateObject())
_c = Wrapper
const Input = styled_components__WEBPACK_IMPORTED_MODULE_3__['default'].input.withConfig({
  displayName: 'TextInputSmall__Input',
  componentId: 'sc-6b6f3f3b-1',
})(
  _templateObject1(),
  (props) => props.theme.mq.small,
  (props) => props.theme.mq.xsmall,
  (props) => props.theme.colors.text,
  (props) => props.theme.colors.text
)
_c1 = Input
/* harmony default export */ __webpack_exports__['default'] = /*#__PURE__*/ _c3 = react__WEBPACK_IMPORTED_MODULE_2__[
  'default'
].forwardRef(
  (_c2 = function TextInput(props, ref) {
    return /*#__PURE__*/ (0, react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(
      Wrapper,
      {
        children: /*#__PURE__*/ (0, react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(
          Input,
          {
            ref: ref,
            type: 'text',
            placeholder: props.placeholder,
            value: props.search,
            onChange: (e) => props.setSearch(e.target.value),
            onFocus: () => props.setFocus(true),
            onBlur: () => props.setFocus(false),
          },
          void 0,
          false,
          {
            fileName: '/home/david/workspace/impactco2/src/components/misc/search/searchBar/TextInputSmall.js',
            lineNumber: 39,
            columnNumber: 7,
          },
          this
        ),
      },
      void 0,
      false,
      {
        fileName: '/home/david/workspace/impactco2/src/components/misc/search/searchBar/TextInputSmall.js',
        lineNumber: 38,
        columnNumber: 5,
      },
      this
    )
  })
)
var _c, _c1, _c2, _c3
$RefreshReg$(_c, 'Wrapper')
$RefreshReg$(_c1, 'Input')
$RefreshReg$(_c2, '%default%$React.forwardRef')
$RefreshReg$(_c3, '%default%')

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9taXNjL3NlYXJjaC9zZWFyY2hCYXIvVGV4dElucHV0U21hbGwuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBeUI7QUFDYTtBQUV0QyxNQUFNRSxVQUFVRCw2REFBVTs7OztLQUFwQkM7QUFJTixNQUFNRSxRQUFRSCwrREFBWTs7O3VCQUt0QixDQUFDSyxRQUFVQSxNQUFNQyxLQUFLLENBQUNDLEVBQUUsQ0FBQ0MsS0FBSyxFQUcvQixDQUFDSCxRQUFVQSxNQUFNQyxLQUFLLENBQUNDLEVBQUUsQ0FBQ0UsTUFBTSxFQUl6QixDQUFDSixRQUFVQSxNQUFNQyxLQUFLLENBQUNJLE1BQU0sQ0FBQ0MsSUFBSSxFQVFoQyxDQUFDTixRQUFVQSxNQUFNQyxLQUFLLENBQUNJLE1BQU0sQ0FBQ0MsSUFBSTtNQXBCekNSO0FBNEJOLGtGQUFlSix3REFBZ0IsT0FBQyxTQUFTYyxVQUFVUixLQUFLLEVBQUVTLEdBQUc7SUFDM0QscUJBQ0UsOERBQUNiO2tCQUNDLDRFQUFDRTtZQUNDVyxLQUFLQTtZQUNMQyxNQUFLO1lBQ0xDLGFBQWFYLE1BQU1XLFdBQVc7WUFDOUJDLE9BQU9aLE1BQU1hLE1BQU07WUFDbkJDLFVBQVUsQ0FBQ0MsSUFBTWYsTUFBTWdCLFNBQVMsQ0FBQ0QsRUFBRUUsTUFBTSxDQUFDTCxLQUFLO1lBQy9DTSxTQUFTLElBQU1sQixNQUFNbUIsUUFBUSxDQUFDO1lBQzlCQyxRQUFRLElBQU1wQixNQUFNbUIsUUFBUSxDQUFDOzs7Ozs7Ozs7OztBQUlyQyxFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL21pc2Mvc2VhcmNoL3NlYXJjaEJhci9UZXh0SW5wdXRTbWFsbC5qcz81ZGIwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnXG5cbmNvbnN0IFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5gXG5jb25zdCBJbnB1dCA9IHN0eWxlZC5pbnB1dGBcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiZGF0YTppbWFnZS9zdmcreG1sLCUzQ3N2ZyB3aWR0aD0nNzJweCcgaGVpZ2h0PSc2OHB4JyB2aWV3Qm94PScwIDAgNzIgNjgnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayclM0UlM0NnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnJTNFJTNDZyBpZD0naW1nbG9vcCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoNS4wMDAwMDAsIDUuMDAwMDAwKScgc3Ryb2tlPSclMjNCNUFCQjInIHN0cm9rZS13aWR0aD0nMTAnJTNFJTNDY2lyY2xlIGlkPSdPdmFsJyBjeD0nMjUuNScgY3k9JzI1LjUnIHI9JzI1LjUnJTNFJTNDL2NpcmNsZSUzRSUzQ3BhdGggZD0nTTQ3LjUsNDMuNSBMNTkuNTQxNTk0Niw1NS41NDE1OTQ2JyBpZD0nTGluZScgc3Ryb2tlLWxpbmVjYXA9J3NxdWFyZSclM0UlM0MvcGF0aCUzRSUzQy9nJTNFJTNDL2clM0UlM0Mvc3ZnJTNFXCIpO1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiA5NiUgNTMlO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICBiYWNrZ3JvdW5kLXNpemU6IDYlO1xuICAkeyhwcm9wcykgPT4gcHJvcHMudGhlbWUubXEuc21hbGx9IHtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDQlO1xuICB9XG4gICR7KHByb3BzKSA9PiBwcm9wcy50aGVtZS5tcS54c21hbGx9IHtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDUlO1xuICB9XG4gIGJvcmRlcjogbm9uZTtcbiAgY29sb3I6ICR7KHByb3BzKSA9PiBwcm9wcy50aGVtZS5jb2xvcnMudGV4dH07XG4gIGZvbnQtc2l6ZTogMWVtO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBsaW5lLWhlaWdodDogMS4yNTtcbiAgcGFkZGluZzogMC41ZW0gMWVtO1xuICB3aWR0aDogMTAwJTtcblxuICAmOjpwbGFjZWhvbGRlciB7XG4gICAgY29sb3I6ICR7KHByb3BzKSA9PiBwcm9wcy50aGVtZS5jb2xvcnMudGV4dH07XG4gICAgb3BhY2l0eTogMC41O1xuICB9XG4gICY6Zm9jdXMge1xuICAgIG91dGxpbmU6IG5vbmU7XG4gIH1cbmBcblxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiBUZXh0SW5wdXQocHJvcHMsIHJlZikge1xuICByZXR1cm4gKFxuICAgIDxXcmFwcGVyPlxuICAgICAgPElucHV0XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICB0eXBlPSd0ZXh0J1xuICAgICAgICBwbGFjZWhvbGRlcj17cHJvcHMucGxhY2Vob2xkZXJ9XG4gICAgICAgIHZhbHVlPXtwcm9wcy5zZWFyY2h9XG4gICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gcHJvcHMuc2V0U2VhcmNoKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgb25Gb2N1cz17KCkgPT4gcHJvcHMuc2V0Rm9jdXModHJ1ZSl9XG4gICAgICAgIG9uQmx1cj17KCkgPT4gcHJvcHMuc2V0Rm9jdXMoZmFsc2UpfVxuICAgICAgLz5cbiAgICA8L1dyYXBwZXI+XG4gIClcbn0pXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJzdHlsZWQiLCJXcmFwcGVyIiwiZGl2IiwiSW5wdXQiLCJpbnB1dCIsInByb3BzIiwidGhlbWUiLCJtcSIsInNtYWxsIiwieHNtYWxsIiwiY29sb3JzIiwidGV4dCIsImZvcndhcmRSZWYiLCJUZXh0SW5wdXQiLCJyZWYiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJ2YWx1ZSIsInNlYXJjaCIsIm9uQ2hhbmdlIiwiZSIsInNldFNlYXJjaCIsInRhcmdldCIsIm9uRm9jdXMiLCJzZXRGb2N1cyIsIm9uQmx1ciJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=webpack-internal:///./src/components/misc/search/searchBar/TextInputSmall.js
