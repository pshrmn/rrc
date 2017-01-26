import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { MemoryRouter, matchPath } from 'react-router'
import { Link } from 'react-router-dom'
import whenActive from '../components/whenActive'

describe('whenActive', () => {
  const div = document.createElement('div')

  afterEach(() => {
    unmountComponentAtNode(div)
  })

  describe('className', () => {
    it('adds the active className when the location matches', () => {
      const ACTIVE_CLASSNAME = 'ACTIVE_CLASSNAME'
      const ActiveLink = whenActive({
        className: ACTIVE_CLASSNAME
      })(Link)

      render(
        <MemoryRouter initialEntries={[ '/foo' ]} initialIndex={0}>
          <ActiveLink to='/foo'>Active Link</ActiveLink>
        </MemoryRouter>
      , div)
      const link = div.getElementsByTagName('a')[0]
      expect(link.classList).toContain(ACTIVE_CLASSNAME)
    })

    it('adds the active className for partial matches', () => {
      const ACTIVE_CLASSNAME = 'ACTIVE_CLASSNAME'
      const ActiveLink = whenActive({
        className: ACTIVE_CLASSNAME
      })(Link)

      render(
        <MemoryRouter initialEntries={[ '/foo/bar' ]} initialIndex={0}>
          <ActiveLink to='/foo'>Active Link</ActiveLink>
        </MemoryRouter>
      , div)
      const link = div.getElementsByTagName('a')[0]
      expect(link.classList).toContain(ACTIVE_CLASSNAME)
    })

    it('does not include active className when location does not match', () => {
      const ACTIVE_CLASSNAME = 'ACTIVE_CLASSNAME'
      const ActiveLink = whenActive({
        className: ACTIVE_CLASSNAME
      })(Link)

      render(
        <MemoryRouter initialEntries={[ '/foo' ]} initialIndex={0}>
          <ActiveLink to='/baz'>Active Link</ActiveLink>
        </MemoryRouter>
      , div)
      const link = div.getElementsByTagName('a')[0]
      expect(link.classList).not.toContain(ACTIVE_CLASSNAME)
    })
  })

  describe('style', () => {
    it('adds the active style when the location matches', () => {
      const ACTIVE_COLOR = 'red'
      const ActiveLink = whenActive({
        style: {
          color: ACTIVE_COLOR
        }
      })(Link)

      render(
        <MemoryRouter initialEntries={[ '/foo' ]} initialIndex={0}>
          <ActiveLink to='/foo'>Active Link</ActiveLink>
        </MemoryRouter>
      , div)
      const link = div.getElementsByTagName('a')[0]
      expect(link.style.color).toBe(ACTIVE_COLOR)
    })

    it('adds the active style for partial matches', () => {
      const ACTIVE_COLOR = 'red'
      const ActiveLink = whenActive({
        style: {
          color: ACTIVE_COLOR
        }
      })(Link)

      render(
        <MemoryRouter initialEntries={[ '/foo/bar' ]} initialIndex={0}>
          <ActiveLink to='/foo'>Active Link</ActiveLink>
        </MemoryRouter>
      , div)
      const link = div.getElementsByTagName('a')[0]
      expect(link.style.color).toBe(ACTIVE_COLOR)
    })

    it('does not include the active style for partial matches', () => {
      const ACTIVE_COLOR = 'red'
      const INACTIVE_COLOR = 'blue'
      const ActiveLink = whenActive({
        style: {
          color: ACTIVE_COLOR
        }
      })(Link)

      render(
        <MemoryRouter initialEntries={[ '/foo' ]} initialIndex={0}>
          <ActiveLink to='/baz' style={{ color: INACTIVE_COLOR }}>Active Link</ActiveLink>
        </MemoryRouter>
      , div)
      const link = div.getElementsByTagName('a')[0]
      expect(link.style.color).toBe(INACTIVE_COLOR)
    })
  })

  describe('exact', () => {
    it('adds active props when the location matches exactly', () => {
      const ACTIVE_CLASSNAME = 'ACTIVE_CLASSNAME'
      const ActiveLink = whenActive({
        exact: true,
        className: ACTIVE_CLASSNAME
      })(Link)

      render(
        <MemoryRouter initialEntries={[ '/foo/bar' ]} initialIndex={0}>
          <ActiveLink to='/foo/bar'>Active Link</ActiveLink>
        </MemoryRouter>
      , div)
      const link = div.getElementsByTagName('a')[0]
      expect(link.classList).toContain(ACTIVE_CLASSNAME)
    })

    it('does not include active props for non-exact location matches', () => {
      const ACTIVE_CLASSNAME = 'ACTIVE_CLASSNAME'
      const ActiveLink = whenActive({
        exact: true,
        className: ACTIVE_CLASSNAME
      })(Link)

      render(
        <MemoryRouter initialEntries={[ '/foo/bar' ]} initialIndex={0}>
          <ActiveLink to='/foo'>Active Link</ActiveLink>
        </MemoryRouter>
      , div)
      const link = div.getElementsByTagName('a')[0]
      expect(link.classList).not.toContain(ACTIVE_CLASSNAME)
    })
  })

  describe('strict', () => {
    it('matches location strictly when true', () => {
      const ACTIVE_CLASSNAME = 'ACTIVE_CLASSNAME'
      const ActiveLink = whenActive({
        strict: true,
        className: ACTIVE_CLASSNAME
      })(Link)

      render(
        <MemoryRouter initialEntries={[ '/food' ]} initialIndex={0}>
          <ActiveLink to='/food/'>Active Link</ActiveLink>
        </MemoryRouter>
      , div)

      const link = div.getElementsByTagName('a')[0]
      expect(link.classList).not.toContain(ACTIVE_CLASSNAME)
    })

    it('does not match location strictly when false (default)', () => {
      const ACTIVE_CLASSNAME = 'ACTIVE_CLASSNAME'
      const ActiveLink = whenActive({
        strict: false,
        className: ACTIVE_CLASSNAME
      })(Link)

      render(
        <MemoryRouter initialEntries={[ '/food' ]} initialIndex={0}>
          <ActiveLink to='/food/'>Active Link</ActiveLink>
        </MemoryRouter>
      , div)
      const link = div.getElementsByTagName('a')[0]
      expect(link.classList).toContain(ACTIVE_CLASSNAME)
    })
  })


  describe('pathProp', () => {

    const LocationComponent = (props) => (
      <p className={props.className}>{props.children}</p>
    )

    it('defaults to "to"', () => {
      const ACTIVE_CLASSNAME = 'ACTIVE_CLASSNAME'
      const ActiveLocation = whenActive({
        className: ACTIVE_CLASSNAME
      })(LocationComponent)

      render(
        <MemoryRouter initialEntries={[ '/foo' ]} initialIndex={0}>
          <ActiveLocation to='/foo'>Active Location</ActiveLocation>
        </MemoryRouter>
      , div)
      const p = div.getElementsByTagName('p')[0]
      expect(p.classList).toContain(ACTIVE_CLASSNAME)
    })

    it('gets location from pathProp if provided', () => {
      const ACTIVE_CLASSNAME = 'ACTIVE_CLASSNAME'
      const ActiveLocation = whenActive({
        className: ACTIVE_CLASSNAME,
        pathProp: 'loc'
      })(LocationComponent)

      render(
        <MemoryRouter initialEntries={[ '/foo' ]} initialIndex={0}>
          <ActiveLocation loc='/foo'>Active Location</ActiveLocation>
        </MemoryRouter>
      , div)
      const p = div.getElementsByTagName('p')[0]
      expect(p.classList).toContain(ACTIVE_CLASSNAME)
    })

    describe('isActive', () => {
      it('uses custom function if provided', () => {
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
              if (!exact) {
                return true
              } else {
                if (match.isExact) {
                  return true
                }
              }
            }
            return active
          }
        })(LocationComponent)

        render(
          <MemoryRouter initialEntries={[ '/foo' ]} initialIndex={0}>
            <ActiveLocation locs={['/bar', '/foo']}>Active Location</ActiveLocation>
          </MemoryRouter>
        , div)
        const p = div.getElementsByTagName('p')[0]
        expect(p.classList).toContain(ACTIVE_CLASSNAME)  
      })
    })

  })
})