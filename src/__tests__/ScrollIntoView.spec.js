import React from 'react';
import { mount } from 'enzyme'
import createContext from 'react-router-test-context'

import ScrollIntoView from '../ScrollIntoView'

jest.useFakeTimers()

// mock Element.scrollIntoView
const mockScroll = jest.fn()
Element.prototype.scrollIntoView = mockScroll

describe('<ScrollIntoView>', () => {
  describe('Element.scrollIntoView calls', () => {
    let div

    beforeEach(() => {
      div = document.createElement('div')
      document.body.appendChild(div)
    })

    afterEach(() => {
      mockScroll.mockReset()
      document.body.removeChild(div)
    })

    it('does not call Element.scrollIntoView if there is no id prop', () => {
      const context = createContext({ location: { pathname: '/north-america' }})

      const wrapper = mount((
        <section>
          <ScrollIntoView />
          <div id='usa'>U.S.A.</div>
        </section>
      ), { context, attachTo: div })

      expect(mockScroll.mock.calls.length).toBe(0)
    })

    it('does not call Element.scrollIntOView if no element matches the id', () => {
      const context = createContext({ location: { pathname: '/south-america' }})

      const wrapper = mount((
        <section>
          <ScrollIntoView id='#argentina'/>
          <div id='brazil'>Brazil</div>
        </section>
      ), { context, attachTo: div })


      expect(mockScroll.mock.calls.length).toBe(0)
    })

    it('calls Element.scrollIntoView when mounting', () => {
      const context = createContext({ location: { pathname: '/asia' }})

      const wrapper = mount((
        <section>
          <ScrollIntoView id='#china'/>
          <div id='china'>China</div>
        </section>
      ), { context, attachTo: div })

      jest.runAllTimers()
      expect(mockScroll.mock.calls.length).toBe(1)
    })

    it('calls Element.scrollIntoView when updating', () => {
      const context = createContext({ location: { pathname: '/africa' }})

      // mount
      const wrapper = mount((
        <ScrollIntoView id='#nigeria'>
          <div id='nigeria'>Nigeria</div>
        </ScrollIntoView>
      ), { context, attachTo: div })
      
      jest.runAllTimers()
      expect(mockScroll.mock.calls.length).toBe(1)

      // update
      wrapper.update()
      jest.runAllTimers()
      expect(mockScroll.mock.calls.length).toBe(2)
    })

    it('calls Element.scrollIntoView(false) when alignToTop=false', () => {
      const context = createContext({ location: { pathname: '/europe' }})

      const wrapper = mount((
        <section>
          <ScrollIntoView id='#finland' alignToTop={false} />
          <div id='finland'>Finland</div>
        </section>
      ), { context, attachTo: div })


      jest.runAllTimers()
      expect(mockScroll.mock.calls.length).toBe(1)
      expect(mockScroll.mock.calls[0][0]).toBe(false)
    })
  })

  describe('component', () => {
    it('renders children if provided', () => {
      const context = createContext({ location: { pathname: '/australia' }})
      const text = 'Australia'
      const wrapper = mount((
        <ScrollIntoView id='#australia'>
          <div id='australia'>{text}</div>
        </ScrollIntoView>
      ), { context, attachTo: div })

      const div = wrapper.find('#australia')
      expect(div.text()).toEqual(text)
    })  
  })
})  
