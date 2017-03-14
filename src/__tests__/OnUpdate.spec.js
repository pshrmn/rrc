import React from 'react'
import { mount } from 'enzyme'
import createContext from 'react-router-test-context'

import OnUpdate from '../OnUpdate'

describe('OnUpdate', () => {

  describe('call', () => {
    it('calls the function when the location changes', () => {
      const context = createContext({
        location: { pathname: '/first' }
      })
      const callSpy = jest.fn()
      const wrapper = mount(<OnUpdate call={callSpy} />, { context })

      expect(callSpy.mock.calls.length).toBe(0)
      const newLocation = { pathname: '/second' }
      context.router.history.push(newLocation)

      expect(callSpy.mock.calls.length).toBe(1)
      expect(callSpy.mock.calls[0][0].pathname).toBe(newLocation.pathname)
    })

    it('doesn\'t call the function on non-navigation re-renders', () => {
      const context = createContext({
        location: { pathname: '/first' }
      })
      const callSpy = jest.fn()
      const wrapper = mount(<OnUpdate call={callSpy} />, { context })

      expect(callSpy.mock.calls.length).toBe(0)
      wrapper.update()
      expect(callSpy.mock.calls.length).toBe(0)
    })
  })

  describe('immediate', () => {
    it('calls the call function when OnUpdate mounts', () => {
      const context = createContext({
        location: { pathname: '/first' }
      })
      const callSpy = jest.fn()
      expect(callSpy.mock.calls.length).toBe(0)

      const wrapper = mount(<OnUpdate immediate call={callSpy} />, { context })

      expect(callSpy.mock.calls.length).toBe(1)
      expect(callSpy.mock.calls[0][0].pathname).toBe('/first')
    })
  })
})
