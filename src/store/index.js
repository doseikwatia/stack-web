import Vue from 'vue'
import Vuex from 'vuex'

import { FirebaseApp, GoogleAuthProvider, Auth, DB } from './firebase'
import { getProjectTask, alignTaskProgress } from '../helpers'
Vue.use(Vuex)

export let store = new Vuex.Store({
  state: {
    projects: [],
    firebaseApp: FirebaseApp,
    user:null,
    hasChanges:false,
  },
  mutations: {
    updateProjects(state, payload) {
      state.projects = payload.projects
    },
    updateUser(state, payload) {
      state.user = payload
    },
    updateProjectTask(state, payload) {
      let projectID = payload.projectID;
      let task = payload.task;
      let oldTask = getProjectTask(state.projects, projectID, task.id);
      Vue.set(oldTask, 'title', task.title);
      Vue.set(oldTask, 'description', task.description);
      Vue.set(oldTask, 'progress', task.progress);
      alignTaskProgress(state.projects, projectID, task.id)
      state.hasChanges=true
    },
    deleteProjectTask(state, payload) {
      let projectID = payload.projectID
      let task = payload.task
      let parent = getProjectTask(state.projects, projectID, task.parentId);
      Vue.set(parent,'tasks', parent.tasks.filter(t => t.id != task.id));
      alignTaskProgress(state.projects, projectID, task.parentId)
      state.hasChanges=true
    },
    addProject(state, payload) {
      state.projects.push(payload)
      state.hasChanges=true
    },
    addProjectTask(state, payload) {
      let projectID = payload.projectID
      let task = payload.task
      let parent = getProjectTask(state.projects, projectID, task.parentId)
      Vue.set(parent,'tasks',parent.tasks==null?[task]:[...parent.tasks,task])
      alignTaskProgress(state.projects, projectID, task.id)
      state.hasChanges=true
    },
    deleteProject(state,payload){
      let project = payload
      state.projects.splice(state.projects.indexOf(project), 1);
      state.hasChanges=true
    }
  },
  getters: {
    authToken:state=>(()=> {
      return state.authToken
    })(),
    isloggedIn:state=>(()=> {
      return state.user != null
    })(),
    user:state=>(()=> {
      return state.user
    })(),
    projects:state=>(()=> {
      return state.projects;
    })(),
    getProject: (state) => (projectID) => {
      return state.projects.filter(p => p.id === projectID)[0]
    },
    hasChanges:(state)=>state.hasChanges,
  },
  actions: {
    addProject(context, payload){
      context.commit("addProject",payload)
    },
    uploadProjects(context) {
      if(!context.getters.user){
        return
      }
      DB.ref('/users/' + Auth.currentUser.uid + '/projects').set(context.state.projects)
      .then(function(){
        context.state.hasChanges=false
      })
    },
    loginWithUsernameAndPassword(context, payload) {
      //monitoring for changes on user
      Auth.signInWithEmailAndPassword(payload.username, payload.password).then(function () {
        if (!result.user) {
          return;
        }
        context.commit('updateUser', result.user)
        context.dispatch('loadProjects', Auth)
      }).catch(error => {
        //TODO:alert user of error
        console.error(error)
      })
    },
    loginWithGoogle(context, payload) {
      Auth.signInWithPopup(GoogleAuthProvider).then(result => {
        if (!result.user) {
          return;
        }
        context.commit('updateUser', result.user)
        context.dispatch('loadProjects', Auth)
      })
        .catch(error => {
          //TODO: alert user of error
          console.error(error)
        })
    },
    forgot(context, payload) {
      Auth.sendPasswordResetEmail(payload.username).catch(error => {
        //TODO:alert user of error
        console.error(error)
      })
    },
    register(context, payload) {
      Auth.createUserWithEmailAndPassword(payload.username, payload.password).then(function () {
        //updating current user obj
        context.commit('updateUser', Auth.currentUser)
      }).catch(error => {
        //TODO:alert user of error
        console.error(error)
      })
    },
    signout(context) {
      Auth.signOut().then(function () {
        context.commit('updateUser', null)
      })
    },
    loadProjects(context) {
      if(!context.getters.user){
        return
      }
      context.commit('updateUser', Auth.currentUser)
      let userResourcePath = '/users/' + Auth.currentUser.uid + '/projects'
      //retrieving current projects from rt database
      DB.ref(userResourcePath).once('value').then(snap => {
        context.commit('updateProjects', { projects: snap.val() || [] })
      })
    },
  }
})


Auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('updateUser', user)
    //listening in for changes on the users projects
    DB.ref('/users/' + user.uid + '/projects').on('value', snap => {
      store.commit('updateProjects', { projects: snap.val() || [] })
    })
    //get projects
    store.dispatch("loadProjects")
  }
})
