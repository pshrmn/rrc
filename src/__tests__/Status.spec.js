import React from 'react';
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import Status from '../Status'

describe('Status', () => {
  it('sets the status property of the context object passed to <StaticRouter>', () => {
    const context = {}
    const code = '404'
    renderToString(
      <StaticRouter context={context}>
        <Status code={code} />
      </StaticRouter>
    )
    expect(context.status).toEqual(code)
  })
})
