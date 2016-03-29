// Send pageview event to Google Analytics on page change.
exports.onRouteChange = (state, page, pages) => {
  if (ga) {
    ga('send', 'pageview', {
      page: state.path,
    })
  }
}
