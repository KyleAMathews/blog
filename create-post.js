const fs = require("fs")
const path = require("path")

const slug = process.argv[2]
if (!slug) {
  console.error("Please provide a URL slug as an argument.")
  process.exit(1)
}

const currentDate = new Date().toISOString().split("T")[0] // YYYY-MM-DD format
const directoryPath = `./src/pages/${currentDate}---${slug}`

const markdownContent = `---
title: "Title Here"
date: ${JSON.stringify(new Date())}
---

Content here...
`

// console.log({currentDate, directoryPath})
// console.log(markdownContent)

fs.mkdirSync(directoryPath, { recursive: true })
fs.writeFileSync(path.join(directoryPath, "index.md"), markdownContent)

console.log(`Post created at ${directoryPath}/index.md`)
