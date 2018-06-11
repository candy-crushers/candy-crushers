const html = require('html-template-tag')

module.exports = (order) => html`
  <h1>Candy Crushers</h1>
  <p>Your package has been delivered safely.</p>
  <h3>Delivery Information</h3>
  <p>If there are other items in your order, they'll be dispatched according to the delivery estimates provided.</p>
  <ul>
    ${order.products.map(product => `<li>${product.order_products.quantity} ${product.name}</li>`)}
  </ul>
`
