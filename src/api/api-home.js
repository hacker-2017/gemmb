import fly from './index'

import store from '@/store/main'



const customer = function () {
	return wx.getStorageSync("customer")
}

//设备
export const equipment = () => {

	return fly.get(`/Api/Nms/Customers/${customer()}/DeviceStatus`);
}


//维保
export const maintenance = () => {

	return fly.post(`/Api/ServiceDesk/Customers/${customer()}/TicketSearch`, {
			TicketStatuses: [0,1,2],
			Priorities: [1,2,3,4,5,6,7],
			TicketSearchFields: [],
			TicketTypes: [0]
		});

}

//处理中的工单
export const tickets = () => {
	return fly.get(`/Api/ServiceDesk/Customers/${customer()}/Tickets`)
}

//维护中的设备



