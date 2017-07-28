const reactGuard = require('../..')
const React = require('react')

const numberOfRuns = 10000

const fakeGuardFn = () => {}

// Original / div

const test1Array = new Array(numberOfRuns).fill(undefined)
console.time(`Original createElement called ${numberOfRuns} times with a div`)
test1Array.forEach((_, index) => {
  React.createElement('div', { key: index })
})
console.timeEnd(
  `Original createElement called ${numberOfRuns} times with a div`
)

// Original / class component

const test2Components = new Array(numberOfRuns)
  .fill(undefined)
  .map((_, index) => {
    return React.createClass({
      render () {
        return null
      }
    })
  })
const test2Array = new Array(numberOfRuns).fill(undefined)
console.time(
  `Original createElement called ${numberOfRuns} times with a class component`
)
test2Array.forEach((_, index) => {
  React.createElement(test2Components[index], { key: index })
})
console.timeEnd(
  `Original createElement called ${numberOfRuns} times with a class component`
)

// Original / class component + try-catch

const test2ComponentsTryCatch = new Array(numberOfRuns)
  .fill(undefined)
  .map((_, index) => {
    return React.createClass({
      render () {
        return null
      }
    })
  })
const test2ArrayTryCatch = new Array(numberOfRuns).fill(undefined)
console.time(
  `Original createElement called ${numberOfRuns} times with a class component (try-catch)`
)
test2ArrayTryCatch.forEach((_, index) => {
  React.createElement(test2ComponentsTryCatch[index], { key: index })
})
console.timeEnd(
  `Original createElement called ${numberOfRuns} times with a class component (try-catch)`
)

// Original / function component

const test3Components = new Array(numberOfRuns)
  .fill(undefined)
  .map((_, index) => {
    return function () {
      return null
    }
  })
const test3Array = new Array(numberOfRuns).fill(undefined)
console.time(
  `Original createElement called ${numberOfRuns} times with a function component`
)
test3Array.forEach((_, index) => {
  React.createElement(test3Components[index], { key: index })
})
console.timeEnd(
  `Original createElement called ${numberOfRuns} times with a function component`
)

// Original / function component + try-catch

const test3ComponentsTryCatch = new Array(numberOfRuns)
  .fill(undefined)
  .map((_, index) => {
    return function () {
      /* eslint-disable no-unreachable */
      try {
        return null
      } catch (err) {
        fakeGuardFn(err)
      }
      /* eslint-enable no-unreachable */
    }
  })
const test3ArrayTryCatch = new Array(numberOfRuns).fill(undefined)
console.time(
  `Original createElement called ${numberOfRuns} times with a function component (try-catch)`
)
test3ArrayTryCatch.forEach((_, index) => {
  React.createElement(test3ComponentsTryCatch[index], { key: index })
})
console.timeEnd(
  `Original createElement called ${numberOfRuns} times with a function component (try-catch)`
)

// Patched / div

const test1ArrayPatched = new Array(numberOfRuns).fill(undefined)
reactGuard(React)
console.time(`Patched createElement called ${numberOfRuns} times with a div`)
test1ArrayPatched.forEach((_, index) => {
  React.createElement('div', { key: index })
})
console.timeEnd(`Patched createElement called ${numberOfRuns} times with a div`)
reactGuard.restore(React)

// Patched / class component

const test2ComponentsPatched = new Array(numberOfRuns)
  .fill(undefined)
  .map((_, index) => {
    return React.createClass({
      render () {
        return null
      }
    })
  })
const test2ArrayPatched = new Array(numberOfRuns).fill(undefined)
reactGuard(React)
console.time(
  `Patched createElement called ${numberOfRuns} times with a class component (cold)`
)
test2ArrayPatched.forEach((_, index) => {
  React.createElement(test2ComponentsPatched[index], { key: index })
})
console.timeEnd(
  `Patched createElement called ${numberOfRuns} times with a class component (cold)`
)
console.time(
  `Patched createElement called ${numberOfRuns} times with a class component (warm)`
)
test2ArrayPatched.forEach((_, index) => {
  React.createElement(test2ComponentsPatched[index], { key: index })
})
console.timeEnd(
  `Patched createElement called ${numberOfRuns} times with a class component (warm)`
)
reactGuard.restore(React)

// Patched / function component

const test3ComponentsPatched = new Array(numberOfRuns)
  .fill(undefined)
  .map((_, index) => {
    return function () {
      return null
    }
  })
const test3ArrayPatched = new Array(numberOfRuns).fill(undefined)
reactGuard(React)
console.time(
  `Patched createElement called ${numberOfRuns} times with a function component (cold)`
)
test3ArrayPatched.forEach((_, index) => {
  React.createElement(test3ComponentsPatched[index], { key: index })
})
console.timeEnd(
  `Patched createElement called ${numberOfRuns} times with a function component (cold)`
)
console.time(
  `Patched createElement called ${numberOfRuns} times with a function component (warm)`
)
test3ArrayPatched.forEach((_, index) => {
  React.createElement(test3ComponentsPatched[index], { key: index })
})
console.timeEnd(
  `Patched createElement called ${numberOfRuns} times with a function component (warm)`
)
reactGuard.restore(React)
