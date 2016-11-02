import React from 'react'
import { Link } from 'react-router'
import typography from '../blog-typography'
import { Container } from 'react-responsive-grid'
import DocumentTitle from 'react-document-title'
const rhythm = typography.rhythm
const scale = typography.scale
import includes from 'lodash/includes'
import '../styles/zenburn.css'
import 'typeface-alegreya'
import 'typeface-alegreya-sans'

class Wrapper extends React.Component {
  render () {
    let header
    // Check if the location is either the front page or a tags page.
    // If so, use a big header, otherwise use a smaller one.
    if (includes(['/', '/tags/'], this.props.location.pathname) ||
        includes(this.props.location.pathname, '/tags/')
       ) {
      header = (
        <Link
          style={{
            textDecoration: 'none',
            boxShadow: 'none',
            color: 'inherit',
          }}
          to="/"
        >
          <h1
            style={{
              ...scale(1.5),
              marginBottom: rhythm(1.5),
            }}
          >
            Bricolage
          </h1>
        </Link>
      )
    } else {
      header = (
        <Link
          style={{
            textDecoration: 'none',
            boxShadow: 'none',
            color: 'inherit',
          }}
          to="/"
        >
          <h3>Bricolage</h3>
        </Link>
      )
    }
    return (
      <DocumentTitle title="Bricolage">
        <Container
          style={{
            padding: `${rhythm(1.5)} ${rhythm(3/4)}`,
            maxWidth: 750,
          }}
        >
          <div>
            {header}
          </div>
          {this.props.children}
        </Container>
      </DocumentTitle>
    )
  }
}

export default Wrapper
