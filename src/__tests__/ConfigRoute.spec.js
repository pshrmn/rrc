import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { MemoryRouter } from 'react-router'
import ConfigRoute from '../components/ConfigRoute'

console.log(Object.keys(expect))

describe('ConfigRoute', () => {
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
          <ConfigRoute route={{ path: '/here', component: Here }} />
        </MemoryRouter>
      ), node)
      expect(node.textContent).toEqual(expect.stringMatching(text))
    })

    it('renders render', () => {
      const text = 'HERE'
      render((
        <MemoryRouter initialEntries={[ '/here' ]}>
          <ConfigRoute route={{ path: '/here', render: () => <div>{text}</div> }} />
        </MemoryRouter>
      ), node)
      expect(node.textContent).toEqual(expect.stringMatching(text))
    })

    it('renders children function', () => {
      const text = 'HERE'
      render((
        <MemoryRouter initialEntries={[ '/here' ]}>
          <ConfigRoute route={{ path: '/here', children: () => <div>{text}</div> }} />
        </MemoryRouter>
      ), node)
      expect(node.textContent).toEqual(expect.stringMatching(text))
    })
  })
  
  describe('no match', () => {
    it('renders children', () => {
      const text = 'HERE'
      render((
        <MemoryRouter initialEntries={[ '/nowhere' ]}>
          <ConfigRoute route={{ path: '/here', children: () => <div>{text}</div> }} />
        </MemoryRouter>
      ), node)
      expect(node.textContent).toEqual(expect.stringMatching(text))
    })

    it('renders null', () => {
      const text = 'HERE'
      render((
        <MemoryRouter initialEntries={[ '/nowhere' ]}>
          <ConfigRoute route={{ path: '/here', render: () => <div>{text}</div> }} />
        </MemoryRouter>
      ), node)
      expect(node.textContent).not.toEqual(expect.stringMatching(text))
    })
  })
})
