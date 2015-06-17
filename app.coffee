exports.loadContext = (callback) ->
  context = require.context './pages', true
  if module.hot
    module.hot.accept(context.id, ->
      context = require.context './pages', true
      callback context
    )

  callback context

exports.rewritePath = (parsedFilePath, metadata) ->
  if metadata.file.ext is "md"
    return "/" + parsedFilePath.dirname.split('---')[1] + "/"
