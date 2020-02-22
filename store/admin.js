import {fireApp} from '@/plugins/firebase'


export const state = ()  =>({

    groups:[]
    
})

export const mutations={
    loadGroups(state,payload){
        state.groups.push(payload)
    },
  
  
}

export const actions ={
   createGroup({commit},payload){
        
            fireApp.database().ref('group').push(payload)
            .then(()=>{
                
                
                console.log('creatGroup done')
            })
                .catch(()=>{
                    
                    console.log(e)
                })
   },
  
    
//    getGroups({commit},){
//        fireApp.database().ref('group').on('child_added',
//        snapShot =>{
//            let item = snapShot.val()
//            item.key = snapShot.key
//            commit('loadGroups',item)
//        })
//     }
    
}

export const getters ={
    groups(state){
        return state.groups
    }
     
}