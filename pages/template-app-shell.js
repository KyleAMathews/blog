import React from 'react'
import browserHistory from 'react-router/lib/browserHistory'

class AppShell extends React.Component {
  componentWillMount () {
    console.log(this.props.location)
    browserHistory.replace(this.props.location.pathname)
  }
}

export default AppShell
