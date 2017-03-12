import React from 'react'
import { mount } from 'enzyme'
import createContext from './testContext'

import ConfigSwitch from '../ConfigSwitch'

describe('ConfigSwitch', () => {

  const contextAt = pathname => createContext({ location: { pathname }})

  describe('a route matches', () => {
    it('renders component', () => {
      const context = contextAt('/match')

      const Match = () => <div>Match</div>
      const wrapper = mount((
        <ConfigSwitch routes={[ { path: '/match', component: Match } ]} />
      ), { context })

      const foundMatch = wrapper.find(Match)
      expect(foundMatch.exists()).toBe(true)
    })

    it('renders the first matching component', () => {
      const context = contextAt('/two')

      const One = () => <div>One</div>
      const Two = () => <div>Two</div>
      const wrapper = mount((
        <ConfigSwitch routes={[
          { path: '/one', component: One },
          { path: '/two', component: Two }
        ]} />
      ), { context })

      expect(wrapper.contains(<div>One</div>)).toBe(false)
      expect(wrapper.contains(<div>Two</div>)).toBe(true)
    })
  })
  
  describe('no routes match', () => {
    it('renders null', () => {
      const context = contextAt('/none-of-the-above')

      const One = () => <div>One</div>
      const Two = () => <div>Two</div>
      const Three = () => <div>Three</div>

      const wrapper = mount((
        <ConfigSwitch routes={[
          { path: '/one', component: One },
          { path: '/two', component: Two },
          { path: '/three', component: Three }
        ]} />
      ), { context })

      expect(wrapper.html()).toEqual(null)

    })
  })

  describe('<ConfigSwitch location>', () => {
    it('matches based on props.location, not actual location', () => {
      const context = contextAt('/two')

      const One = () => <div>One</div>
      const Two = () => <div>Two</div>
      const wrapper = mount((
        <ConfigSwitch
          location={{ pathname: '/one' }}
          routes={[
            { path: '/one', component: One },
            { path: '/two', component: Two }
          ]}
        />
      ), { context })

      expect(wrapper.contains(<div>One</div>)).toBe(true)
      expect(wrapper.contains(<div>Two</div>)).toBe(false)
    })

    it('rendered route is given location as a prop', () => {
      const context = contextAt('/nowhere')

      const switchLocation = { pathname: '/match' }
      const Match = () => <div>Match</div>
      const wrapper = mount((
        <ConfigSwitch
          location={switchLocation}
          routes={[ { path: '/match', component: Match } ]}
        />
      ), { context })

      const foundMatch = wrapper.find(Match)
      expect(foundMatch.props().location).toBe(switchLocation)
    })
  })
})
