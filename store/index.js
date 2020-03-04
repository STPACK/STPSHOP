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
                role: 'customer'
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
          .then(User => {
            const DataUser = fireApp.auth().currentUser;
             const authUser = {
              id: DataUser.uid,
              email: DataUser.email,
              name: DataUser.displayName
            }
            console.log(authUser)
            return fireApp.database().ref('group').orderByChild('name').equalTo('admin').once('value')
              .then(snapShot => {
                const groupKey = Object.keys(snapShot.val())[0]
                return fireApp.database().ref(`userGroups/${groupKey}`).child(`${authUser.id}`).once('value')
                  .then(ugroupSnap => {
                    if (ugroupSnap.exists()) {
                      authUser.role = 'admin'
                    } else {
                      authUser.role = 'customer'
                    }
                    console.log(authUser)
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

      logOut ({commit}) {
        fireApp.auth().signOut()
        commit('setUser', null)
      },

      setAuthStatus ({commit}) {
        fireApp.auth().onAuthStateChanged((user) => {
          if (user) {
            const authUser = {
              id: user.uid,
              email: user.email,
              name: user.displayName
            }
            fireApp.database().ref('group').orderByChild('name').equalTo('admin').once('value')
              .then(snapShot => {
                const groupKey = Object.keys(snapShot.val())[0]
                fireApp.database().ref(`userGroups/${groupKey}`).child(`${authUser.id}`).once('value')
                  .then(uGroupSnap => {
                    if (uGroupSnap.exists()) {
                      authUser.role = 'admin'
                    } else {
                      authUser.role = 'customer'
                    }
                    commit('setUser', authUser)
                  })
              })
          }
        })
      },

      updateProfile ({commit, getters}, payload) {
      
        commit('setBusy', true)
        commit('clearError')
        const userData = getters.user
        const user = fireApp.auth().currentUser
        const updateDb = () => {
          const updateObj = {}
          if (userData.role == 'admin') {
            updateObj[`userGroups/-M0f_4DRN85I9V77oxEi/${user.uid}`] = payload
          }
          updateObj[`userGroups/-M0f_Aakx52BbOgkXzuI/${user.uid}`] = payload
          updateObj[`users/${user.uid}/name`] = payload
          return fireApp.database().ref().update(updateObj)
        }
        user.updateProfile({displayName: payload})
          .then(updateDb)
          .then(() => {        
            const userObj = {
              id: userData.id,
              email: userData.email,
              name: payload,
              role: userData.role
            }
            commit('setUser', userObj)
            commit('setBusy', false)
            commit('setJobDone', true)
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
    loginStatus (state) {
        return state.user !== null && state.user !== undefined
      },
    userRole(state){
      const isLoggedIn = state.user !== null && state.user !== undefined
      return (isLoggedIn) ? state.user.role : 'customer'
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