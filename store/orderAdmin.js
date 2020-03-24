import { fireApp } from '@/plugins/firebase'

export const state = () => ({
  order: [],
  payment:[],
  confirmPayment:[],
  confirmOrder:[],
 
 
  
  
    
    
  
})

export const mutations = {
  loadOrder (state, payload) {
    state.order = payload
  },
  loadPayment (state, payload) {
    state.payment = payload
  },
  loadConfirmPayment(state, payload) {
    state.confirmPayment = payload
  },
  loadConfirmOrder(state, payload) {
    state.confirmOrder = payload
  },
 
  updateCart (state, payload) {
    state.cart.items.push(payload)
  },
}

export const actions = {

    getOrderAdmin ({commit}) {
      
        fireApp.database().ref('ordersed').once('value')
          .then(snapShot => {
            const products = []
            let item = {}
            
            snapShot.forEach(child => {
              item = child.val()
              item.key = child.key
              products.push(item)
          
            })
                commit('loadOrder', products.reverse())
              
                
          })
      },

    getPayment ({commit}) {
      
        
        fireApp.database().ref('payment/').once('value')
          .then(snapShot => {
            const products = []
            let item = {}
            
            snapShot.forEach(child => {
              item = child.val()
              item.key = child.key
              products.push(item)
            
            })
                commit('loadPayment', products.reverse())
              
                
          })
      },
    
      getConfirmPayment ({commit},payload) {
      
        const payment = payload.payment
        const order = payload.order
       

        fireApp.database().ref('/payment/' + payment).once('value').then(function(snapshot) {
            var products = snapshot.val() 
          
            commit('loadConfirmPayment', products)
          })
          fireApp.database().ref('ordersed/'+order).once('value')
          .then(function(snapshot) {
              var detail = snapshot.child("detail").val()
              var items = snapshot.child("items").val()
              
                 commit('loadConfirmOrder', {detail,items})
               
          })
      },

      confirmPayment({dispatch, commit}, payload){

        const userID = payload.userID
        const payment = payload.payment
        const orderID = payload.orderID
        fireApp.database().ref('/payment/' + payment).once('value').then(function(snapshot) {
            var products = snapshot.val() 
            fireApp.database().ref('paymented/'+payment).set(products) 
           
          })
          .then(()=>{
             return fireApp.database().ref('/payment/' + payment).remove()
         })
          .then(()=>{
            return  fireApp.database().ref('ordersed/'+orderID+'/detail').update({status:'complete'})
          }).then(()=>{
            return fireApp.database().ref('userOrders/'+userID+'/'+orderID).update({status:'complete'})
             
         }).then(()=>{
            dispatch('getOrderAdmin')
         })


        




      },

     changeStatus({commit},payload){

        fireApp.database().ref(`orders/${productData.orderId}/detail`).update({status:'confirm'})
        .then(()=>{
           return fireApp.database().ref(`userOrders/${user.uid}/${productData.orderId}`).update({status:'confirm'})
            
        })
      }





   
          
      

      
  
 
  
}

export const getters = {
    order (state) {
        return state.order
    },
    payment (state) {
        return state.payment
    },
    confirmPayment (state) {
        return state.confirmPayment
    },
    confirmOrder (state) {
        return state.confirmOrder
    },
    
    
}