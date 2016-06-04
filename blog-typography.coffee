Typography = require 'typography'
typography = Typography()

# Hot reload typography in development.
if process.env.NODE_ENV isnt 'production'
  typography.injectStyles()

module.exports = typography
