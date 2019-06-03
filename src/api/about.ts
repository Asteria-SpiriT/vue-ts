import request from '../utils/http'

const baseApi = '/api'

export function getList(params?: any): any {
  return request({
    url: `${baseApi}/movie/list`,
    method: 'get',
    params,
  })
}

export function addMovie(data: object): any {
  return request({
    url: `${baseApi}/movie/add`,
    method: 'post',
    data,
  })
}

export function deleteMovie(data: object): any {
  return request({
    url: `${baseApi}/movie/delete`,
    method: 'delete',
    data,
  })
}

export function updateMovie(data: object): any {
  return request({
    url: `${baseApi}/movie/update`,
    method: 'post',
    data,
  })
}
