import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { MemoryRouter } from 'react-router'
import ConfigSwitch from '../components/ConfigSwitch'

describe('ConfigSwitch', () => {
  const node = document.createElement('div')

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  describe('match', () => {
    it('renders component', () => {
      const text = 'HERE'
      const Here = () => <div>{text}</div>
      render((
        <MemoryRouter initialEntries={[ '/here']}>
          <ConfigSwitch routes={[
            { path: '/here', component: Here }
          ]} />
        </MemoryRouter>
      ), node)
      expect(node.textContent).toEqual(expect.stringMatching(text))
    })

    it('renders the first matching component', () => {
      const text = 'HERE'
      render((
        <MemoryRouter initialEntries={[ '/here']}>
          <ConfigSwitch routes={[
            { path: '/nowhere', render: () => <div>nowhere</div> },
            { path: '/here', render: () => <div>{text}</div> }
          ]} />
        </MemoryRouter>
      ), node)
      expect(node.textContent).toEqual(expect.stringMatching(text))
    })
  })
  
  describe('no match', () => {
    it('renders null', () => {
      const text = 'HERE'
      render((
        <MemoryRouter initialEntries={[ '/nowhere' ]}>
          <ConfigSwitch routes={[
            { path: '/here', render: () => <div>{text}</div> },
            { path: '/there', render: () => <div>{text}</div> }
          ]} />
        </MemoryRouter>
      ), node)
      expect(node.textContent).not.toEqual(expect.stringMatching(text))
    })
  })

  describe('location prop', () => {
    it('matches based on props.location, not actual location', () => {
      const text = 'HERE'
      const Here = () => <div>{text}</div>
      render((
        <MemoryRouter initialEntries={[ '/nowhere']}>
          <ConfigSwitch location={{ pathname: '/here' }} routes={[
            { path: '/here', component: Here }
          ]} />
        </MemoryRouter>
      ), node)
      expect(node.textContent).toEqual(expect.stringMatching(text))
    })

    it('child routes access props.location', () => {
      const location = { pathname: '/here' }
      const Here = ({ location }) => <div>{location.pathname}</div>
      render((
        <MemoryRouter initialEntries={[ '/nowhere']}>
          <ConfigSwitch location={location} routes={[
            { path: '/here', component: Here }
          ]} />
        </MemoryRouter>
      ), node)
      expect(node.textContent).toEqual(expect.stringMatching(location.pathname))
    })
  })
})
