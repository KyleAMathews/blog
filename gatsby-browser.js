// Send pageview event to Google Analytics on page change.
exports.onRouteUpdate = (location) => {
  if (typeof ga !== 'undefined') {
    ga('send', 'pageview', {
      page: location.pathname,
    })
  }
}

exports.clientEntry = () => {
  require('es6-object-assign').polyfill()
}
