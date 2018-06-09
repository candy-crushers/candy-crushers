/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

export {default as Navbar} from './product/navbar'
export {default as UserHome} from './user/user-home'
export {default as Products} from './product/products'
export {Login, Signup} from './user/auth-form'
export {default as SingleProduct} from './product/SingleProduct'
export {default as ProductForm} from './admin/product-form'
export {default as AddProduct} from './admin/add-product'
export {default as EditProduct} from './admin/edit-product'
export {default as AdminOrderHistory} from './admin/admin-order-history'
export {default as UserOrderHistory} from './user/user-order-history'
export {default as OrderRow} from './order/order-row'
export {default as Cart} from './order/cart'
export {default as OrderDetail} from './order/order-detail'
export {default as AdminSingleOrder} from './admin/admin-single-order'
export {default as UserSingleOrder} from './user/user-single-order'
export {default as OrderProductDetails} from './order/order-product-details'
export {default as Checkout} from './checkout'
