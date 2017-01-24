import React from 'react'
import { GoogleFont, TypographyStyle } from 'react-typography'
import Helmet from 'react-helmet'

import typography from './utils/typography'
import HTMLStyles from '.intermediate-representation/html-styles'

module.exports = React.createClass({
  render () {
    const head = Helmet.rewind()

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {this.props.headComponents}
          <TypographyStyle typography={typography} />
          <HTMLStyles />
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
        </head>
        <body>
          <div id="react-mount" dangerouslySetInnerHTML={{ __html: this.props.body }} />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  },
})
