import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'
import products,{ GET_PRODUCTS, getProducts, fetchProducts } from './products'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Products Redux Store', () => {

  const fakeProduct = [{
    id: 1,
    name: 'Kit-Kat',
    description: 'Oat cake soufflé powder carrot cake gummi bears.',
    price: 1.99,
    inventory: 100,
  }]

  describe('getProducts action creator', () => {
    const getProductsAction  = getProducts(fakeProduct);

    it('returns a Plain Old Javascript Object', () => {
      expect(typeof getProductsAction).to.equal('object');
      expect(Object.getPrototypeOf(getProductsAction)).to.equal(Object.prototype)
    })

    it('creates an object with `type` and `products`', () => {
      expect(getProductsAction.type).to.equal(GET_PRODUCTS);
      expect(Array.isArray(getProductsAction.products)).to.be.true; // eslint-disable-line no-unused-expressions
      expect(getProductsAction.products[0].name).to.equal('Kit-Kat');
    });
  })

  describe('Products reducer', () => {
    const initialState = []

    const newState = products(
      initialState,
      {
        type: GET_PRODUCTS,
        products : fakeProduct
      }
    )

    it('returns a new state with the updated products', () => {
      expect(newState.products).to.deep.equal(fakeProduct);
    })

    it('does not modify the previous state', () => {
    //  console.log(products);
      expect(initialState).to.deep.equal([]);
    })

  })

  describe('fetchProducts Thunk', () => {
      let store
      let mockAxios
      const initialState = []

      beforeEach(() => {
        mockAxios = new MockAdapter(axios)
        store = mockStore(initialState)
      })

      afterEach(() => {
        mockAxios.restore()
        store.clearActions()
      })

      it('fetchProducts() returns a thunk to fetch products from the backend and dispatch a GET_PRODUCTS action', async () => {
        mockAxios.onGet('/api/products').replyOnce(200,fakeProduct);
        await store.dispatch(fetchProducts())
        const actions = store.getActions();
        expect(actions[0].type).to.equal(GET_PRODUCTS);
        expect(actions[0].products).to.deep.equal(fakeProduct);
      });
    })

})
