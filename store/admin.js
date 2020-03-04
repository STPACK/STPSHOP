import { fireApp, adminApp } from '@/plugins/firebase'

export const state = () => ({

  admins: []
})

export const mutations = {
  
  loadAdmins (state, payload) {
    state.admins.push(payload)
  },
 
}

export const actions = {
 
  createAdmin ({commit}, payload) { 
    commit('setBusy', true, { root: true })
    commit('clearError', { root: true })
    
    fireApp.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    .then(user => {
        const newAdmin = fireApp.auth().currentUser
        newAdmin.updateProfile({ displayName: payload.name })
        .then(() =>{
          const userProfile = {
            email: payload.email,
            name: payload.name,
            created_at: new Date().toISOString()
          }
          return fireApp.database().ref(`users/${newAdmin.uid}`).set(userProfile)
        })
        .then(() => {
          
         return  fireApp.database().ref('group').orderByChild('name').equalTo('admin').once('value')
            .then(snapShot => {
              const groupKey = Object.keys(snapShot.val())[0]
              let groupedUser = {}
              groupedUser[newAdmin.uid] = payload.name
              return fireApp.database().ref(`userGroups/${groupKey}`).update(groupedUser)
            })
        })
      })
      
      .then(() => {
        commit('setJobDone', true, { root: true })
        commit('setBusy', false, { root: true })
      })
      .catch(error => {
        commit('setBusy', false, { root: true })
        commit('setError', error, { root: true })
      })
  },
  getAdmins ({commit}) {
    fireApp.database().ref('group').orderByChild('name').equalTo('admin').once('value')
      .then(snapShot => {
        let item = {}
        const groupKey = Object.keys(snapShot.val())[0]
        fireApp.database().ref(`userGroups/${groupKey}`).on('child_added', 
          snapShot => {
            item = {
              id: snapShot.key,
              name: snapShot.val()
            }
            commit('loadAdmins', item)
          })
      })
      .catch(error => {
        console.log(error)
      })
  },
  
}

export const getters = {
  groups (state) {
    return state.groups
  },
  admins (state) {
    return state.admins
  }
}