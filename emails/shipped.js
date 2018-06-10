const html = require('html-template-tag')

module.exports = (order) => html`
  <h1>Candy Crushers</h1>
  <p>Your package will arrive in 3 days</p>
  <h3>Shipping To</h3>
  <p>${order.shippingAddress}</p>
  <p>If you have any questions, please contact our Customer Support team at <a href="tel:1-555-123-5555">555-123-5555</a></p>
`
