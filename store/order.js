import { fireApp } from '@/plugins/firebase'

export const state = () => ({
  order: [],
  userOrder:[],
  orderInfo:{}
  
    
    
  
})

export const mutations = {
  loadOrder (state, payload) {
    state.order = payload
  },
  loadUserOrder (state, payload) {
    state.userOrder = payload
  },
  loadOrderInfo (state, payload) {
    state.orderInfo = payload
  },
  
  
  updateCart (state, payload) {
    state.cart.items.push(payload)
  },
 


}

export const actions = {

    getOrder ({commit}) {
        const user = fireApp.auth().currentUser
        fireApp.database().ref(`userOrders/${user.uid}`).once('value')
          .then(snapShot => {
            const products = []
            let item = {}
            
            snapShot.forEach(child => {
              item = child.val()
              item.key = child.key
              products.push(item)
            })
                commit('loadOrder', products.reverse())
                console.log(products)
          })
      },

    getUserOrder({commit},payload) {
        const user = fireApp.auth().currentUser
        fireApp.database().ref(`orders/${payload}/${user.uid}`).once('value')
          .then(snapShot => {
            const products = []
            let item = {}
            
            snapShot.forEach(child => {
              item = child.val()
              item.key = child.key
              products.push(item)
            })
                commit('loadUserOrder', products.reverse())
                console.log(products)
          }) 
          .then(()=>{
            fireApp.database().ref(`userOrders/${user.uid}/${payload}/`).once('value')
            .then(function(snapshot) {
                var address = snapshot.child("address").val()
                var total = snapshot.child("total").val()
                
                   commit('loadOrderInfo', {address,total,payload})
                  console.log(address)
                  console.log(total)
            })
          })
      },

      test ({dispatch, commit}, payload) {
        const productData = payload
        
        const image = payload.image
        
        let productKey = ''
        
        delete productData.image
    
        commit('setBusy', true, { root: true })
        commit('clearError', null, { root: true })

        fireApp.database().ref('payment').push(productData)      
          .then(result => {
            productKey = result.key
            console.log(productKey)
            return fireApp.storage().ref(`payment/${image.name}`).put(image)
          })
          .then(fileData => {
            const imageUrl = fileData.ref.getDownloadURL()
            console.log(imageUrl)
            console.log(productKey)
            return fireApp.database().ref('payment/' + productKey).set({
              imageUrl: imageUrl,
            
            });
           
          })
          
          
          
      },

      
  
 
  postOrder ({commit}, payload) {
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
        
      })
      .catch(error => {
        commit('setError', error, { root: true })
      })
  }
}

export const getters = {
    order (state) {
        return state.order
    },
    userOrder (state) {
        return state.userOrder
    },
    orderInfo (state) {
        return state.orderInfo
    },
    
}