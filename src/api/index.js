import Fly from 'flyio/dist/npm/wx'
import store from '@/store/main'

const fly = new Fly();

fly.config.timeout = 20000;

fly.config.baseURL = 'https://www.logicalisservice.com'


//请求拦截器
fly.interceptors.request.use((request) => {
	store.state.loading = true
	request.headers["AccessToken"] = wx.getStorageSync('access_token');
})	

//响应拦截器
fly.interceptors.response.use((response) => {
	store.state.loading = false
	return response.data
},(err) => {
	console.log(err)
	store.state.loading = false
	switch(err.status) {
		case 401:
		case 403:
		case 404:
		case 500:
			if ("/Api/Security/AccessTokens" != err.request.url) {
				//非登陆页面出现401跳转登陆页面
				wx.reLaunch({url: "/pages/login/main"})
			}
			break;

		wx.reLaunch({url: "/pages/index/main"})
	}
})


export default fly

