# React Guard

React Guard helps to prevent White Screen of Death,
improves user expirience and assists in the bug hunt.

It patches React, so it wraps every render function (including
function components) intro try-catch block.

If an exception occurs during the rendering, it calls specified guard function.
The guard function gets the exception object and extra information such as
the component `props`, `state` and `displayName`.

## Installation

```
npm install react-guard --save
```

or

```
yarn add react-guard
```

## Usage

```javascript
var React = require('react')
var reactGuard = require('react-guard')

// Catch and process component render exceptions.
reactGuard(React, function (err, componentInfo) {
  // Print stacktrace to the console
  console && console.error && console.error(err.stack)

  // Notify Sentry (replace with your service of choice)
  Raven.captureException(err, {
    extra: {
      props: componentInfo.props,
      state: componentInfo.state,
      displayName: componentInfo.displayName
    }
  })

  // Replace failed component with "Failed to render".
  // Use `return null` to render nothing.
  return <div>Failed to render</div>
})
```

## License

[MIT © Sasha Koss](https://kossnocorp.mit-license.org/)
