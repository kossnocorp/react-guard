# React Guard

## Installation

```
npm install --save react-guard
```

## Usage

``` javascript
var React = require('react/addons');
var reactGuard = require('react-guard');

reactGuard(React, function(error) {
  // Process catched error, extract stack trace, save error data to
  // exception catcher etc
});

window.React = React;

```

