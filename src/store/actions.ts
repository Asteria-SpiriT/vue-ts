import { ActionTree } from 'vuex'

const actions: ActionTree<any, any> = {
  async Login({ state, commit }, userInfo: any) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', 'test_token')
      resolve()
    })
  },
}

export default actions
