/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import {UserHome} from './user-home'

describe('UserHome', () => {
  let userHome

  beforeEach(() => {
    userHome = shallow(<UserHome user={{email: "cody@email.com", isVerified: true }}  />)
  })

  it('renders the email in an h3', () => {
    expect(userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com')
  })
})
