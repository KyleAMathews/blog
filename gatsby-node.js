exports.rewritePath = (parsedFilePath, metadata) => {
  if (metadata.file.ext === "md") {
    return `/${parsedFilePath.dirname.split('---')[1]}/`
  }
}
