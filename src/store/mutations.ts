import { MutationTree } from 'vuex'

const mutations: MutationTree<any> = {
  SET_TOKEN(state: any, data: any): void {
    state.token = data
  },
}

// 老方法
// const mutations: any = {
//   SET_TOKEN(state: any, data: any) {
//     state.token = data
//   },
// }

export default mutations
