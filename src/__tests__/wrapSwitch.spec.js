import React from 'react'
import { shallow, mount } from 'enzyme'
import createContext from './testContext'
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
})
