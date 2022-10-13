import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store"

const requests = new axios.create({
    baseURL: '/api',
    timeout: 5000
});
//axios设置请求截器
requests.interceptors.request.use(config => {
//   config.headers.mytoken = 'nihao' //设置响应头
  nProgress.start();
  if (store.state.detail.uuid_token) {
    // userTempId是跟后端商量好的，不能改
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  // 每次发送请求都携带token
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  return config
}, err => {
  console.log(err)
})
//axios设置响应拦截器
requests.interceptors.response.use(response => {
  nProgress.done();
  return response.data //拦截处理响应结果，直接返回需要的数据
}, err => {
  console.log(err)
})

export default requests;