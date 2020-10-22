import fly from './index'

import Fly from 'flyio/dist/npm/wx'
const fly2 = new Fly();
import store from '@/store/main'
fly2.config.timeout = 20000;
fly2.config.baseURL = 'https://www.logicalisservice.com'

//请求拦截器
fly2.interceptors.request.use((request) => {
	store.state.loading = true
	request.headers["Apikey"] = "886e56cf-56ad-469f-a987-55fc736e595d"
})


export const deviceList = () => {
	return fly.get(`/Api/Nms/Customers/${wx.getStorageSync("customer")}/DeviceStatus`)
}

//查看设备的类型（交换机）
export const deviceGroupItems = () => {
	return fly.get(`/Api/Cmdb/Customers/${wx.getStorageSync("customer")}/Devices`)
}


export const deviceGroups = (pram) => {
	return fly.get(`/Api/Cmdb/Customers/${pram}/Devices`)
}

export const searchDevices = (searchString) => {
	return fly.get(`/Api/Cmdb/Customers/${wx.getStorageSync("customer")}/Devices/SearchNameOrIP?searchString=${searchString}`)
}

//关联工单
export const associat = (id) => {
	return fly.get(`/Api/ServiceDesk/Ticket/Device/Ticket/Get/${id}`)
}


//设备的地址
export const address = () => {
	return fly2.get(`/Api/Cmdb/Customers/${wx.getStorageSync("customer")}/Locations/WithDeviceCreatePermission`)
}

//ping
export const ping = (id) => {
	return fly.get(`/Api/Nms/Poller/PollerRequest/Ping/Start/${id}`)
}


//getping
export const getping = (param) => {
	return fly.post(`/Api/Nms/Poller/PollerRequest/PingResponseData/Get`, param)
}


//单个设备
export const singleDevice = (id) => {
	return fly.get(`/Api/Cmdb/Devices/${id}`)
}

//获取性能指标
export const getPerformance = (id) => {
	return fly.get(`/Api/Nms/Devices/${id}/StatisticsTrees`)
}

//获取流量
export const liuliang = (param) => {
	return fly.post(`/Api/Nms/Statistics/GetChartDataItem`, param)
}


//历史告警
export const getHistoryWaringApi = (deviceId, start, end) => {
	return fly.get(`Api/Nms/Devices/${deviceId}/Alerts?start=${start}&end=${end}`)
}

//设备型号
export const EntityMib = (id) => {
	return fly.get(`Api/Nms/Devices/${id}/EntityMib`)
}


