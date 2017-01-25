import React from 'react';
import withScroll from '../components/withScroll'
import ScrollIntoView from '../components/ScrollIntoView'

describe('withScroll', () => {
  describe('wraps a component in a <ScrollIntoView>', () => {

    const TestDiv = () => <div id='test'>TEST</div>
    const WrappedComponent = withScroll(TestDiv)

    it('returns the correct display name', () => {
      expect(WrappedComponent.displayName).toEqual(`withScroll(${TestDiv.name})`)
    })

    it('wrapped component has type ScrollIntoView', () => {
      const instance = WrappedComponent()
      expect(instance.type).toBe(ScrollIntoView)
    })

    describe('options', () => {
      describe('propId', () => {
        it('defaults to using location.hash value', () => {
          const hash = '#hash'
          const WrappedComponent = withScroll(TestDiv)
          const instance = WrappedComponent({ history: { location: { hash }}})
          expect(instance.props.id).toEqual(hash)
        })

        it('determines id using propId option', () => {
          const expectedId = '#expected'
          const WrappedComponent = withScroll(TestDiv, {
            propId: () => expectedId
          })
          const instance = WrappedComponent()
          expect(instance.props.id).toEqual(expectedId)
        })
      })

      describe('alignToTop', () => {
        it('defaults to true', () => {
          const WrappedComponent = withScroll(TestDiv)
          const instance = WrappedComponent()
          expect(instance.props.alignToTop).toBe(true)
        })

        it('determines alignToTop using alignToTop option', () => {
          const WrappedComponent = withScroll(TestDiv, {
            alignToTop: false
          })
          const instance = WrappedComponent()
          expect(instance.props.alignToTop).toBe(false)
        })
        
      })
    })
  })

})