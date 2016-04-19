// Send pageview event to Google Analytics on page change.
exports.onRouteChange = (state, page, pages) => {
  if (typeof ga !== 'undefined') {
    ga('send', 'pageview', {
      page: state.path,
    })
  }
}
