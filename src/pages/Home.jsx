import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/home'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
class Home extends React.Component {
  static propTypes = {
    add: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
    homeInfo: PropTypes.shape({
      name: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
    }).isRequired,
    getHomeInfo: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
    }
  }
  componentDidMount() {
    this.props.getHomeInfo()
  }

  componentDidCatch(err, info) {
    this.setState({
      hasError: true,
    })
    //
    console.log('发送错误', err, info)
  }
  render() {
    let { add, count, homeInfo: { name, age } } = this.props
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>this is home</title>
        </Helmet>
        <h3>hello world</h3>
        <p className="center-align" >Look at these amazing features!!!</p>
        <p>my name is {name}</p>
        <p>my age is {age}</p>
        <p>计数器:{count}</p>
        <button style={{ backgroundColor: '#eee' }} onClick={() => add(count + 1)}>增加</button>
        <Link to='/user'>User</Link>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  count: state.counter.count,
  homeInfo: state.homeInfo,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)