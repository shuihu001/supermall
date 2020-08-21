import axios from 'axios'
export function request(config){
	
	const instance = axios.create({
		baseURL: "http://152.136.185.210:8000/api/z8",
		timeout: 5000
	})
	//axios拦截器
	//请求拦截
	instance.interceptors.request.use(config => {
		return config
	}, error => {
		// 请求错误处理
		console.log(error)
	})
	//响应拦截
	instance.interceptors.response.use(res => {
		return res.data
	}, error => {
		// 响应错误处理
		// console.log(error)
	})
	
	return instance(config)

}