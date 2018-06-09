import React from 'react'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import { assert } from 'chai'

import CandyItem from './CandyItem'

describe('<CandyItem>', () => {
  it('displays the candy name in an h1', () => {
    const candyCane = {
       name : 'Candy Cane',
       description : 'minty and stripe-y',
       price : 2.99,
      images : ["../../puplic/defaultPhotos/lolies.jpg"]
    };
    const wrapper = shallow(<CandyItem product={candyCane} showQuantity={({})}/>)
    assert.equal(wrapper.find('h1').text(), 'Candy Cane')
  })
})





