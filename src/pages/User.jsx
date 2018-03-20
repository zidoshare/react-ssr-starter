import React from 'react'
import Helmet from 'react-helmet'
export default class User extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>this is user</title>
        </Helmet>
        this is user page
      </div>
    )
  }
}