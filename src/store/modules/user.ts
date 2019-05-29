const user: any = {
  state: {
    userInfo: {},
  },
  mutations: {
    SAVE_USER: (state: any, userData: object) => {
      state.userInfo = userData
    },
  },
  actions: {
    getUserInfo: (context: any) => new Promise((resolve, reject) => {
      context.commit('SAVE_USER', {})
      resolve()
    }),
  },
}

export default user
