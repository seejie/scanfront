import axios from 'axios'

const http = axios.create({
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  withCredentials: true,
  timeout: 1000 * 60,
})

http.interceptors.response.use(
  res => {
    const {data: {PageName}} = res
    if (PageName !== 'ErrorPage') return res
    location.href = `//${location.host}/#/404`
    throw 'server error'
  },
  err => {
    console.error(err)
    return Promise.reject(err)
  }
)

const get = async (url, params, config = {}) => {
  const { data } = await http.get(url, {
    params,
    ...config,
  })
  return data
}

const post = async (url, params, config = {}) => {
  const { data } = await http.post(url, params, config)
  return data
}

export default {
  get,
  post
}
