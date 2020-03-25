import { fireApp } from '@/plugins/firebase'

export const state = () => ({
  products: [],
  categories: [],
  cart: {
    items: [],
    total:[],
    address:[]
  }
})

export const mutations = {
  loadProducts (state, payload) {
    state.products = payload
  },
  
  updateCart (state, payload) {
    state.cart.items.push(payload)
  },
  updateTotal (state, payload) {
    state.cart.total = payload
  },
  updateAddress (state, payload) {
    state.cart.address = payload
  },

  reloadCart (state, payload) {
    state.cart.items = payload.items
  },
  emptyCart (state) {
    state.cart.items = []
    state.cart.total=[]
    state.cart.address=[]
  },
  updateQuantity (state, payload) {
    state.cart.items[payload.index].quantity = 
    state.cart.items[payload.index].quantity+
    payload.productQuantity
  },
  increaseQuantity (state, payload) {
    state.cart.items[payload].quantity++
  },
  decreaseQuantity (state, payload) {
    state.cart.items[payload].quantity--
    if (state.cart.items[payload].quantity === 0) {
      state.cart.items.splice(payload, 1)
    }
  },
  removeFromCart (state, payload) {
    state.cart.items.splice(payload,1)
  },

}

export const actions = {
  
  getProducts ({commit}) {
    fireApp.database().ref('products').limitToLast(50).once('value')
      .then(snapShot => {
        const products = []
        let item = {}
        snapShot.forEach(child => {
          item = child.val()
          item.key = child.key
          products.push(item)
        })
        commit('loadProducts', products.reverse())
      })
      .catch(error => {
        console.log(error)
      })
  },
  
  
  postOrder ({dispatch, commit}, payload) {
   
    const orderKey = fireApp.database().ref('orders').push().key
    const items = payload.items
    const address = payload.address
    const total = payload.total
    const user = fireApp.auth().currentUser
    let orderItems = {}
    console.log(payload)
    items.forEach(item => {
      orderItems[`orders/${orderKey}/items/${item.product.idKey}`] = {
        productID: item.product.productID,
        product: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        imageUrl: item.product.imageUrl,
       
        createdAt: new Date().toISOString(),
      }
      fireApp.database().ref().update(orderItems)
    })
    let order = {}
        order= {
                  userID: user.uid,
                  status:"wait",
                  address:address,
                  total:total,
                  date: new Date().toISOString(),
                }
    fireApp.database().ref(`orders/${orderKey}/detail/`).update(order)
    fireApp.database().ref(`userOrders/${user.uid}/${orderKey}`).update(order)
    
      
   
      .then(() => {
        commit('emptyCart')
        commit('setJobDone', true, { root: true })
        dispatch('order/getOrder',null,{ root: true })
        
      })
      .catch(error => {
        commit('setError', error, { root: true })
      })
  }
}

export const getters = {
  products (state) {
    return state.products
  },
  cart (state) {
    return state.cart
  }
}