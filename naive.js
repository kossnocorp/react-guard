// XXX: This is a naive implementation, see index.js
// for optimized, production verion.
var naiveReactGuard = function (React, guardFn) {
  guardFn = guardFn || function () { return null }

  React.__reactGuardOriginalCreateElement__ = React.createElement
  React.createElement = function (type) {
    if (typeof type === 'function' && type.prototype && 'render' in type.prototype && !('__guardedRender__' in type.prototype)) {
      type.prototype.__guardedRender__ = type.prototype.render
      type.prototype.render = function () {
        try {
          return this.__guardedRender__()
        } catch (err) {
          return guardFn(err, {
            props: this.props,
            state: this.state,
            displayName: this.constructor.displayName || this.constructor.name
          })
        }
      }
    } else if (typeof type === 'function' && (!type.prototype || !('render' in type.prototype))) {
      var guardedType = type
      var _type
      if (guardedType.__reactGuardGuardedFunction__) {
        _type = guardedType.__reactGuardGuardedFunction__
      } else {
        _type = function (props, publicContext, updateQueue) {
          try {
            return guardedType(props, publicContext, updateQueue)
          } catch (err) {
            return guardFn(err, {props: props, displayName: guardedType.displayName})
          }
        }
        Object.assign(_type, guardedType)
        guardedType.__reactGuardGuardedFunction__ = _type
      }
      type = _type
    }
    return React.__reactGuardOriginalCreateElement__.apply(React, [type].concat(Array.prototype.slice.call(arguments, 1)))
  }
}

module.exports = naiveReactGuard
