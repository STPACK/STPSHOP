import { fireApp } from '@/plugins/firebase'

export const state = () => ({
  order: [],
  userOrder:[],
  orderInfo:{},
  
  
    
    
  
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

    getUserOrder({commit},payloads) {
        const user = fireApp.auth().currentUser
        const payload = payloads.key
        const status = payloads.status

        
        fireApp.database().ref(status+'/'+payload+'/'+'items').once('value')
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

      confirmPayment ({dispatch, commit}, payload) {
        const productData = payload
        
        const image = payload.image
        const user = fireApp.auth().currentUser
        const orderKey = payload.productKey
        let productKey = ''
        
        delete productData.image
    
        commit('setBusy', true, { root: true })
        commit('clearError', null, { root: true })
        console.log(productData)
        fireApp.database().ref('payment').push(productData)      
          .then(result => {
            productKey = result.key
            console.log(productKey)
            return fireApp.storage().ref(`payment/${productData.imageName}`).put(image)
          })
          .then(snapshot => {
            snapshot.ref.getDownloadURL().then((url)=>{
              const postData ={
                imageUrl:url,
                productKey:productKey
              }
              var updates = {};
            updates['/payment/' + productKey] = postData;
              

              console.log(postData)
              fireApp.database().ref('payment').child(productKey).update(postData)
            }).then(()=>{
              fireApp.database().ref('orders/'+productData.orderId).once('value')
              .then(function(snapshot) {
                  const detail = snapshot.child("detail").val()
                  const items = snapshot.child("items").val()
                  const data ={
                    detail:detail,
                    items:items
                  }
                  fireApp.database().ref('ordersed/'+productData.orderId).update(data) 
              }).then(()=>{
              return fireApp.database().ref('orders/'+productData.orderId).remove()
              })

               fireApp.database().ref(`ordersed/${productData.orderId}/detail`).update({status:'confirm'})
               fireApp.database().ref(`userOrders/${user.uid}/${productData.orderId}`).update({status:'confirm'})

            }).then(()=>{
              dispatch('getOrder')
              commit('setBusy', false, { root: true })
              commit('setJobDone', true, { root: true })
            })
            .catch(error => {
              commit('setBusy', false, { root: true })
              commit('setError', error, { root: true })
            })
         
          })
         
      },

 
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