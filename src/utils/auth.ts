import Cookie from 'js-cookie'

const TokenKey = 'tsToken'

export const getToken = () => {
  return Cookie.get(TokenKey)
}

export const setToken = (token: any) => {
  return Cookie.set(TokenKey, token)
}

export const removeToken = () => {
  return Cookie.remove(TokenKey)
}
