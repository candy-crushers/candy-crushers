const { expect } = require('chai')
const { Order, User } = require('./')

describe('Order model', () => {
  const order = {
    status: 'Created',
    subtotal: 5.00,
    shippingAddress: '123 Main St., Chicago, IL 60601',
    userId: 1
  }

  describe('instance methods', () => {
    it('format the date to a user friendly string', async () => {
      const date = new Date(2018, 0, 1)
      await User.create({email: 'user@test.com', password: 'test', isAdmin: false})
      const newOrder = await Order.create(order)

      expect(newOrder.formatDate(date)).to.equal('Mon Jan 01 2018')
    })
  })

  describe('virtual fields', () => {
    it('will return an order date', async () => {
      await User.create({email: 'user@test.com', password: 'test', isAdmin: false})
      const newOrder = await Order.create(order)

      expect(newOrder.orderDate).to.be.an('string')
      expect(newOrder.orderDate.length).to.be.greaterThan(0)
    })
  })
})
