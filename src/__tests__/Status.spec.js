import React from 'react';
import { shallow } from 'enzyme'
import createContext from 'react-router-test-context'

import Status from '../Status'

describe('Status', () => {
  it('sets the status property on context.router.staticContext', () => {
    const log = {}
    const context = createContext({ staticContext: log })

    const code = '404'
    shallow(<Status code={code} />, { context })

    expect(log.status).toEqual(code)
  })
})
