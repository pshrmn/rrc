import React from 'react'
import { shallow, mount } from 'enzyme'
import createContext from 'react-router-test-context'
import { Route } from 'react-router'

import wrapSwitch from '../wrapSwitch'

describe('wrapSwitch\'s returned component', () => {
  const Wrapper = ({ children }) => (
    <div className='wrapper'>
      {children}
    </div>
  )

  const WrappedSwitch = wrapSwitch(Wrapper)

  it('returns element with wrapped type', () => {
    const context = createContext({ location: { pathname: '/two' }})
    const wrapper = shallow(<WrappedSwitch routes={[]} />, { context })

    expect(wrapper.type()).toBe(Wrapper)
  })

  it('has the correct display name', () => {
    expect(WrappedSwitch.displayName).toEqual(`wrapSwitch(${Wrapper.name})`)
  })

  it('sets the correct key on the rendererd <Route>', () => {
    const context = createContext({ location: { pathname: '/one/two' }})

    const One = () => <div>One</div>
    const wrapper = mount((
      <WrappedSwitch routes={[
        { path: '/one', component: One }
      ]} />
    ), { context })

    const renderedRoute = wrapper.find(Route)
    expect(renderedRoute.key()).toBe('/one')
  })

  it('passes extra props to the wrapped component', () => {
    const context = createContext({ location: { pathname: '/one' }})
    const extraProps = {
      one: 1,
      two: 2
    }

    const One = () => <div>One</div>

    const wrapper = mount((
      <WrappedSwitch {...extraProps} routes={[
        { path: '/one', component: One }
      ]} />
    ), { context })
    const w = wrapper.find(Wrapper)
    const receivedProps = w.props()
    expect(receivedProps.one).toEqual(extraProps.one)
    expect(receivedProps.two).toEqual(extraProps.two)
  })

  it('calls the getKey function if passed as prop', () => {
    const context = createContext({ location: { pathname: '/one' }})

    const One = () => <div>One</div>
    const wrapper = mount((
      <WrappedSwitch
        getKey={() => 'the-key'}
        routes={[
          { path: '/one', component: One }
        ]}
      />
    ), { context })

    const renderedRoute = wrapper.find(Route)
    expect(renderedRoute.key()).toBe('the-key')
  })


  describe('a route matches', () => {
    it('renders component', () => {
      const context = createContext({ location: { pathname: '/match' }})

      const Match = () => <div>Match</div>
      const wrapper = mount((
        <WrappedSwitch routes={[ { path: '/match', component: Match } ]} />
      ), { context })

      const foundMatch = wrapper.find(Match)
      expect(foundMatch.exists()).toBe(true)
    })

    it('renders route', () => {
      const context = createContext({ location: { pathname: '/match' }})

      const Match = () => <div>Match</div>
      const wrapper = mount((
        <WrappedSwitch
          routes={[
            { path: '/match', render: props => <Match {...props} /> }
          ]}
        />
      ), { context })

      const foundMatch = wrapper.find(Match)
      expect(foundMatch.exists()).toBe(true)
    })

    it('renders children', () => {
      const context = createContext({ location: { pathname: '/match' }})

      const Match = () => <div>Match</div>
      const wrapper = mount((
        <WrappedSwitch
          routes={[
            { path: '/match', children: props => <Match {...props} /> }
          ]}
        />
      ), { context })

      const foundMatch = wrapper.find(Match)
      expect(foundMatch.exists()).toBe(true)
    })

    it('renders the first matching component', () => {
      const context = createContext({ location: { pathname: '/two' }})

      const One = () => <div>One</div>
      const Two = () => <div>Two</div>
      const wrapper = mount((
        <WrappedSwitch routes={[
          { path: '/one', component: One },
          { path: '/two', component: Two }
        ]} />
      ), { context })

      expect(wrapper.contains(<div>One</div>)).toBe(false)
      expect(wrapper.contains(<div>Two</div>)).toBe(true)
    })

    describe('inject', () => {
      it('passes injected props to route.component', () => {
        const context = createContext({ location: { pathname: '/component' }})
        const inject = {
          color: 'red',
          nestedObj: { one: 'two' }
        }
        const Match = () => <div>Match</div>
        const wrapper = mount((
          <WrappedSwitch
            routes={[
              { path: '/component', component: Match, inject }
            ]}
          />
        ), { context })

        const foundMatch = wrapper.find(Match)
        const props = foundMatch.props()
        Object.keys(inject).forEach(key => {
          expect(props[key]).toEqual(inject[key])
        })
      })

      it('does not work with render property', () => {
        const err = console.error
        console.error = jest.fn()

        const context = createContext({ location: { pathname: '/render' }})
        const inject = {
          color: 'red',
          nestedObj: { one: 'two' }
        }
        const Match = () => <div>Match</div>
        const wrapper = mount((
          <WrappedSwitch
            routes={[
              { path: '/render', render: props => <Match {...props} />, inject }
            ]}
          />
        ), { context })

        const foundMatch = wrapper.find(Match)
        expect(console.error.mock.calls.length).toBe(1)

        const props = foundMatch.props()
        Object.keys(inject).forEach(key => {
          expect(props[key]).toBeUndefined()
        })

        console.error = err
      })

      it('does not work with children property', () => {
        const err = console.error
        console.error = jest.fn()

        const context = createContext({ location: { pathname: '/children' }})
        const inject = {
          color: 'red',
          nestedObj: { one: 'two' }
        }
        const Match = () => <div>Match</div>
        const wrapper = mount((
          <WrappedSwitch
            routes={[
              { path: '/children', children: props => <Match {...props} />, inject }
            ]}
          />
        ), { context })

        const foundMatch = wrapper.find(Match)
        expect(console.error.mock.calls.length).toBe(1)
        const props = foundMatch.props()
        Object.keys(inject).forEach(key => {
          expect(props[key]).toBeUndefined()
        })

        console.error = err
      })
    })
  })
})
