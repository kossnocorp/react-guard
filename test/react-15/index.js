/* eslint-disable no-throw-literal */

import reactGuard from '../..'
import naiveReactGuard from '../../naive'
import test from 'ava'
import sinon from 'sinon'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

test.always.afterEach(() => {
  reactGuard.restore(React)
})

;[{title: 'reactGuard', reactGuardFn: reactGuard}, {title: 'Naive reactGuard', reactGuardFn: naiveReactGuard}].forEach(({title, reactGuardFn}) => {
  test(`${title} › a component created using React.createClass`, t => {
    const guardSpy = sinon.spy(() => React.createElement('div', {}, 'w', '0', '0', 't'))
    reactGuardFn(React, guardSpy)
    const CreateClassComponent = React.createClass({
      getInitialState () { return {b: 'B'} },
      render () { throw {error: 'test'} }
    })
    const result = ReactDOMServer.renderToStaticMarkup(React.createElement(CreateClassComponent, {a: 'A'}, 'children'))
    t.is(result, '<div>w00t</div>')
    t.true(guardSpy.called)
    t.true(guardSpy.calledWith({error: 'test'}, {props: {a: 'A', children: 'children'}, state: {b: 'B'}}))
  })

  test(`${title} › a warm component created using React.createClass`, t => {
    reactGuardFn(React)
    const CreateClassComponent = React.createClass({
      render () {
        return React.createElement('div', {}, 'w', '0', '0', 't')
      }
    })
    React.createElement(CreateClassComponent, {a: 'A'}, 'children')
    const result = ReactDOMServer.renderToStaticMarkup(React.createElement(CreateClassComponent, {a: 'A'}, 'children'))
    t.is(result, '<div>w00t</div>')
  })

  test(`${title} › a component inherited from React.Component`, t => {
    const guardSpy = sinon.spy(() => React.createElement('div', {}, 'w', '0', '0', 't'))
    reactGuardFn(React, guardSpy)
    class ClassComponent extends React.Component {
      constructor (props) {
        super(props)
        this.state = {b: 'B'}
      }
      render () { throw {error: 'test'} }
    }
    const result = ReactDOMServer.renderToStaticMarkup(React.createElement(ClassComponent, {a: 'A'}, 'children'))
    t.is(result, '<div>w00t</div>')
    t.true(guardSpy.called)
    t.true(guardSpy.calledWith({error: 'test'}, {props: {a: 'A', children: 'children'}, state: {b: 'B'}}))
  })

  test(`${title} › a warm component inherited from React.Component`, t => {
    reactGuardFn(React)
    class ClassComponent extends React.Component {
      render () {
        return React.createElement('div', {}, 'w', '0', '0', 't')
      }
    }
    React.createElement(ClassComponent, {a: 'A'}, 'children')
    const result = ReactDOMServer.renderToStaticMarkup(React.createElement(ClassComponent, {a: 'A'}, 'children'))
    t.is(result, '<div>w00t</div>')
  })

  test(`${title} › a warm component inherited from React.Component`, t => {
    reactGuardFn(React)
    class ClassComponent extends React.Component {
      render () { return React.createElement('div', {}, 'w', '0', '0', 't') }
    }
    React.createElement(ClassComponent, {a: 'A'}, 'children')
    const result = ReactDOMServer.renderToStaticMarkup(React.createElement(ClassComponent, {a: 'A'}, 'children'))
    t.is(result, '<div>w00t</div>')
  })

  test(`${title} › a component inherited from React.PureComponent`, t => {
    const guardSpy = sinon.spy(() => React.createElement('div', {}, 'w', '0', '0', 't'))
    reactGuardFn(React, guardSpy)
    class PureClassComponent extends React.PureComponent {
      render () { throw {error: 'test'} }
    }
    const result = ReactDOMServer.renderToStaticMarkup(React.createElement(PureClassComponent, {a: 'A'}, 'children'))
    t.is(result, '<div>w00t</div>')
    t.true(guardSpy.called)
    t.true(guardSpy.calledWith({error: 'test'}, {props: {a: 'A', children: 'children'}, state: null}))
  })

  test(`${title} › a warm component inherited from React.PureComponent`, t => {
    reactGuardFn(React)
    class PureClassComponent extends React.PureComponent {
      render () { return React.createElement('div', {}, 'w', '0', '0', 't') }
    }
    React.createElement(PureClassComponent, {a: 'A'}, 'children')
    const result = ReactDOMServer.renderToStaticMarkup(React.createElement(PureClassComponent, {a: 'A'}, 'children'))
    t.is(result, '<div>w00t</div>')
  })

  test(`${title} › a function component`, t => {
    const guardSpy = sinon.spy(() => React.createElement('div', {}, 'w', '0', '0', 't'))
    reactGuardFn(React, guardSpy)
    const FunctionComponent = () => { throw {error: 'test'} }
    const result = ReactDOMServer.renderToStaticMarkup(React.createElement(FunctionComponent, {a: 'A'}, 'children'))
    t.is(result, '<div>w00t</div>')
    t.true(guardSpy.called)
    t.true(guardSpy.calledWith({error: 'test'}, {props: {a: 'A', children: 'children'}}))
  })

  test(`${title} › a warm function component`, t => {
    reactGuardFn(React)
    const FunctionComponent = () => React.createElement('div', {}, 'w', '0', '0', 't')
    React.createElement(FunctionComponent, {a: 'A'}, 'children')
    const result = ReactDOMServer.renderToStaticMarkup(React.createElement(FunctionComponent, {a: 'A'}, 'children'))
    t.is(result, '<div>w00t</div>')
  })

  test(`${title} › default guard`, t => {
    reactGuardFn(React)
    const FunctionComponent = () => { throw {error: 'test'} }
    const result = ReactDOMServer.renderToStaticMarkup(React.createElement(FunctionComponent, {a: 'A'}, 'children'))
    t.is(result, '')
  })
})
