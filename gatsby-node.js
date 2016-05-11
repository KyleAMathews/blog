exports.rewritePath = (parsedFilePath, metadata) => {
  if (parsedFilePath.ext === "md") {
    return `/${parsedFilePath.dirname.split('---')[1]}/`
  }
}

exports.postBuild = require('./post-build')
