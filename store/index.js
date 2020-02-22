import {fireApp} from '@/plugins/firebase'


export const state = ()  =>({

    user: null,
    busy:false,
    JobDone:false,
    error: null,
    
})

export const mutations={
    setUser (state, payload) {
        state.user = payload
      },
      setError (state, payload) {
        state.error = payload
      },
      clearError (state) {
        state.error = null
      },
    setBusy(state,payload){
        state.busy = payload
    },
    setJobDone(state,payload){
        state.JobDone = payload
    }
    ,
    setUser (state, payload) {
        state.user = payload
      },
}

export const actions ={
    singupUser({commit},payload){
        commit('setBusy',true)
        commit('clearError')
        fireApp.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
            const newUser = fireApp.auth().currentUser
            newUser.updateProfile({ displayName: payload.name })
           
            .then(() => {
              const currentUser = {
                id: newUser.uid,
                email: payload.email,
                name: payload.name,
                role: 'consumer'
              }
                console.log('USER', currentUser)
                commit('setUser', currentUser)
            
            }).then(() => {
                    const userData = {
                    email: payload.email,
                    name: payload.name,
                    createdAt: new Date().toISOString()
                    }
                    return fireApp.database().ref(`users/${newUser.uid}`).set(userData)
                })
        
        .then(() => {
            return fireApp.database().ref('group').orderByChild('name').equalTo('customer').once('value')
              .then(snapShot => {
                const groupKey = Object.keys(snapShot.val())[0]
                let groupedUser = {}
                groupedUser[newUser.uid] = payload.name
                return fireApp.database().ref(`userGroups/${groupKey}`).update(groupedUser)
              })
          })
        })

          .then(()=>{

            commit('setBusy',false)
            commit('setJobDone',true)

        }).catch(error=>{
            
            commit('setBusy',false)
            commit('setJobDone',true)
            commit('setError', error)
        }) 
    },

    loginUser ({commit}, payload) {
        commit('setBusy', true)
        commit('clearError')
       
       
        fireApp.auth().signInWithEmailAndPassword(payload.email, payload.password)
          .then(user => {
            const authUser = {
              id: user.uid,
              email: user.email,
              name: user.displayName
            }
            return fireApp.database().ref('groups').orderByChild('name').equalTo('Administrator').once('value')
              .then(snapShot => {
                const groupKey = Object.keys(snapShot.val())[0]
                return fireApp.database().ref(`userGroups/${groupKey}`).child(`${authUser.id}`).once('value')
                  .then(ugroupSnap => {
                    if (ugroupSnap.exists()) {
                      authUser.role = 'admin'
                    } else {
                      authUser.role = 'customer'
                    }
                    commit('setUser', authUser)
                    commit('setBusy', false)
                    commit('setJobDone', true)
                  })
              })
          })
          .catch(error => {
            commit('setBusy', false)
            commit('setError', error)
          })
      },

    
      

    
    
}

export const getters ={
    user (state) {
        return state.user
    },
    loginStatus(state){
        return state.userStatus
    },
    busy(state){
        return state.busy
    },
    error (state) {
        return state.error
      },
    JobDone(state){
        return state.JobDone
    },
    
     
}