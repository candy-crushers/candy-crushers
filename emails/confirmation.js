const html = require('html-template-tag')

module.exports = (order) => html`
  <h1></h1>
  <p>Thanks for purchasing from Candy Crushers!</p>
  <h3>Order Summary</h3>
  <ul>
    ${order.products.map(product => `<li>${product.name} - ${(product.price/100).toFixed(2)}</li>`)}
  </ul>
`
