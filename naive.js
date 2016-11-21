// XXX: This is a naive implementation, see index.js
// for optimized, production verion.
var naiveReactGuard = function (React, guardFn) {
  guardFn = guardFn || function () { return null }

  React.__reactGuardOriginalCreateElement__ = React.createElement
  React.createElement = function (type) {
    if (typeof type === 'function' && 'render' in type.prototype && !('__guardedRender__' in type.prototype)) {
      type.prototype.__guardedRender__ = type.prototype.render
      type.prototype.render = function () {
        try {
          return this.__guardedRender__()
        } catch (err) {
          return guardFn(err, {
            props: this.props,
            state: this.state,
            displayName: this.constructor.displayName
          })
        }
      }
    } else if (typeof type === 'function' && !('render' in type.prototype)) {
      var guardedType = type
      type = function (props, publicContext, updateQueue) {
        try {
          return guardedType(props, publicContext, updateQueue)
        } catch (err) {
          return guardFn(err, {props: props, displayName: guardedType.displayName})
        }
      }
    }
    return React.__reactGuardOriginalCreateElement__.apply(React, [type].concat(Array.prototype.slice.call(arguments, 1)))
  }
}

module.exports = naiveReactGuard
