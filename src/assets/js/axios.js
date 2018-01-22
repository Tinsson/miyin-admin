import axios from 'axios'
import Vue from './vue'
import catchCode from './catchCode'
import router from '@/router'
import qs from 'qs'
import urlList from './url'
let myvue = new Vue()

axios.interceptors.request.use(config => {
  config.data = qs.stringify(config.data)
  let url = config.url.split('?')[0];
  let params = config.url.split('?')[1]?config.url.split('?')[1]:'';
  if(urlList[url]) {
    config.url = params == '' ? urlList[url]: urlList[url] + '?' + params
  }
  // config.headers.common['token'] = 'SJK3zSvzciwY6MF3jjCIXTduwg3+vcQqhLQrX6L1KdtAPz8=aCRRGiE1oboQYgRSI+zBsEce9XLWbk4qRGjc6949';
  return config
}, err => {
  myvue.$Message.error('网络错误')
  return Promise.reject(err)
})

// http response 拦截
axios.interceptors.response.use(response => {
  if (response.data.status == 0 && response.data.code == '登录失效') {
    myvue.$Message.error('登录失效')
    router.push('/login')
    //清空session信息
    return ''
  } else if (response.data.status == 0 && catchCode.indexOf(response.data.code) == -1) {
    myvue.$Message.warning(response.data.message);
    return ''
  } else {
    return response.data
  }

}, error => {
  myvue.$Message.error('网络错误')
  return Promise.reject(error)
})

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers.common['token'] = 'Bearer ' + res.token
axios.defaults.headers.common['token'] = 'SJK3zSvzciwY6MF3jjCIXTduwg3+vcQqhLQrX6L1KdtAPz8=aCRRGiE1oboQYgRSI+zBsEce9XLWbk4qRGjc6949'

axios.defaults.timeout = 60000

if(process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://api.jkxxkj.com/backend';
}else if(process.env.NODE_ENV === 'testing') {
  axios.defaults.baseURL = 'http://apitest.jkxxkj.com/backend';
}else {
  axios.defaults.baseURL = '/'
}

// axios.defaults.baseURL = process.env.NODE_ENV === 'production'
//   ? 'http://apitest.jkxxkj.com/backend'
//   : '/'

export default axios
