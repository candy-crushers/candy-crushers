import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import { createPostProductThunk, createPutProductThunk, createGetOrdersThunk } from '../store'
import reducer, { GOT_ORDERS } from './orders'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Orders Reducer', () => {
  let store
  let mockAxios
  const initialState = []

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  describe('Thunk Creators', () => {
    describe('Get Products Thunk', () => {
      const fakeOrders = [
        {
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
      ]
      beforeEach(() => {
        mockAxios.onGet('/api/orders').replyOnce(200, fakeOrders)
      })

      it('eventually dispatches the GOT_ORDERS action', () => {
        return store.dispatch(createGetOrdersThunk())
          .then(() => {
            const actions = store.getActions()
            expect(actions[0].type).to.equal('GOT_ORDERS')
          })
      })
    })
  })

  describe('Reducer', () => {
    it('should return an empty array for initial state', () => {
      const newState = reducer(undefined, {})
      expect(newState).to.be.an('array')
      expect(newState.length).to.equal(0)
    })

    it('should handle GOT_ORDERS', () => {
      const newState = reducer([], {type: GOT_ORDERS, orders: [
        {
          id: 1,
          status: "Created",
          subtotal: 112.43,
          shippingAddress: "456 Broadway, New York, NY 60610",
          email: "cody@email.com",
          userId: 1
        },
        {
          id: 2,
          status: "Processing",
          subtotal: 100,
          shippingAddress: "456 Broadway, New York, NY 60610",
          email: "cody@email.com",
          userId: 2
        },
      ]})
      expect(newState).to.be.an('array')
      expect(newState.length).to.equal(2)
    })
  })
})
