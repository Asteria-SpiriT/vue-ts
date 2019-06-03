import Axios from 'axios'
import { Message } from 'element-ui'

const service = Axios.create({
  baseURL: '',
  timeout: 50000, // 请求超时时间
})

// request 拦截器
service.interceptors.request.use((config: any) => {
  return config
}, (error: any) => {
  Promise.reject(error)
})

// response拦截器
service.interceptors.response.use((response: any): Promise<any> => {
  const { data } = response
  /*
  * status为0是抛错 可结合自己业务进行修改
  */
  if (data.code !== 0) {
    Message({
      message: data.message,
      type: 'error',
      duration: 5 * 1000,
    })
    return Promise.reject(new Error(data.message))
  } else {
    return Promise.resolve(data)
  }
}, (error: any) => {
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000,
  })
  return Promise.reject(error)
})

export default service
