import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { Router } from 'react-router'
import { createMemoryHistory } from 'history'
import OnUpdate from '../OnUpdate'

describe('OnUpdate', () => {
  const div = document.createElement('div')

  afterEach(() => {
    unmountComponentAtNode(div)
  })

  describe('call', () => {
    it('calls the function when the location changes', () => {
      const history = createMemoryHistory()
      const callSpy = jest.fn()
      render((
        <Router history={history}>
          <OnUpdate call={callSpy} />
        </Router>
      ), div)
      expect(callSpy.mock.calls.length).toBe(0)
      const newPathname = '/other'
      history.push(newPathname)
      expect(callSpy.mock.calls.length).toBe(1)
      expect(callSpy.mock.calls[0][0].pathname).toBe(newPathname)
    })
  })

  describe('immediate', () => {
    it('calls the call function when OnUpdate mounts', () => {
      const history = createMemoryHistory()
      const callSpy = jest.fn()
      render((
        <Router history={history}>
          <OnUpdate immediate call={callSpy} />
        </Router>
      ), div)
      expect(callSpy.mock.calls.length).toBe(1)
    })
  })
})