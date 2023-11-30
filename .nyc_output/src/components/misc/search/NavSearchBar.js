__webpack_require__.r(__webpack_exports__)
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */ default: function () {
    return /* binding */ NavSearchBar
  },
  /* harmony export */
})
/* harmony import */ var _swc_helpers_tagged_template_literal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
  /*! @swc/helpers/_/_tagged_template_literal */ './node_modules/@swc/helpers/esm/_tagged_template_literal.js'
)
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
  /*! react/jsx-dev-runtime */ './node_modules/preact/compat/jsx-dev-runtime.mjs'
)
/* harmony import */ var fuse_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
  /*! fuse.js */ './node_modules/fuse.js/dist/fuse.mjs'
)
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
  /*! next/router */ './node_modules/next/router.js'
)
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __webpack_require__.n(
  next_router__WEBPACK_IMPORTED_MODULE_2__
)
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
  /*! react */ './node_modules/preact/compat/dist/compat.module.js'
)
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
  /*! styled-components */ './node_modules/styled-components/dist/styled-components.browser.esm.js'
)
/* harmony import */ var components_providers_DataProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
  /*! components/providers/DataProvider */ './src/components/providers/DataProvider.tsx'
)
/* harmony import */ var _searchBar_Suggestions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
  /*! ./searchBar/Suggestions */ './src/components/misc/search/searchBar/Suggestions.js'
)
/* harmony import */ var _searchBar_TextInputSmall__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
  /*! ./searchBar/TextInputSmall */ './src/components/misc/search/searchBar/TextInputSmall.js'
)

function _templateObject() {
  const data = (0, _swc_helpers_tagged_template_literal__WEBPACK_IMPORTED_MODULE_0__._)([
    '\n  position: relative;\n  width: 300px;\n  ',
    ' {\n    display: none;\n    width: 100%;\n  }\n',
  ])
  _templateObject = function () {
    return data
  }
  return data
}
function _templateObject1() {
  const data = (0, _swc_helpers_tagged_template_literal__WEBPACK_IMPORTED_MODULE_0__._)(['\n  display: flex;\n'])
  _templateObject1 = function () {
    return data
  }
  return data
}
function _templateObject2() {
  const data = (0, _swc_helpers_tagged_template_literal__WEBPACK_IMPORTED_MODULE_0__._)([
    '\n  background-color: ',
    ';\n  border: 1px solid #eae5e8;\n  border-radius: 0.625em;\n  box-shadow: ',
    ';\n  left: 0;\n  overflow: hidden;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: 100;\n\n  ',
    ' {\n    border-radius: ',
    ';\n    left: ',
    ';\n    width: ',
    ';\n  }\n',
  ])
  _templateObject2 = function () {
    return data
  }
  return data
}

var _s = $RefreshSig$()

