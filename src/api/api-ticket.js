import fly from './index'


//故障工单
export const hitchTicket = () => {
	return fly.post(`/Api/ServiceDesk/Customers/${wx.getStorageSync("customer")}/TicketSearch`,{
		"TicketSearchFields": [],
		"TicketTypes": [0],
		"Priorities": [1, 2, 3, 4],
		"IncidentStates":  [0, 1, 2, 3]
	})
}


//变更工单
export const changeTicket = () => {
	return fly.post(`/Api/ServiceDesk/Customers/${wx.getStorageSync("customer")}/TicketSearch`,{
		"TicketSearchFields": [],
		"TicketTypes": [2],
		"ChangeTypes":[0, 1, 2],
		"ChangeStates":  [1, 6, 7]
	})
}


//请求工单
export const requestTicket = () => {
	return fly.post(`/Api/ServiceDesk/Customers/${wx.getStorageSync("customer")}/TicketSearch`,{
		"TicketSearchFields": [],
		"TicketTypes": [3],
		"Priorities": [1, 2, 3, 4],
		"RequestStates":  [0, 1]
	})
}


//关联设备
export const relation = (id) => {
	return fly.get(`/Api/ServiceDesk/Tickets/${id}/Devices/Assignable`)
}


//工单日志
export const journal = (id) => {
	return fly.get(`/Api/ServiceDesk/Tickets/${id}/TicketJournals`)
}

//设备告警
export const report = (id) => {
	return fly.post(`/Api/Nms/Tickets/${id}/Alerts`,{
		 "Page": 1,
    	 "PageSize": 500
	})
}


//查询具体某个工单详情
export const singleTicket = (id) => {
	return fly.get(`/Api/ServiceDesk/Tickets/${id}`)
}




