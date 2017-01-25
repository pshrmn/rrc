import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom'
import renderer from 'react-test-renderer'
import ScrollIntoView from '../components/ScrollIntoView'

jest.useFakeTimers()

// mock Element.scrollIntoView
const mockScroll = jest.fn()
Element.prototype.scrollIntoView = mockScroll

describe('<ScrollIntoView>', () => {

  describe('Element.scrollIntoView calls', () => {

    let div
    const id = 'target'
    const hash = `#${id}`

    function renderScroll(scroll, targetID) {
      render((
        <div>
          { scroll }
          <div id={targetID || id}></div>
        </div>
      ), div)
    }

    beforeEach(() => {
      div = document.createElement('div')
      document.body.appendChild(div)
    })

    afterEach(() => {
      mockScroll.mockReset()
      unmountComponentAtNode(div)
      document.body.removeChild(div)
    })

    it('does not call Element.scrollIntoView if there is no id prop', () => {
      renderScroll(<ScrollIntoView />)
      expect(mockScroll.mock.calls.length).toBe(0)
    })

    it('does not call Element.scrollIntOView if no element matches the id', () => {
      renderScroll(<ScrollIntoView id={hash} />, '#other')
      expect(mockScroll.mock.calls.length).toBe(0)
    })

    it('calls Element.scrollIntoView when mounting', () => {
      renderScroll(<ScrollIntoView id={hash}/>)
      jest.runAllTimers()
      expect(mockScroll.mock.calls.length).toBe(1)
    })

    it('calls Element.scrollIntoView when updating', () => {
      // mount
      renderScroll(<ScrollIntoView id={hash}/>)
      jest.runAllTimers()
      expect(mockScroll.mock.calls.length).toBe(1)
      // update
      renderScroll(<ScrollIntoView id={hash}/>)
      jest.runAllTimers()
      expect(mockScroll.mock.calls.length).toBe(2)
    })

    it('calls Element.scrollIntoView(false) when alignToTop=false', () => {
      renderScroll(<ScrollIntoView id={hash} alignToTop={false} />)
      jest.runAllTimers()
      expect(mockScroll.mock.calls.length).toBe(1)
      // first call, first value
      expect(mockScroll.mock.calls[0][0]).toBe(false)
    })
  })

  describe('component', () => {
    it('renders children if provided', () => {
      const TEXT = 'TEXT'
      const Component = renderer.create(
        <ScrollIntoView id='#test'>
          <div id='test'>{TEXT}</div>
        </ScrollIntoView>
      )
      const tree = Component.toJSON()
      expect(tree.type).toEqual('div')
      expect(tree.children[0]).toEqual(TEXT)
    })  
  })
})  
