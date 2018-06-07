import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import { createGetOrderForUserThunk, createGetOrderForAdminThunk } from '../store'
import reducer, { GOT_ORDER } from './single-order'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('SingleOrder Reducer', () => {
  let store
  let mockAxios
  const initialState = []

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  describe('Thunk Creators', () => {
    const fakeOrder = {
        id: 1,
        status: "Created",
        subtotal: 112.43,
        shippingAddress: "456 Broadway, New York, NY 60610",
        email: "cody@email.com",
        userId: 1,
        products: [
        {
          id: 1,
          name: "Kit-Kat",
          description: "Oat cake soufflé powder carrot cake gummi bears.",
          price: 17.42,
          inventory: 100,
          images: [
          "/defaultPhotos/lolies.jpg"
          ],
          createdAt: "2018-06-06T22:35:51.384Z",
          updatedAt: "2018-06-06T22:35:51.384Z",
          order_products: {
            subTotal: 34.84,
            priceAtTime: 17.42,
            quantity: 2,
            createdAt: "2018-06-06T22:35:51.530Z",
            updatedAt: "2018-06-06T22:35:51.530Z",
            productId: 1,
            orderId: 2
        }}
        ],
      }

    describe('Get Order for User Thunk', () => {
      it('eventually dispatches the GOT_ORDER action', () => {
        mockAxios.onGet('/api/user/orders/1').replyOnce(200, fakeOrder)
        return store.dispatch(createGetOrderForUserThunk(1))
          .then(() => {
            const actions = store.getActions()
            expect(actions[0].type).to.equal('GOT_ORDER')
          })
      })
    })

    describe('Get Order for Admin Thunk', () => {
      it('eventually dispatches the GOT_ORDER action', () => {
        mockAxios.onGet('/api/admin/orders/1').replyOnce(200, fakeOrder)
        return store.dispatch(createGetOrderForAdminThunk(1))
          .then(() => {
            const actions = store.getActions()
            expect(actions[0].type).to.equal('GOT_ORDER')
          })
      })
    })
  })

  describe('Reducer', () => {
    it('should return an empty object for initial state', () => {
      const newState = reducer(undefined, {})
      expect(newState).to.be.an('object')
      expect(newState).to.be.empty
    })

    it('should handle GOT_ORDER', () => {
      const newState = reducer([], {type: GOT_ORDER, order: {
          id: 1,
          status: "Created",
          subtotal: 112.43,
          shippingAddress: "456 Broadway, New York, NY 60610",
          email: "cody@email.com",
          userId: 1
        }})
      expect(newState).to.be.an('object')
      expect(newState.id).to.equal(1)
    })
  })
})
