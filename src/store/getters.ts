import { GetterTree } from 'vuex'

const getters: GetterTree<any, any> = {
  token(state: any): any {
    return state.token
  },
}

// 老方法
// const getters: any = {
//   token: (state: any) => state.token,
// }

export default getters
