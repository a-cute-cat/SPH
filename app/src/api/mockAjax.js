import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css"

const requests = new axios.create({
    baseURL: '/mock',
    timeout: 5000
});
//axios设置请求截器
requests.interceptors.request.use(config => {
//   config.headers.mytoken = 'nihao' //设置响应头
  nProgress.start();
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