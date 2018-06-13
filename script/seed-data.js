/* eslint-disable quotes */
const generateId = (length) => Math.floor(Math.random() * length) + 1
const generatePrice = () => {
  const priceInt = Math.floor(Math.random() * 3) + 1;
  const decimal = Math.random().toFixed(2);
  return priceInt + Number(decimal);
}

const userData = [
  {email: 'cody@email.com', password: '123', isAdmin: false},
  {email: 'murphy@email.com', password: '123', isAdmin: false},
  {email: 'admin@candy.com', password: 'candy', isAdmin: true},
]

const productData = [
  {name: 'Kit-Kat', description: "Oat cake soufflé powder carrot cake gummi bears. Cotton candy danish jelly-o wafer gummi bears cookie topping. Croissant icing jelly lemon drops muffin lollipop croissant jelly macaroon. Sweet roll candy topping icing cake candy cupcake chocolate. Jujubes fruitcake halvah. Cotton candy sugar plum lollipop. Powder topping marzipan. Marzipan icing muffin. Macaroon lemon drops candy canes gummi bears.", price: generatePrice(), inventory: 100},
  {name: 'Lollipop', description: "Ice cream oat cake topping gummi bears topping chocolate cake. Tootsie roll tootsie roll croissant cupcake tart. Jelly bear claw bonbon cheesecake pastry cookie dessert biscuit gummi bears. Apple pie marzipan sweet roll tart pastry. Dragée gummi bears cake carrot cake gummies oat cake. Jujubes jujubes chocolate gingerbread biscuit soufflé. Lemon drops jelly beans jelly soufflé tiramisu. Cheesecake jelly-o lollipop. Candy canes topping sesame snaps jelly-o cotton candy fruitcake. Sesame snaps cake lollipop gummi bears.", price: generatePrice(), inventory: 100},
  {name: 'Candy Cane', description: "Tiramisu apple pie marzipan topping. Dessert oat cake croissant wafer cake marshmallow oat cake powder dragée. Croissant bear claw topping muffin macaroon chocolate cake. Cake liquorice bear claw. Oat cake marshmallow carrot cake gingerbread. Gummi bears wafer chocolate bar cupcake ice cream carrot cake jelly jelly-o.", price: generatePrice(), inventory: 100},
  {name: 'Jolly Rancher', description: "Croissant tiramisu icing tiramisu apple pie cupcake bear claw. Carrot cake icing candy. Brownie jelly-o pie. Cookie cake gummi bears pie cake liquorice chocolate bar cake. Tootsie roll donut cotton candy tart macaroon. Fruitcake marzipan jelly sesame snaps jelly pudding jelly-o. Macaroon biscuit apple pie jujubes jelly beans soufflé pudding pastry. Cake chocolate cake tootsie roll biscuit sweet roll pastry.", price: generatePrice(), inventory: 100},
  {name: 'Sour Patch Kids', description: "Muffin gummies cheesecake chupa chups sesame snaps chocolate jujubes chocolate bar tiramisu. Brownie halvah dragée jujubes apple pie cake cheesecake tart chocolate cake. Cake cake jelly. Marzipan lemon drops dragée chocolate bar jelly-o pastry liquorice icing pie. Bear claw cotton candy danish caramels. Danish jujubes sesame snaps tart sweet candy. Sweet roll cookie sesame snaps dragée tiramisu chupa chups macaroon. Jelly-o gummies croissant jujubes candy canes jelly. Jelly-o bear claw pie.", price: generatePrice(), inventory: 100},
  {name: 'M&Ms', description: "Sesame snaps caramels gummi bears. Halvah jelly-o cake gingerbread dragée. Toffee cake pie pie toffee oat cake. Topping danish cake chocolate bar jujubes chocolate cake macaroon. Icing cheesecake sugar plum caramels chocolate bar biscuit pudding tiramisu biscuit. Danish brownie muffin cotton candy jujubes oat cake jelly beans carrot cake. Chocolate cake ice cream cotton candy pudding.", price: generatePrice(), inventory: 100},
  {name: 'Haribo Gummi Bears', description: "Jelly-o muffin donut topping jelly. Chocolate danish pie biscuit chocolate bar sweet danish icing cotton candy. Muffin lemon drops marzipan donut marshmallow. Biscuit chocolate bar marzipan tart cookie wafer dessert carrot cake biscuit. Jelly beans tiramisu cheesecake. Marzipan gummies topping wafer powder caramels chocolate bar chocolate jelly-o. Jelly beans croissant icing cake ice cream. Tiramisu tart bonbon sugar plum marzipan cake icing jelly-o candy.", price: generatePrice(), inventory: 100},
  {name: 'Jelly Belly (assorted)', description: "Lollipop sweet liquorice dessert soufflé biscuit. Halvah croissant gingerbread donut topping soufflé biscuit liquorice. Tiramisu jujubes oat cake cake jelly beans chocolate cake soufflé. Tiramisu halvah gummi bears sugar plum. Pudding candy canes wafer sugar plum candy halvah. Toffee muffin jelly-o pudding lemon drops. Oat cake chocolate bar wafer. Pie macaroon cotton candy macaroon jujubes caramels. Donut pudding cheesecake wafer macaroon oat cake oat cake.", price: generatePrice(), inventory: 100},
  {name: 'Bertie Bott\'s Every Flavor Beans', description: "Tootsie roll jelly dessert. Donut jujubes sugar plum croissant dragée topping donut. Chocolate cake icing sweet tiramisu pudding liquorice cheesecake. Macaroon oat cake carrot cake wafer topping jelly. Candy lollipop candy canes. Bear claw cake macaroon cotton candy croissant ice cream toffee halvah. Fruitcake marzipan oat cake cheesecake carrot cake. Oat cake liquorice topping.", price: generatePrice(), inventory: 100},
  {name: 'Airheads', description: "Oat cake carrot cake sesame snaps toffee tart. Pastry chocolate bar muffin halvah powder. Chupa chups jelly-o sesame snaps pie. Ice cream sweet carrot cake fruitcake chocolate cake icing. Topping gummi bears marzipan cookie candy tootsie roll. Brownie tootsie roll muffin.", price: generatePrice(), inventory: 100}
]

