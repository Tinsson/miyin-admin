import axios from 'axios'
import Vue from './vue'
import catchCode from './catchCode'
import router from '@/router'
import qs from 'qs'

axios.interceptors.request.use(config => {
  config.data = qs.stringify(config.data)
  // config.headers.common['token'] = 'SJK3zSvzciwY6MF3jjCIXTduwg3+vcQqhLQrX6L1KdtAPz8=aCRRGiE1oboQYgRSI+zBsEce9XLWbk4qRGjc6949';
  return config
}, err => {
  Vue.$Message.error('网络错误')
  return Promise.reject(err)
})

// http response 拦截
axios.interceptors.response.use(response => {
  if (response.data.status == 0 && response.data.code == '登录失效') {
    Vue.$Message.error('登录失效')
    router.push('/login')
    //清空session信息
    return ''
  } else if (response.data.status == 0 && catchCode.indexOf(response.data.code) == -1) {
    Vue.$Message.warning(response.data.message);
    return ''
  } else {
    return response.data
  }

}, error => {
  Vue.$Message.error('网络错误')
  return Promise.reject(error)
})

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers.common['token'] = 'Bearer ' + res.token
axios.defaults.headers.common['token'] = 'SJK3zSvzciwY6MF3jjCIXTduwg3+vcQqhLQrX6L1KdtAPz8=aCRRGiE1oboQYgRSI+zBsEce9XLWbk4qRGjc6949'

axios.defaults.timeout = 60000

axios.defaults.baseURL = process.env.NODE_ENV === 'production'
  ? 'http://apitest.jkxxkj.com/backend'
  : '/'

export default axios
