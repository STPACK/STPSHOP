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
    state.cart.items[payload.index].quantity = payload.productQuantity
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
  
  productSearch ({commit}, payload) {
    let ref = 'products'
    if (payload.category) {
      ref = `productCategories/${payload.category}`
    }

    fireApp.database().ref(`${ref}`).orderByChild('name').limitToLast(50).startAt(payload.keyword).endAt(payload.keyword + '\uf8ff').once('value')
      .then(snapShot => {
        let products = []
        let item = {}

        snapShot.forEach(child => {
          item = child.val()
          item.key = child.key
          products.push(item)
        })

        if (payload.sort) {
          if (payload.sort === 'low') {
            products.sort(function (a, b) {
              return a.price - b.price
            })
          } else {
            products.sort(function (a, b) {
              return b.price - a.price
            })
          }
        } else {
          products = products.reverse()
        }

        commit('loadProducts', products)
      })
      .catch(error => {
        console.log(error)
      })
  },
  postOrder ({dispatch, commit}, payload) {
    // orders/orderKey/userKey/productKey/productDetail
    const orderKey = fireApp.database().ref('orders').push().key
    const items = payload.items
    const address = payload.address
    const total = payload.total
    const user = fireApp.auth().currentUser
    let orderItems = {}
    console.log(payload)
    items.forEach(item => {
      orderItems[`orders/${orderKey}/${user.uid}/${item.product.idKey}`] = {
        productID: item.product.productID,
        product: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        imageUrl: item.product.imageUrl,
        createdAt: new Date().toISOString()
      }
      fireApp.database().ref().update(orderItems)
    })
    let order = {}
        order[orderKey] = {
                            date:new Date().toISOString(),
                            status:"wait",
                            address:address,
                            total:total
                          }
    fireApp.database().ref(`userOrders/${user.uid}`).update(order)
    
      
   
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