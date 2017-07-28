/* eslint-disable no-redeclare */

// XXX: This is highly optimized implementation, used in production
// see naive.js for the logic reference.
//
// See V8 Bailout Reasons for optimization reference:
// https://github.com/vhf/v8-bailout-reasons
var reactGuard = function (React, guardFn) {
  guardFn =
    guardFn ||
    function () {
      return null
    }

  function classComponentRender () {
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

  function buildFunctionComponent (type) {
    var _type = function (props, publicContext, updateQueue) {
      try {
        return type(props, publicContext, updateQueue)
      } catch (err) {
        return guardFn(err, { props: props, displayName: type.displayName })
      }
    }
    Object.assign(_type, type)
    return _type
  }

  React.__reactGuardOriginalCreateElement__ = React.createElement
  React.createElement = function (type, createElementProps) {
    // DOM component
    if (typeof type === 'string') {
      if (arguments.length === 2) {
        return React.__reactGuardOriginalCreateElement__(
          type,
          createElementProps
        )
      } else {
        var args = new Array(arguments.length)
        for (var i = 0; i < args.length; ++i) {
          args[i] = arguments[i]
        }
        return React.__reactGuardOriginalCreateElement__.apply(React, args)
      }
      // Class component
    } else if (
      typeof type === 'function' &&
      type.prototype &&
      'render' in type.prototype &&
      !('__guardedRender__' in type.prototype)
    ) {
      type.prototype.__guardedRender__ = type.prototype.render
      type.prototype.render = classComponentRender
      var args = new Array(arguments.length)
      for (var i = 0; i < args.length; ++i) {
        args[i] = arguments[i]
      }
      return React.__reactGuardOriginalCreateElement__.apply(React, args)
      // Function component
    } else if (
      typeof type === 'function' &&
      (!type.prototype || !('render' in type.prototype))
    ) {
      var _type
      if (type.__reactGuardGuardedFunction__) {
        _type = type.__reactGuardGuardedFunction__
      } else {
        _type = buildFunctionComponent(type)
        type.__reactGuardGuardedFunction__ = _type
      }
      var args = new Array(arguments.length)
      args[0] = _type
      for (var i = 1; i < args.length; ++i) {
        args[i] = arguments[i]
      }
      return React.__reactGuardOriginalCreateElement__.apply(React, args)
      // "Warm" class component
    } else {
      if (arguments.length === 2) {
        return React.__reactGuardOriginalCreateElement__(
          type,
          createElementProps
        )
      } else {
        var args = new Array(arguments.length)
        for (var i = 0; i < args.length; ++i) {
          args[i] = arguments[i]
        }
        return React.__reactGuardOriginalCreateElement__.apply(React, args)
      }
    }
  }
}

reactGuard.restore = function (React) {
  if ('__reactGuardOriginalCreateElement__' in React) {
    React.createElement = React.__reactGuardOriginalCreateElement__
    delete React.__reactGuardOriginalCreateElement__
  }
}

module.exports = reactGuard
