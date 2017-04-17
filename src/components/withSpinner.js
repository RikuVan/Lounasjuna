import React, {Component} from 'react'
import Loading from './Loading'

/**
 * Example of Higher Order Component (HOC) which wraps another component, augmenting its behaviour
 */

//helper function to check if there if data is loading or the data object is empty or null
const emptyOrLoading = (propNames, props) => {
  return propNames.reduce((isLoading, name) => {
    if (isLoading) return isLoading
    const prop = props[name]
    if (!prop ||
      !prop.data ||
      (prop.data.constructor.toString().indexOf('Object') > -1 && Object.keys(prop.data).length === 0) ||
      (Array.isArray(prop.data) && prop.data.length === 0) ||
      prop.loading) {
      return true
    }
    return false
  }, false)
}

const padding = {paddingTop: '2em', paddingBottom: '2em'}

const loaderHOC = (propNames, small = false) =>
  WrappedComponent => {
    return class Wrapper extends Component {
      render() {
        if (emptyOrLoading(propNames, this.props)) {
          return (
            <div className="Restaurants-loader" style={small ? {} : padding}>
              <Loading small={small} />
            </div>
          )
        }
        return <WrappedComponent {...this.props} />
      }
    }
  }

export default loaderHOC
