import axios from 'axios'

export function request(config) {
    //1创建axios实例
    const instance = axios.create({
        // baseURL: 'http://123.207.32.32:8000/api/vip',
        baseURL: 'http://106.54.54.237:8000/api/v1',
        // timeout: 5000
    })

    //2 axios的拦截器
    //2.1 请求拦截器
    instance.interceptors.request.use(config => {
            return config
        }, err => {

        })
        //2.2 响应拦截
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {

    })

    //3发送网络请求
    return instance(config)
}