function NavSearchBar(props) {
  _s()
  const { equivalents, categories } = (0, react__WEBPACK_IMPORTED_MODULE_3__.useContext)(
    components_providers_DataProvider__WEBPACK_IMPORTED_MODULE_4__['default']
  )
  const [search, setSearch] = (0, react__WEBPACK_IMPORTED_MODULE_3__.useState)('')
  const [results, setResults] = (0, react__WEBPACK_IMPORTED_MODULE_3__.useState)([])
  const [fuse, setFuse] = (0, react__WEBPACK_IMPORTED_MODULE_3__.useState)(null)
  ;(0, react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (equivalents) {
      setFuse(
        new fuse_js__WEBPACK_IMPORTED_MODULE_7__['default'](equivalents, {
          keys: [
            {
              name: 'name',
              weight: 1,
            },
            {
              name: 'slug',
              weight: 0.7,
            },
            {
              name: 'subtitle',
              weight: 0.4,
            },
            {
              name: 'synonyms',
              weight: 0.2,
            },
          ],
          threshold: 0.3,
          ignoreLocation: true,
        })
      )
    }
  }, [equivalents])
  ;(0, react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (fuse && search.length > 1) {
      setResults(fuse.search(search.normalize('NFD').replace(/[\u0300-\u036f]/g, '')))
    } else {
      setResults([])
    }
  }, [search, fuse])
  const [focus, setFocus] = (0, react__WEBPACK_IMPORTED_MODULE_3__.useState)(false)
  const input = (0, react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null)
  const [current, setCurrent] = (0, react__WEBPACK_IMPORTED_MODULE_3__.useState)(0)
  ;(0, react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    setCurrent(0)
    if (!focus) {
      input.current && input.current.blur()
    }
  }, [focus, results])
  const router = (0, next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)()
  const navigateToItem = (param) => {
    let { item } = param
    router.push(
      item.category
        ? '/'.concat(categories.find((category) => category.id === item.category).slug, '/').concat(item.slug)
        : '/'.concat(item.slug)
    )
  }
  return /*#__PURE__*/ (0, react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(
    'form',
    {
      onSubmit: (e) => {
        e.preventDefault()
        if (search.length > 1) {
          if (results[current]) {
            navigateToItem(results[current])
          } else {
            navigateToItem({
              item: categories[current],
            })
          }
        }
      },
      className: props.className,
      children: /*#__PURE__*/ (0, react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(
        NavActions,
        {
          children: /*#__PURE__*/ (0, react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(
            NavSearch,
            {
              className: 'navSearch',
              children: /*#__PURE__*/ (0, react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(
                SearchContainer,
                {
                  className: 'searchContainer',
                  children: [
                    /*#__PURE__*/ (0, react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(
                      _searchBar_TextInputSmall__WEBPACK_IMPORTED_MODULE_6__['default'],
                      {
                        placeholder: 'Rechercher...',
                        ref: input,
                        search: search,
                        focus: focus,
                        suggestion: results[current],
                        suggestionVisible: focus,
                        setSearch: setSearch,
                        setFocus: setFocus,
                        hideSubmit: true,
                      },
                      void 0,
                      false,
                      {
                        fileName: '/home/david/workspace/impactco2/src/components/misc/search/NavSearchBar.js',
                        lineNumber: 89,
                        columnNumber: 13,
                      },
                      this
                    ),
                    focus &&
                      /*#__PURE__*/ (0, react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(
                        _searchBar_Suggestions__WEBPACK_IMPORTED_MODULE_5__['default'],
                        {
                          enabled: search.length > 1,
                          results: results,
                          categories: categories,
                          focus: focus,
                          current: current,
                          setCurrent: setCurrent,
                          handleSuggestionClick: navigateToItem,
                        },
                        void 0,
                        false,
                        {
                          fileName: '/home/david/workspace/impactco2/src/components/misc/search/NavSearchBar.js',
                          lineNumber: 101,
                          columnNumber: 15,
                        },
                        this
                      ),
                  ],
                },
                void 0,
                true,
                {
                  fileName: '/home/david/workspace/impactco2/src/components/misc/search/NavSearchBar.js',
                  lineNumber: 88,
                  columnNumber: 11,
                },
                this
              ),
            },
            void 0,
            false,
            {
              fileName: '/home/david/workspace/impactco2/src/components/misc/search/NavSearchBar.js',
              lineNumber: 87,
              columnNumber: 9,
            },
            this
          ),
        },
        void 0,
        false,
        {
          fileName: '/home/david/workspace/impactco2/src/components/misc/search/NavSearchBar.js',
          lineNumber: 86,
          columnNumber: 7,
        },
        this
      ),
    },
    void 0,
    false,
    {
      fileName: '/home/david/workspace/impactco2/src/components/misc/search/NavSearchBar.js',
      lineNumber: 74,
      columnNumber: 5,
    },
    this
  )
}
_s(NavSearchBar, 'grs3vLRqj8T3Nie1ffm7ztv1vd8=', false, function () {
  return [next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter]
})
_c = NavSearchBar
const NavSearch = styled_components__WEBPACK_IMPORTED_MODULE_8__['default'].div.withConfig({
  displayName: 'NavSearchBar__NavSearch',
  componentId: 'sc-a1482fe9-0',
})(_templateObject(), (props) => props.theme.mq.small)
_c1 = NavSearch
const NavActions = styled_components__WEBPACK_IMPORTED_MODULE_8__['default'].div.withConfig({
  displayName: 'NavSearchBar__NavActions',
  componentId: 'sc-a1482fe9-1',
})(_templateObject1())
_c2 = NavActions
const SearchContainer = styled_components__WEBPACK_IMPORTED_MODULE_8__['default'].div.withConfig({
  displayName: 'NavSearchBar__SearchContainer',
  componentId: 'sc-a1482fe9-2',
})(
  _templateObject2(),
  (props) => (props.focus ? props.theme.colors.background : 'transparent'),
  (props) => (props.focus ? '0px 4px 10px 0px rgba(0, 17, 51, 0.08)' : '0px 4px 10px 0px rgba(0, 17, 51, 0.04)'),
  (props) => props.theme.mq.small,
  (props) => (props.home || props.focus ? ' 0.625em' : '4rem'),
  (props) => (props.home ? 0 : 'auto'),
  (props) => (props.home ? 'auto' : props.focus ? 'calc(100vw - 1.5rem)' : '2.375rem')
)
_c3 = SearchContainer
var _c, _c1, _c2, _c3
$RefreshReg$(_c, 'NavSearchBar')
$RefreshReg$(_c1, 'NavSearch')
$RefreshReg$(_c2, 'NavActions')
$RefreshReg$(_c3, 'SearchContainer')

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9taXNjL3NlYXJjaC9OYXZTZWFyY2hCYXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCO0FBQ2E7QUFDK0I7QUFDaEM7QUFDcUI7QUFDVjtBQUNNO0FBRXhDLFNBQVNXLGFBQWFDLEtBQUs7O0lBQ3hDLE1BQU0sRUFBRUMsV0FBVyxFQUFFQyxVQUFVLEVBQUUsR0FBR1gsaURBQVVBLENBQUNLLHlFQUFXQTtJQUMxRCxNQUFNLENBQUNPLFFBQVFDLFVBQVUsR0FBR1YsK0NBQVFBLENBQUM7SUFFckMsTUFBTSxDQUFDVyxTQUFTQyxXQUFXLEdBQUdaLCtDQUFRQSxDQUFDLEVBQUU7SUFDekMsTUFBTSxDQUFDYSxNQUFNQyxRQUFRLEdBQUdkLCtDQUFRQSxDQUFDO0lBQ2pDRixnREFBU0EsQ0FBQztRQUNSLElBQUlTLGFBQWE7WUFDZk8sUUFDRSxJQUFJcEIsK0NBQUlBLENBQUNhLGFBQWE7Z0JBQ3BCUSxNQUFNO29CQUNKO3dCQUNFQyxNQUFNO3dCQUNOQyxRQUFRO29CQUNWO29CQUNBO3dCQUNFRCxNQUFNO3dCQUNOQyxRQUFRO29CQUNWO29CQUNBO3dCQUNFRCxNQUFNO3dCQUNOQyxRQUFRO29CQUNWO29CQUNBO3dCQUNFRCxNQUFNO3dCQUNOQyxRQUFRO29CQUNWO2lCQUNEO2dCQUNEQyxXQUFXO2dCQUNYQyxnQkFBZ0I7WUFDbEI7UUFFSjtJQUNGLEdBQUc7UUFBQ1o7S0FBWTtJQUVoQlQsZ0RBQVNBLENBQUM7UUFDUixJQUFJZSxRQUFRSixPQUFPVyxNQUFNLEdBQUcsR0FBRztZQUM3QlIsV0FBV0MsS0FBS0osTUFBTSxDQUFDQSxPQUFPWSxTQUFTLENBQUMsT0FBT0MsT0FBTyxDQUFDLG9CQUFvQjtRQUM3RSxPQUFPO1lBQ0xWLFdBQVcsRUFBRTtRQUNmO0lBQ0YsR0FBRztRQUFDSDtRQUFRSTtLQUFLO0lBRWpCLE1BQU0sQ0FBQ1UsT0FBT0MsU0FBUyxHQUFHeEIsK0NBQVFBLENBQUM7SUFDbkMsTUFBTXlCLFFBQVExQiw2Q0FBTUEsQ0FBQztJQUNyQixNQUFNLENBQUMyQixTQUFTQyxXQUFXLEdBQUczQiwrQ0FBUUEsQ0FBQztJQUV2Q0YsZ0RBQVNBLENBQUM7UUFDUjZCLFdBQVc7UUFDWCxJQUFJLENBQUNKLE9BQU87WUFDVkUsTUFBTUMsT0FBTyxJQUFJRCxNQUFNQyxPQUFPLENBQUNFLElBQUk7UUFDckM7SUFDRixHQUFHO1FBQUNMO1FBQU9aO0tBQVE7SUFFbkIsTUFBTWtCLFNBQVNsQyxzREFBU0E7SUFFeEIsTUFBTW1DLGlCQUFpQjtZQUFDLEVBQUVDLElBQUksRUFBRTtRQUM5QkYsT0FBT0csSUFBSSxDQUNURCxLQUFLRSxRQUFRLEdBQ1QsSUFBeUVGLE9BQXJFdkIsV0FBVzBCLElBQUksQ0FBQyxDQUFDRCxXQUFhQSxTQUFTRSxFQUFFLEtBQUtKLEtBQUtFLFFBQVEsRUFBRUcsSUFBSSxFQUFDLEtBQWEsT0FBVkwsS0FBS0ssSUFBSSxJQUNsRixJQUFjLE9BQVZMLEtBQUtLLElBQUk7SUFFckI7SUFFQSxxQkFDRSw4REFBQ0M7UUFDQ0MsVUFBVSxDQUFDQztZQUNUQSxFQUFFQyxjQUFjO1lBQ2hCLElBQUkvQixPQUFPVyxNQUFNLEdBQUcsR0FBRztnQkFDckIsSUFBSVQsT0FBTyxDQUFDZSxRQUFRLEVBQUU7b0JBQ3BCSSxlQUFlbkIsT0FBTyxDQUFDZSxRQUFRO2dCQUNqQyxPQUFPO29CQUNMSSxlQUFlO3dCQUFFQyxNQUFNdkIsVUFBVSxDQUFDa0IsUUFBUTtvQkFBQztnQkFDN0M7WUFDRjtRQUNGO1FBQ0FlLFdBQVduQyxNQUFNbUMsU0FBUztrQkFDMUIsNEVBQUNDO3NCQUNDLDRFQUFDQztnQkFBVUYsV0FBVTswQkFDbkIsNEVBQUNHO29CQUFnQkgsV0FBVTs7c0NBQ3pCLDhEQUFDckMsaUVBQWNBOzRCQUNieUMsYUFBYTs0QkFDYkMsS0FBS3JCOzRCQUNMaEIsUUFBUUE7NEJBQ1JjLE9BQU9BOzRCQUNQd0IsWUFBWXBDLE9BQU8sQ0FBQ2UsUUFBUTs0QkFDNUJzQixtQkFBbUJ6Qjs0QkFDbkJiLFdBQVdBOzRCQUNYYyxVQUFVQTs0QkFDVnlCLFlBQVk7Ozs7Ozt3QkFFYjFCLHVCQUNDLDhEQUFDcEIsOERBQVdBOzRCQUNWK0MsU0FBU3pDLE9BQU9XLE1BQU0sR0FBRzs0QkFDekJULFNBQVNBOzRCQUNUSCxZQUFZQTs0QkFDWmUsT0FBT0E7NEJBQ1BHLFNBQVNBOzRCQUNUQyxZQUFZQTs0QkFDWndCLHVCQUF1QnJCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRdkM7R0EzR3dCekI7O1FBc0RQVixrREFBU0E7OztLQXRERlU7QUE2R3hCLE1BQU1zQyxZQUFZMUMsNkRBQVU7OztzQkFHeEIsQ0FBQ0ssUUFBVUEsTUFBTStDLEtBQUssQ0FBQ0MsRUFBRSxDQUFDQyxLQUFLO01BSDdCWjtBQVNOLE1BQU1ELGFBQWF6Qyw2REFBVTs7OztNQUF2QnlDO0FBSU4sTUFBTUUsa0JBQWtCM0MsNkRBQVU7Ozt1QkFDWixDQUFDSyxRQUFXQSxNQUFNaUIsS0FBSyxHQUFHakIsTUFBTStDLEtBQUssQ0FBQ0csTUFBTSxDQUFDQyxVQUFVLEdBQUcsZUFHaEUsQ0FBQ25ELFFBQ2JBLE1BQU1pQixLQUFLLEdBQUcsMkNBQTJDLDBDQVF6RCxDQUFDakIsUUFBVUEsTUFBTStDLEtBQUssQ0FBQ0MsRUFBRSxDQUFDQyxLQUFLLEVBQ2QsQ0FBQ2pELFFBQVdBLE1BQU1vRCxJQUFJLElBQUlwRCxNQUFNaUIsS0FBSyxHQUFHLGFBQWEsUUFDOUQsQ0FBQ2pCLFFBQVdBLE1BQU1vRCxJQUFJLEdBQUcsSUFBSSxRQUM1QixDQUFDcEQsUUFBV0EsTUFBTW9ELElBQUksR0FBRyxTQUFTcEQsTUFBTWlCLEtBQUssR0FBRyx5QkFBeUI7TUFoQmhGcUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvbWlzYy9zZWFyY2gvTmF2U2VhcmNoQmFyLmpzP2E3OTMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEZ1c2UgZnJvbSAnZnVzZS5qcydcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJ1xuaW1wb3J0IFJlYWN0LCB7IHVzZUNvbnRleHQsIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cydcbmltcG9ydCBEYXRhQ29udGV4dCBmcm9tICdjb21wb25lbnRzL3Byb3ZpZGVycy9EYXRhUHJvdmlkZXInXG5pbXBvcnQgU3VnZ2VzdGlvbnMgZnJvbSAnLi9zZWFyY2hCYXIvU3VnZ2VzdGlvbnMnXG5pbXBvcnQgVGV4dElucHV0U21hbGwgZnJvbSAnLi9zZWFyY2hCYXIvVGV4dElucHV0U21hbGwnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE5hdlNlYXJjaEJhcihwcm9wcykge1xuICBjb25zdCB7IGVxdWl2YWxlbnRzLCBjYXRlZ29yaWVzIH0gPSB1c2VDb250ZXh0KERhdGFDb250ZXh0KVxuICBjb25zdCBbc2VhcmNoLCBzZXRTZWFyY2hdID0gdXNlU3RhdGUoJycpXG5cbiAgY29uc3QgW3Jlc3VsdHMsIHNldFJlc3VsdHNdID0gdXNlU3RhdGUoW10pXG4gIGNvbnN0IFtmdXNlLCBzZXRGdXNlXSA9IHVzZVN0YXRlKG51bGwpXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGVxdWl2YWxlbnRzKSB7XG4gICAgICBzZXRGdXNlKFxuICAgICAgICBuZXcgRnVzZShlcXVpdmFsZW50cywge1xuICAgICAgICAgIGtleXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogJ25hbWUnLFxuICAgICAgICAgICAgICB3ZWlnaHQ6IDEsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiAnc2x1ZycsXG4gICAgICAgICAgICAgIHdlaWdodDogMC43LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogJ3N1YnRpdGxlJyxcbiAgICAgICAgICAgICAgd2VpZ2h0OiAwLjQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiAnc3lub255bXMnLFxuICAgICAgICAgICAgICB3ZWlnaHQ6IDAuMixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICB0aHJlc2hvbGQ6IDAuMyxcbiAgICAgICAgICBpZ25vcmVMb2NhdGlvbjogdHJ1ZSxcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICB9XG4gIH0sIFtlcXVpdmFsZW50c10pXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoZnVzZSAmJiBzZWFyY2gubGVuZ3RoID4gMSkge1xuICAgICAgc2V0UmVzdWx0cyhmdXNlLnNlYXJjaChzZWFyY2gubm9ybWFsaXplKCdORkQnKS5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCAnJykpKVxuICAgIH0gZWxzZSB7XG4gICAgICBzZXRSZXN1bHRzKFtdKVxuICAgIH1cbiAgfSwgW3NlYXJjaCwgZnVzZV0pXG5cbiAgY29uc3QgW2ZvY3VzLCBzZXRGb2N1c10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgaW5wdXQgPSB1c2VSZWYobnVsbClcbiAgY29uc3QgW2N1cnJlbnQsIHNldEN1cnJlbnRdID0gdXNlU3RhdGUoMClcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldEN1cnJlbnQoMClcbiAgICBpZiAoIWZvY3VzKSB7XG4gICAgICBpbnB1dC5jdXJyZW50ICYmIGlucHV0LmN1cnJlbnQuYmx1cigpXG4gICAgfVxuICB9LCBbZm9jdXMsIHJlc3VsdHNdKVxuXG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpXG5cbiAgY29uc3QgbmF2aWdhdGVUb0l0ZW0gPSAoeyBpdGVtIH0pID0+IHtcbiAgICByb3V0ZXIucHVzaChcbiAgICAgIGl0ZW0uY2F0ZWdvcnlcbiAgICAgICAgPyBgLyR7Y2F0ZWdvcmllcy5maW5kKChjYXRlZ29yeSkgPT4gY2F0ZWdvcnkuaWQgPT09IGl0ZW0uY2F0ZWdvcnkpLnNsdWd9LyR7aXRlbS5zbHVnfWBcbiAgICAgICAgOiBgLyR7aXRlbS5zbHVnfWBcbiAgICApXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxmb3JtXG4gICAgICBvblN1Ym1pdD17KGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGlmIChzZWFyY2gubGVuZ3RoID4gMSkge1xuICAgICAgICAgIGlmIChyZXN1bHRzW2N1cnJlbnRdKSB7XG4gICAgICAgICAgICBuYXZpZ2F0ZVRvSXRlbShyZXN1bHRzW2N1cnJlbnRdKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuYXZpZ2F0ZVRvSXRlbSh7IGl0ZW06IGNhdGVnb3JpZXNbY3VycmVudF0gfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH19XG4gICAgICBjbGFzc05hbWU9e3Byb3BzLmNsYXNzTmFtZX0+XG4gICAgICA8TmF2QWN0aW9ucz5cbiAgICAgICAgPE5hdlNlYXJjaCBjbGFzc05hbWU9J25hdlNlYXJjaCc+XG4gICAgICAgICAgPFNlYXJjaENvbnRhaW5lciBjbGFzc05hbWU9J3NlYXJjaENvbnRhaW5lcic+XG4gICAgICAgICAgICA8VGV4dElucHV0U21hbGxcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9eydSZWNoZXJjaGVyLi4uJ31cbiAgICAgICAgICAgICAgcmVmPXtpbnB1dH1cbiAgICAgICAgICAgICAgc2VhcmNoPXtzZWFyY2h9XG4gICAgICAgICAgICAgIGZvY3VzPXtmb2N1c31cbiAgICAgICAgICAgICAgc3VnZ2VzdGlvbj17cmVzdWx0c1tjdXJyZW50XX1cbiAgICAgICAgICAgICAgc3VnZ2VzdGlvblZpc2libGU9e2ZvY3VzfVxuICAgICAgICAgICAgICBzZXRTZWFyY2g9e3NldFNlYXJjaH1cbiAgICAgICAgICAgICAgc2V0Rm9jdXM9e3NldEZvY3VzfVxuICAgICAgICAgICAgICBoaWRlU3VibWl0PXt0cnVlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIHtmb2N1cyAmJiAoXG4gICAgICAgICAgICAgIDxTdWdnZXN0aW9uc1xuICAgICAgICAgICAgICAgIGVuYWJsZWQ9e3NlYXJjaC5sZW5ndGggPiAxfVxuICAgICAgICAgICAgICAgIHJlc3VsdHM9e3Jlc3VsdHN9XG4gICAgICAgICAgICAgICAgY2F0ZWdvcmllcz17Y2F0ZWdvcmllc31cbiAgICAgICAgICAgICAgICBmb2N1cz17Zm9jdXN9XG4gICAgICAgICAgICAgICAgY3VycmVudD17Y3VycmVudH1cbiAgICAgICAgICAgICAgICBzZXRDdXJyZW50PXtzZXRDdXJyZW50fVxuICAgICAgICAgICAgICAgIGhhbmRsZVN1Z2dlc3Rpb25DbGljaz17bmF2aWdhdGVUb0l0ZW19XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvU2VhcmNoQ29udGFpbmVyPlxuICAgICAgICA8L05hdlNlYXJjaD5cbiAgICAgIDwvTmF2QWN0aW9ucz5cbiAgICA8L2Zvcm0+XG4gIClcbn1cblxuY29uc3QgTmF2U2VhcmNoID0gc3R5bGVkLmRpdmBcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogMzAwcHg7XG4gICR7KHByb3BzKSA9PiBwcm9wcy50aGVtZS5tcS5zbWFsbH0ge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbmBcblxuY29uc3QgTmF2QWN0aW9ucyA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG5gXG5cbmNvbnN0IFNlYXJjaENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGJhY2tncm91bmQtY29sb3I6ICR7KHByb3BzKSA9PiAocHJvcHMuZm9jdXMgPyBwcm9wcy50aGVtZS5jb2xvcnMuYmFja2dyb3VuZCA6ICd0cmFuc3BhcmVudCcpfTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2VhZTVlODtcbiAgYm9yZGVyLXJhZGl1czogMC42MjVlbTtcbiAgYm94LXNoYWRvdzogJHsocHJvcHMpID0+XG4gICAgcHJvcHMuZm9jdXMgPyAnMHB4IDRweCAxMHB4IDBweCByZ2JhKDAsIDE3LCA1MSwgMC4wOCknIDogJzBweCA0cHggMTBweCAwcHggcmdiYSgwLCAxNywgNTEsIDAuMDQpJ307XG4gIGxlZnQ6IDA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDA7XG4gIHRvcDogMDtcbiAgei1pbmRleDogMTAwO1xuXG4gICR7KHByb3BzKSA9PiBwcm9wcy50aGVtZS5tcS5zbWFsbH0ge1xuICAgIGJvcmRlci1yYWRpdXM6ICR7KHByb3BzKSA9PiAocHJvcHMuaG9tZSB8fCBwcm9wcy5mb2N1cyA/ICcgMC42MjVlbScgOiAnNHJlbScpfTtcbiAgICBsZWZ0OiAkeyhwcm9wcykgPT4gKHByb3BzLmhvbWUgPyAwIDogJ2F1dG8nKX07XG4gICAgd2lkdGg6ICR7KHByb3BzKSA9PiAocHJvcHMuaG9tZSA/ICdhdXRvJyA6IHByb3BzLmZvY3VzID8gJ2NhbGMoMTAwdncgLSAxLjVyZW0pJyA6ICcyLjM3NXJlbScpfTtcbiAgfVxuYFxuIl0sIm5hbWVzIjpbIkZ1c2UiLCJ1c2VSb3V0ZXIiLCJSZWFjdCIsInVzZUNvbnRleHQiLCJ1c2VFZmZlY3QiLCJ1c2VSZWYiLCJ1c2VTdGF0ZSIsInN0eWxlZCIsIkRhdGFDb250ZXh0IiwiU3VnZ2VzdGlvbnMiLCJUZXh0SW5wdXRTbWFsbCIsIk5hdlNlYXJjaEJhciIsInByb3BzIiwiZXF1aXZhbGVudHMiLCJjYXRlZ29yaWVzIiwic2VhcmNoIiwic2V0U2VhcmNoIiwicmVzdWx0cyIsInNldFJlc3VsdHMiLCJmdXNlIiwic2V0RnVzZSIsImtleXMiLCJuYW1lIiwid2VpZ2h0IiwidGhyZXNob2xkIiwiaWdub3JlTG9jYXRpb24iLCJsZW5ndGgiLCJub3JtYWxpemUiLCJyZXBsYWNlIiwiZm9jdXMiLCJzZXRGb2N1cyIsImlucHV0IiwiY3VycmVudCIsInNldEN1cnJlbnQiLCJibHVyIiwicm91dGVyIiwibmF2aWdhdGVUb0l0ZW0iLCJpdGVtIiwicHVzaCIsImNhdGVnb3J5IiwiZmluZCIsImlkIiwic2x1ZyIsImZvcm0iLCJvblN1Ym1pdCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImNsYXNzTmFtZSIsIk5hdkFjdGlvbnMiLCJOYXZTZWFyY2giLCJTZWFyY2hDb250YWluZXIiLCJwbGFjZWhvbGRlciIsInJlZiIsInN1Z2dlc3Rpb24iLCJzdWdnZXN0aW9uVmlzaWJsZSIsImhpZGVTdWJtaXQiLCJlbmFibGVkIiwiaGFuZGxlU3VnZ2VzdGlvbkNsaWNrIiwiZGl2IiwidGhlbWUiLCJtcSIsInNtYWxsIiwiY29sb3JzIiwiYmFja2dyb3VuZCIsImhvbWUiXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=webpack-internal:///./src/components/misc/search/NavSearchBar.js