const categoryData = [
  {name: 'chocolate'},
  {name: 'candy bars'},
  {name: 'old fashioned candy'},
  {name: 'bulk candy'},
  {name: 'chewy'},
  {name: 'novelty'},
]

const reviewData = [
  {text: 'Thats not what i saw in my head at all mmm, exactly like that, but different or this red is too red I really think this could go viral. Needs to be sleeker. Give us a complimentary logo along with the website can you please change the color theme of the website to pink and purple?', stars: generateId(5), productId: generateId(productData.length), userId: generateId(userData.length)},
  {text: 'make the logo a bit smaller because the logo is too big can you link the icons to my social media accounts? oh and please put pictures of cats everywhere nor can you turn it around in photoshop so we can see more of the front.', stars: generateId(5), productId: generateId(productData.length), userId: generateId(userData.length)},
  {text: 'There is too much white space will royalties in the company do instead of cash or needs to be sleeker. This is just a 5 minutes job there is too much white space.', stars: generateId(5), productId: generateId(productData.length), userId: generateId(userData.length)},
  {text: 'I want you to take it to the next level. You can get my logo from facebook can you punch up the fun level on these icons or I really like the colour but can you change it,', stars: generateId(5), userId: generateId(userData.length), productId: generateId(productData.length)},
  {text: 'Can you please change the color theme of the website to pink and purple? make the logo a bit smaller because the logo is too big can you link the icons to my social media accounts? oh and please put pictures of cats everywhere start on it today and we will talk about what i want next time yet can you make it look like this clipart i found.', stars: generateId(5), userId: generateId(userData.length), productId: generateId(productData.length)},
  {text: 'Do less with more we are your relatives. We don\'t need a contract, do we. The target audience is makes and famles aged zero and up that sandwich needs to be more playful, yet we try your eye, but can you change everything?.', stars: generateId(5), userId: generateId(userData.length), productId: generateId(productData.length)},
  {text: "Back of the net. We've got to manage that low hanging fruit. Win-win we need a paradigm shift. Touch base we need to have a Come to Jesus meeting with Phil about his attitude. Streamline.", stars: generateId(5), userId: generateId(userData.length), productId: generateId(productData.length)},
  {text: "Minimize backwards overflow re-inventing the wheel, so we need a paradigm shift first-order optimal strategies. Accountable talk idea shower, knowledge process outsourcing yet this is a no-brainer, yet to be inspired is to become creative, innovative and energized we want this philosophy to trickle down to all our stakeholders but timeframe, nor gain traction.", stars: generateId(5), userId: generateId(userData.length), productId: generateId(productData.length)},
  {text: "We need to touch base off-line before we fire the new ux experience. Touch base i don't want to drain the whole swamp, i just want to shoot some alligators lean into that problem .", stars: generateId(5), userId: generateId(userData.length), productId: generateId(productData.length)},
  {text: "Out of scope we need to harvest synergy effects bake it in this is a no-brainer, yet curate we're ahead of the curve on that one for we need a paradigm shift.", stars: generateId(5), userId: generateId(userData.length), productId: generateId(productData.length)},
  {text: "Strategic staircase proceduralize, but parallel path. Blue sky thinking parallel path but deliverables or thinking outside the box root-and-branch review blue money. We need a paradigm shift pushback quarterly sales are at an all-time low for minimize backwards overflow.", stars: generateId(5), userId: generateId(userData.length), productId: generateId(productData.length)},
  {text: "Minimize backwards overflow run it up the flagpole, ping the boss and circle back the last person we talked to said this would be ready yet i'll book a ", stars: generateId(5), userId: generateId(userData.length), productId: generateId(productData.length)}
]

const statuses = ['Created', 'Processing', 'Cancelled', 'Completed']
const randomStatus = () => statuses[Math.floor(Math.random() * 4)]

// Subtotal and users will be fetched from DB during seeding
const orderData = [
  {status: randomStatus(), subtotal: 0, shippingAddress: '123 Main St., Chicago, IL 60601'},
  {status: randomStatus(), subtotal: 0, shippingAddress: '456 Broadway, New York, NY 60610'},
  {status: randomStatus(), subtotal: 0, shippingAddress: '789 Land Dr., Richmond, VA 60611'},
  {status: randomStatus(), subtotal: 0, shippingAddress: '101 Michigan Ave, Chicago, IL 60601'},
  {status: randomStatus(), subtotal: 0, shippingAddress: '321 Hollywood Blvd., Los Angeles, CA 60624'}
]

module.exports = {
  reviewData,
  categoryData,
  productData,
  userData,
  orderData
}
