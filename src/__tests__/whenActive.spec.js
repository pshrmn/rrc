import React from 'react'
import { mount } from 'enzyme'
import createContext from 'react-router-test-context'

import { matchPath } from 'react-router'
import { Link } from 'react-router-dom'
import whenActive from '../whenActive'

describe('whenActive', () => {

  describe('className', () => {
    it('adds the active className when the location matches', () => {
      const context = createContext({ location: { pathname: '/panda' }})
      const ACTIVE_CLASSNAME = 'ACTIVE_CLASSNAME'
      const ActiveLink = whenActive({
        className: ACTIVE_CLASSNAME
      })(Link)

      const wrapper = mount(<ActiveLink to='/panda'>Link</ActiveLink>, { context })

      const link = wrapper.find('a')
      expect(link.props().className).toEqual(
        expect.stringContaining(ACTIVE_CLASSNAME)
      )
    })

    it('adds the active className for partial matches', () => {
      const context = createContext({ location: { pathname: '/lions/tigers' }})
      const ACTIVE_CLASSNAME = 'ACTIVE_CLASSNAME'
      const ActiveLink = whenActive({
        className: ACTIVE_CLASSNAME
      })(Link)

      const wrapper = mount(<ActiveLink to='/lions'>Link</ActiveLink>, { context })

      const link = wrapper.find('a')
      expect(link.props().className).toEqual(
        expect.stringContaining(ACTIVE_CLASSNAME)
      )
    })

    it('does not include active className when location does not match', () => {
      const context = createContext({ location: { pathname: '/bears' }})
      const ACTIVE_CLASSNAME = 'ACTIVE_CLASSNAME'
      const ActiveLink = whenActive({
        className: ACTIVE_CLASSNAME
      })(Link)

      const wrapper = mount(<ActiveLink to='/ohmy'>Link</ActiveLink>, { context })

      const link = wrapper.find('a')
      expect(link.props().className).not.toEqual(
        expect.stringContaining(ACTIVE_CLASSNAME)
      )
    })
  })

  describe('style', () => {
    it('adds the active style when the location matches', () => {
      const context = createContext({ location: { pathname: '/koala' }})
      const ACTIVE_COLOR = 'red'
      const ActiveLink = whenActive({
        style: {
          color: ACTIVE_COLOR
        }
      })(Link)

      const wrapper = mount(<ActiveLink to='/koala'>Link</ActiveLink>, { context })

      const link = wrapper.find('a')
      expect(link.props().style.color).toEqual(ACTIVE_COLOR)
    })

    it('adds the active style for partial matches', () => {
      const context = createContext({ location: { pathname: '/spider/tarantula' }})
      const ACTIVE_COLOR = 'red'
      const ActiveLink = whenActive({
        style: {
          color: ACTIVE_COLOR
        }
      })(Link)

      const wrapper = mount(<ActiveLink to='/spider'>Link</ActiveLink>, { context })

      const link = wrapper.find('a')
      expect(link.props().style.color).toEqual(ACTIVE_COLOR)
    })

    it('does not include the active style when the location does not match', () => {
      const context = createContext({ location: { pathname: '/gorilla' }})
      const ACTIVE_COLOR = 'red'
      const INACTIVE_COLOR = 'blue'
      const ActiveLink = whenActive({
        style: {
          color: ACTIVE_COLOR
        }
      })(Link)

      const wrapper = mount((
        <ActiveLink
          to='/orangutan'
          style={{ color: INACTIVE_COLOR }}
        >
          Link
        </ActiveLink>
      ), { context })

      const link = wrapper.find('a')
      expect(link.props().style.color).toEqual(INACTIVE_COLOR)
    })
  })

  describe('exact', () => {
    it('adds active props when the location matches exactly', () => {
      const context = createContext({ location: { pathname: '/lizard/iguana' }})
      const ACTIVE_CLASSNAME = 'ACTIVE_CLASSNAME'
      const ActiveLink = whenActive({
        className: ACTIVE_CLASSNAME,
        exact: true
      })(Link)

      const wrapper = mount(<ActiveLink to='/lizard/iguana'>Link</ActiveLink>, { context })

      const link = wrapper.find('a')
      expect(link.props().className).toEqual(
        expect.stringContaining(ACTIVE_CLASSNAME)
      )
    })

    it('does not include active props for non-exact location matches', () => {
      const context = createContext({ location: { pathname: '/lizard/chameleon' }})
      const ACTIVE_CLASSNAME = 'ACTIVE_CLASSNAME'
      const ActiveLink = whenActive({
        className: ACTIVE_CLASSNAME,
        exact: true
      })(Link)

      const wrapper = mount(<ActiveLink to='/lizard'>Link</ActiveLink>, { context })

      const link = wrapper.find('a')
      expect(link.props().className).not.toEqual(
        expect.stringContaining(ACTIVE_CLASSNAME)
      )
    })
  })

  describe('strict', () => {
    it('matches location strictly when true', () => {
      const context = createContext({ location: { pathname: '/giraffe' }})
      const ACTIVE_CLASSNAME = 'ACTIVE_CLASSNAME'
      const ActiveLink = whenActive({
        className: ACTIVE_CLASSNAME,
        strict: true
      })(Link)

      const wrapper = mount(<ActiveLink to='/giraffe/'>Link</ActiveLink>, { context })

      const link = wrapper.find('a')
      expect(link.props().className).not.toEqual(
        expect.stringContaining(ACTIVE_CLASSNAME)
      )
    })

    it('does not match location strictly when false (default)', () => {
      const context = createContext({ location: { pathname: '/hippo' }})
      const ACTIVE_CLASSNAME = 'ACTIVE_CLASSNAME'
      const ActiveLink = whenActive({
        className: ACTIVE_CLASSNAME
      })(Link)

      const wrapper = mount(<ActiveLink to='/hippo/'>Link</ActiveLink>, { context })

      const link = wrapper.find('a')
      expect(link.props().className).toEqual(
        expect.stringContaining(ACTIVE_CLASSNAME)
      )
    })
  })


  describe('pathProp', () => {
    const LocationComponent = (props) => (
      <p className={props.className}>{props.children}</p>
    )

    it('defaults to "to"', () => {
      const context = createContext({ location: { pathname: '/rhino' }})
      const ACTIVE_CLASSNAME = 'ACTIVE_CLASSNAME'
      const ActiveLocation = whenActive({
        className: ACTIVE_CLASSNAME
      })(LocationComponent)

      const wrapper = mount(<ActiveLocation to='/rhino'>Link</ActiveLocation>, { context })

      const link = wrapper.find(LocationComponent)
      expect(link.props().className).toEqual(
        expect.stringContaining(ACTIVE_CLASSNAME)
      )
    })

    it('gets location from pathProp if provided', () => {
      const context = createContext({ location: { pathname: '/buffalo' }})
      const ACTIVE_CLASSNAME = 'ACTIVE_CLASSNAME'
      const ActiveLocation = whenActive({
        className: ACTIVE_CLASSNAME,
        pathProp: 'loc'
      })(LocationComponent)

      const wrapper = mount(<ActiveLocation loc='/buffalo'>Link</ActiveLocation>, { context })

      const link = wrapper.find(LocationComponent)
      expect(link.props().className).toEqual(
        expect.stringContaining(ACTIVE_CLASSNAME)
      )
    })
  })

  describe('isActive', () => {
    const LocationComponent = (props) => (
      <p className={props.className}>{props.children}</p>
    )

    it('uses custom function if provided', () => {
      const context = createContext({ location: { pathname: '/zebra' }})
      const ACTIVE_CLASSNAME = 'ACTIVE_CLASSNAME'
      const ActiveLocation = whenActive({
        className: ACTIVE_CLASSNAME,
        isActive: (pathname, props) => {
          let active = false
          const exact = true
          const locations = props['locs']
          for (let i=0; i<locations.length; i++){
            const match = matchPath(pathname, locations[i], { exact })
            if (!match) {
              continue
            }

            if (!exact || (exact && match.isExact)) {
              return true
            }
          }
          return active
        }
      })(LocationComponent)

      const wrapper = mount((
        <ActiveLocation locs={['/gazelle', '/zebra']}>Active Location</ActiveLocation>
      ), { context })

      const link = wrapper.find(LocationComponent)
      expect(link.props().className).toEqual(
        expect.stringContaining(ACTIVE_CLASSNAME)
      )
    })
  })
})
