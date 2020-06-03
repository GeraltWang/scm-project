import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import {
  requestPost,
  requestGet
} from '../utils/http'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: JSON.parse(Cookies.get('user') || '{}'),
    token: JSON.parse(Cookies.get('token') || '{}'),
    // token: Cookies.get('token'),
  },
  mutations: {
    userMutation(state, payload) {
      state.user = payload
    },
    tokenMutation(state, payload) {
      state.token = payload
    },
    // listMutation(state, payload) {
    //   state.userList = payload
    // },
    // breadListMutations (getters, list) {
    //   getters.breadListState = list;
    // }
  },
  actions: {
    loginAction(context, payload) {
      return new Promise((resolve, reject) => {
        requestPost('api/sys/login', payload).then(resp => {
          let result = resp.data
          if (result.code === 2) { // 登录成功
            // 保存登录的用户信息及token
            context.commit('userMutation', result.data.user)
            context.commit('tokenMutation', result.data.token)
            Cookies.set('user', JSON.stringify(result.data.user))
            Cookies.set('token', result.data.token)
            resolve(result.data)
          } else { // 失败
            reject(result.message)
          }
        }).catch(err => {
          console.log(err)
        })
      })
    }
  }
})
export default store
