/* eslint-disable no-throw-literal */

import reactGuard from '../..'
import naiveReactGuard from '../../naive'
import test from 'ava'
import sinon from 'sinon'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

test.always.afterEach(() => {
  reactGuard.restore(React)
  // Restore spy
  React.createElement.restore && React.createElement.restore()
})
;[
  { title: 'reactGuard', reactGuardFn: reactGuard },
  { title: 'Naive reactGuard', reactGuardFn: naiveReactGuard }
].forEach(({ title, reactGuardFn }) => {
  test(`${title} › a component created using React.createClass`, t => {
    const guardSpy = sinon.spy(() =>
      React.createElement('div', {}, 'w', '0', '0', 't')
    )
    reactGuardFn(React, guardSpy)
    const CreateClassComponent = React.createClass({
      getInitialState () {
        return { b: 'B' }
      },
      render () {
        throw { error: 'test' }
      }
    })
    CreateClassComponent.displayName = 'CreateClassComponent'
    const result = ReactDOMServer.renderToStaticMarkup(
      React.createElement(CreateClassComponent, { a: 'A' }, 'children')
    )
    t.is(result, '<div>w00t</div>')
    t.true(guardSpy.called)
    t.true(
      guardSpy.calledWith(
        { error: 'test' },
        {
          props: { a: 'A', children: 'children' },
          state: { b: 'B' },
          displayName: 'CreateClassComponent'
        }
      )
    )
  })

  test(`${title} › a component created using React.createClass with empty displayName`, t => {
    const guardSpy = sinon.spy(() =>
      React.createElement('div', {}, 'w', '0', '0', 't')
    )
    reactGuardFn(React, guardSpy)
    const CreateClassComponent = React.createClass({
      getInitialState () {
        return { b: 'B' }
      },
      render () {
        throw { error: 'test' }
      }
    })
    CreateClassComponent.displayName = ''
    const result = ReactDOMServer.renderToStaticMarkup(
      React.createElement(CreateClassComponent, { a: 'A' }, 'children')
    )
    t.is(result, '<div>w00t</div>')
    t.true(guardSpy.called)
    t.true(
      guardSpy.calledWith(
        { error: 'test' },
        {
          props: { a: 'A', children: 'children' },
          state: { b: 'B' },
          displayName: 'Constructor'
        }
      )
    )
  })

  test(`${title} › a warm component created using React.createClass`, t => {
    reactGuardFn(React)
    const CreateClassComponent = React.createClass({
      render () {
        return React.createElement('div', {}, 'w', '0', '0', 't')
      }
    })
    React.createElement(CreateClassComponent, { a: 'A' }, 'children')
    const result = ReactDOMServer.renderToStaticMarkup(
      React.createElement(CreateClassComponent, { a: 'A' }, 'children')
    )
    t.is(result, '<div>w00t</div>')
  })

  test(`${title} › a component inherited from React.Component`, t => {
    const guardSpy = sinon.spy(() =>
      React.createElement('div', {}, 'w', '0', '0', 't')
    )
    reactGuardFn(React, guardSpy)
    class ClassComponent extends React.Component {
      constructor (props) {
        super(props)
        this.state = { b: 'B' }
      }
      render () {
        throw { error: 'test' }
      }
    }
    ClassComponent.displayName = 'CustomDisplayName'
    const result = ReactDOMServer.renderToStaticMarkup(
      React.createElement(ClassComponent, { a: 'A' }, 'children')
    )
    t.is(result, '<div>w00t</div>')
    t.true(guardSpy.called)
    t.true(
      guardSpy.calledWith(
        { error: 'test' },
        {
          props: { a: 'A', children: 'children' },
          state: { b: 'B' },
          displayName: 'CustomDisplayName'
        }
      )
    )
  })

  test(`${title} › a component inherited from React.Component with empty displayName`, t => {
    const guardSpy = sinon.spy(() =>
      React.createElement('div', {}, 'w', '0', '0', 't')
    )
    reactGuardFn(React, guardSpy)
    class ClassComponent extends React.Component {
      constructor (props) {
        super(props)
        this.state = { b: 'B' }
      }
      render () {
        throw { error: 'test' }
      }
    }
    ClassComponent.displayName = ''
    const result = ReactDOMServer.renderToStaticMarkup(
      React.createElement(ClassComponent, { a: 'A' }, 'children')
    )
    t.is(result, '<div>w00t</div>')
    t.true(guardSpy.called)
    t.true(
      guardSpy.calledWith(
        { error: 'test' },
        {
          props: { a: 'A', children: 'children' },
          state: { b: 'B' },
          displayName: 'ClassComponent'
        }
      )
    )
  })

  test(`${title} › a warm component inherited from React.Component`, t => {
    reactGuardFn(React)
    class ClassComponent extends React.Component {
      render () {
        return React.createElement('div', {}, 'w', '0', '0', 't')
      }
    }
    React.createElement(ClassComponent, { a: 'A' }, 'children')
    const result = ReactDOMServer.renderToStaticMarkup(
      React.createElement(ClassComponent, { a: 'A' }, 'children')
    )
    t.is(result, '<div>w00t</div>')
  })

  test(`${title} › a component inherited from React.PureComponent`, t => {
    const guardSpy = sinon.spy(() =>
      React.createElement('div', {}, 'w', '0', '0', 't')
    )
    reactGuardFn(React, guardSpy)
    class PureClassComponent extends React.PureComponent {
      render () {
        throw { error: 'test' }
      }
    }
    PureClassComponent.displayName = 'CustomDisplayName'
    const result = ReactDOMServer.renderToStaticMarkup(
      React.createElement(PureClassComponent, { a: 'A' }, 'children')
    )
    t.is(result, '<div>w00t</div>')
    t.true(guardSpy.called)
    t.true(
      guardSpy.calledWith(
        { error: 'test' },
        {
          props: { a: 'A', children: 'children' },
          state: null,
          displayName: 'CustomDisplayName'
        }
      )
    )
  })

  test(`${title} › a component inherited from React.PureComponent`, t => {
    const guardSpy = sinon.spy(() =>
      React.createElement('div', {}, 'w', '0', '0', 't')
    )
    reactGuardFn(React, guardSpy)
    class PureClassComponent extends React.PureComponent {
      render () {
        throw { error: 'test' }
      }
    }
    PureClassComponent.displayName = ''
    const result = ReactDOMServer.renderToStaticMarkup(
      React.createElement(PureClassComponent, { a: 'A' }, 'children')
    )
    t.is(result, '<div>w00t</div>')
    t.true(guardSpy.called)
    t.true(
      guardSpy.calledWith(
        { error: 'test' },
        {
          props: { a: 'A', children: 'children' },
          state: null,
          displayName: 'PureClassComponent'
        }
      )
    )
  })

  test(`${title} › a warm component inherited from React.PureComponent`, t => {
    reactGuardFn(React)
    class PureClassComponent extends React.PureComponent {
      render () {
        return React.createElement('div', {}, 'w', '0', '0', 't')
      }
    }
    React.createElement(PureClassComponent, { a: 'A' }, 'children')
    const result = ReactDOMServer.renderToStaticMarkup(
      React.createElement(PureClassComponent, { a: 'A' }, 'children')
    )
    t.is(result, '<div>w00t</div>')
  })

  test(`${title} › a function component`, t => {
    const guardSpy = sinon.spy(() =>
      React.createElement('div', {}, 'w', '0', '0', 't')
    )
    reactGuardFn(React, guardSpy)
    const FunctionComponent = () => {
      throw { error: 'test' }
    }
    FunctionComponent.displayName = 'FunctionComponent'
    const result = ReactDOMServer.renderToStaticMarkup(
      React.createElement(FunctionComponent, { a: 'A' }, 'children')
    )
    t.is(result, '<div>w00t</div>')
    t.true(guardSpy.called)
    t.true(
      guardSpy.calledWith(
        { error: 'test' },
        {
          props: { a: 'A', children: 'children' },
          displayName: 'FunctionComponent'
        }
      )
    )
  })

  test(`${title} › an arrow function component`, t => {
    const guardSpy = sinon.spy(() =>
      React.createElement('div', {}, 'w', '0', '0', 't')
    )
    reactGuardFn(React, guardSpy)
    const FunctionComponent = () => {
      throw { error: 'test' }
    }
    // Arrow functions don't have the prototype. But because of AVA transpiling
    // the source code, there is no way to test it against real arrow functions.
    FunctionComponent.prototype = undefined
    FunctionComponent.displayName = 'FunctionComponent'
    const result = ReactDOMServer.renderToStaticMarkup(
      React.createElement(FunctionComponent, { a: 'A' }, 'children')
    )
    t.is(result, '<div>w00t</div>')
    t.true(guardSpy.called)
    t.true(
      guardSpy.calledWith(
        { error: 'test' },
        {
          props: { a: 'A', children: 'children' },
          displayName: 'FunctionComponent'
        }
      )
    )
  })

  test(`${title} › a function component with empty displayName`, t => {
    const guardSpy = sinon.spy(() =>
      React.createElement('div', {}, 'w', '0', '0', 't')
    )
    reactGuardFn(React, guardSpy)
    const FunctionComponent = () => {
      throw { error: 'test' }
    }
    FunctionComponent.displayName = ''
    const result = ReactDOMServer.renderToStaticMarkup(
      React.createElement(FunctionComponent, { a: 'A' }, 'children')
    )
    t.is(result, '<div>w00t</div>')
    t.true(guardSpy.called)
    t.true(
      guardSpy.calledWith(
        { error: 'test' },
        { props: { a: 'A', children: 'children' }, displayName: '' }
      )
    )
  })

  test(`${title} › a warm function component`, t => {
    reactGuardFn(React)
    const FunctionComponent = () =>
      React.createElement('div', {}, 'w', '0', '0', 't')
    React.createElement(FunctionComponent, { a: 'A' }, 'children')
    const result = ReactDOMServer.renderToStaticMarkup(
      React.createElement(FunctionComponent, { a: 'A' }, 'children')
    )
    t.is(result, '<div>w00t</div>')
  })

  test(`${title} › default guard`, t => {
    reactGuardFn(React)
    const FunctionComponent = () => {
      throw { error: 'test' }
    }
    const result = ReactDOMServer.renderToStaticMarkup(
      React.createElement(FunctionComponent, { a: 'A' }, 'children')
    )
    t.is(result, '')
  })

  test(`${title} › createElement called on function component passes all 3 arguments`, t => {
    reactGuardFn(React)
    const ComponentSpy = sinon.spy()
    const element = React.createElement(ComponentSpy)
    element.type(
      { props: true },
      { publicContext: true },
      { updateQueue: true }
    )
    t.true(
      ComponentSpy.calledWith(
        { props: true },
        { publicContext: true },
        { updateQueue: true }
      )
    )
  })

  test(`${title} › createElement called on function component saves guarded function`, t => {
    const createElement = sinon.spy(React, 'createElement')
    reactGuardFn(React)
    const FunctionComponent = () => {
      return null
    }
    React.createElement(FunctionComponent)
    React.createElement(FunctionComponent)
    t.is(createElement.args[0][0], createElement.args[1][0])
  })

  test(`${title} › createElement called on function saves all original properties`, t => {
    const createElement = sinon.spy(React, 'createElement')
    reactGuardFn(React)
    const FunctionComponent = () => {
      return null
    }
    FunctionComponent.displayName = 'FunctionComponent'
    FunctionComponent.propTypes = {}
    React.createElement(FunctionComponent)
    const FunctionComponentWrapper = createElement.args[0][0]
    t.is(FunctionComponentWrapper.displayName, 'FunctionComponent')
    t.is(FunctionComponentWrapper.propTypes, FunctionComponent.propTypes)
  })
})

test('restore function restores the original createElement function', t => {
  const createElement = React.createElement
  reactGuard(React)
  reactGuard.restore(React)
  t.is(React.createElement, createElement)
})

test('restore function removes cached create element', t => {
  reactGuard(React)
  reactGuard.restore(React)
  t.false('__reactGuardOriginalCreateElement__' in React)
})

test('restore function saves the original createElement if guard was not called', t => {
  const createElement = React.createElement
  reactGuard.restore(React)
  t.true(typeof createElement === 'function')
  t.is(React.createElement, createElement)
})
