import fly from './index'

export const userMessage = () => {
	return fly.get(`/Api/Security/Customers/${wx.getStorageSync("customer")}/Users`)
}

export const userGroups = () => {
	return fly.get(`/Api/Security/Customers/${wx.getStorageSync("customer")}/UserGroups`)
}



//查询所有客户
export const customerList = () => {
	return fly.get(`/Api/Cmdb/Customers`)
}