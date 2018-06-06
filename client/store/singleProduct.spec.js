import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'
import { createPostProductThunk, createPutProductThunk } from '../store'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('SingleProduct Reducer', () => {
  let store
  let mockAxios
  const initialState = {}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('Thunk Creators', () => {
    describe('Post Product Thunk', () => {
      it('eventually dispatches the ADD_SINGLE_USER action and returns its id', () => {
        const fakeProduct = {
          id: 1,
          name: 'Kit-Kat',
          description: 'Oat cake soufflé powder carrot cake gummi bears.',
          price: 1.99,
          inventory: 100,
        }
        mockAxios.onPost('/api/products').replyOnce(201, fakeProduct)
        return store.dispatch(createPostProductThunk(fakeProduct))
          .then((productId) => {
            const actions = store.getActions()
            expect(actions[0].type).to.equal('ADD_SINGLE_PRODUCT')
            expect(productId).to.equal(1)
          })
      })
    })

    describe('Put Product Thunk', () => {
      it('eventually dispatches the EDIT_SINGLE_USER action', () => {
        const fakeProduct = {
          id: 1,
          name: 'Kit-Kat',
          description: 'Oat cake soufflé powder carrot cake gummi bears.',
          price: 1.99,
          inventory: 100,
        }
        mockAxios.onPut('/api/products/1').replyOnce(200)
        return store.dispatch(createPutProductThunk(fakeProduct))
          .then(() => {
            const actions = store.getActions()
            expect(actions[0].type).to.equal('EDIT_SINGLE_PRODUCT')
          })
      })
    })
  })
})
