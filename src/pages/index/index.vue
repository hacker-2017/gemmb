<template>
	<div>
		<!--导航栏-->
		<app-header :title="title"/>

		<app-loading :defaultHeight="height" @Refresh="refresh">

			<div class="title">
		        <span class="iconfont icon-gongchang"></span><span>{{language.title}}:{{customer}}</span>
		    </div>

		    <div class="title">
		        <span class="iconfont icon-shebei"></span><span>{{language.title2}}</span>
		    </div>

			<home-circle 
				:percent="percent"
				:critical="critical"
				:monitor="monitor"
				:maintenance="maintenance"
				:titck="total"
			/>

			<div class="separator"></div>

			<app-title family ="iconfont" name="icon-weixian" :value="language.title3"/>

			<div class="jiange"></div>

			<div>
				<monitor-block 
					v-for=" (item,index) in criticalList" :key="index"
					:color="item.SeverityHtmlColor"
					:name="item.DeviceName"
					:ip="item.IPAddress"
					:location="item.LocationName"
					:severity="item.Severity"
					:deviceId="item.DeviceId"
					:locationId="item.LocationId"
					:type="item.setType"
				/>

				<div
					v-if="criticalList.length==0"
					style="height: 40px;line-height: 40px;text-align: center;">
					<span style="color:#aaaaaa;">{{language.v6}}</span>
				</div>

			</div>

			
			<div class="separator"></div>

			<!-- 工单 -->
			<app-title family ="iconfont" name="icon-gongdan" :value="language.title4"/>
			
			<div class="jiange"></div>

			<TicketBlock
				v-for="(item, index) in showList"
				:key="index"
				:ID="item.TicketId"
				:status="item.TicketStatus"
				:priority="item.Priority"
				:color="item.PriorityHtmlColor"

				@critical="toTicket(item)"
			/>

			<div
				v-if="showList.length==0"
				style="height: 50px;line-height: 50px;text-align: center;margin-bottom: 10px;">
				<span style="color:#aaaaaa;">{{language.v7}}</span>
			</div>

			

		</app-loading>

		<!--tabbar-->
		<app-footer />
	</div>
	
</template>


<script>

	import * as API from '@/api/api-home'

	import HomeCircle from './home-circle/index.vue'

	import MonitorBlock from '@/pages/monitor/block/index.vue'

	import { hitchTicket, changeTicket, requestTicket } from '@/api/api-ticket'

	import TicketBlock from "@/pages/ticket/block/index.vue"

	export default {
		components: {
			HomeCircle, MonitorBlock,TicketBlock
		},

		computed: {
			height() {
				return wx.getSystemInfoSync().windowHeight - 64 - 50
			},
			language() {
				return this.$t("index");
			},
			showList() {
				const array = new Array();

				this.criticalTicket.forEach(val => {
					val.setType="故障"
					if(val.Priority==1 || val.Priority==2)
						array.push(val)
				})

				this.changeTickets.forEach(val=>{
					if(val.Priority==1 || val.Priority==2)
						array.push(val)
				})

				this.requestTicket.filter(val=>{
					if(val.Priority==1 || val.Priority==2)
						array.push(val)
				})	


				return array;
			},
			title() {
				return this.$t("index").title5;
			}
		},

		data() {
			return {
				customer: '',
				percent: 0,
				//故障设备
				critical: 0,
				//维护中的设备
				maintenance: 0,
				criticalList: [],
				monitor:0,
				//故障工单数据
				criticalTicket:[],
				//变更工单
				changeTickets:[],
				//请求工单
				requestTicket:[],
				//处理中的工单数量
				total:0,
			
				
			}
		},
		async mounted() {
			this.customer = wx.getStorageSync("customer")
			await this.fetchData();
			this.total = this.criticalTicket.length
				+this.changeTickets.length+this.requestTicket.length;

			this.criticalTicket.filter(val=>{
				if (val.AssignedUserGroup.UserGroupId==233) {
					this.maintenance = this.maintenance + 1;
				}
			})	
		
		},
		methods: {
			toTicket(data) {
				wx.navigateTo({
					url: `/pages/ticket/details/main?id=${data.TicketId}&status=${data.TicketStatus}&priority=${data.Priority}&color=${data.PriorityHtmlColor}&setType=${data.setType}`
				})
			},
			getTypeIcon(obj) {

				if (obj.indexOf("Switch")!=-1) {
					return "switch";
				}

				if (obj.indexOf("Router")!=-1) {
					return "router";
				}

				if (obj.indexOf("Firewall")!=-1) {
					return "fireWall";
				}

				if (obj.indexOf("Server")!=-1) {
					return "server";
				}

				if (obj.indexOf("Call")!=-1) {
					return "call";
				}

				if (obj.indexOf("Wireless")!=-1) {
					return "wireless";
				}

			},
			//选择设备
			selectType(id) {
				let name = "";
				
				(wx.getStorageSync("devicetype")).filter(val=>{
					if (name) {
						return
					}
					if (val.DeviceId==id) {
						try{
							name = val.DeviceGroupItems[0].Name;
						}catch(err){
							console.log("异常")
						}
						
					}
				})

				return name;

			},
			async fetchData() {
				//故障工单
				this.criticalData();

				this.changeData();
				this.requestData();

				let health = 0;
				let guzhan = 0;
				const criticals = new Array();
				const list = await API.equipment();
				this.monitor = list.length;

				list.filter(val => {
					if(val.Severity == 4) {
						health ++ 
					}
					if (val.Severity == 0) {
						criticals[guzhan] = val
						guzhan ++
					}
				})
				this.critical = guzhan;

				this.percent = Math.round(health / list.length * 100);

				

				criticals.forEach(val => {
					const typeName = this.selectType(val.DeviceId)
					val.setType = this.getTypeIcon(typeName);
				})



				this.criticalList = criticals;	
			},
			refresh() {
				this.fetchData();
			},
			//故障工单数据
			async criticalData() {
				const resp = await hitchTicket();
				this.criticalTicket = resp.TicketSearchResults.filter(val => {
					if (val.TicketStatus <= 2) {
						val.TicketStatus = 'open'
					}else {
						val.TicketStatus = 'closed'
					}
					return val
				});

			},
			//变更工单数据
			async changeData() {
				const resp = await changeTicket();
				this.changeTickets = resp.TicketSearchResults.filter(val => {
					if (val.TicketStatus <= 2) {
						val.TicketStatus = 'open'
					}else {
						val.TicketStatus = 'closed'
					}
					switch(val.TicketType) {
						case 0: 
							val.TicketType = '标准'
							break;
						case 1:
							val.TicketType = '正常'
							break;
						case 2:
							val.TicketType = '紧急'
							break;
					}
					return val
				})
			},
			//请求工单数据
			async requestData() {
				const resp = await requestTicket();
				this.requestTicket = resp.TicketSearchResults.filter(val => {
					if (val.TicketStatus <= 2) {
						val.TicketStatus = 'open'
					}else {
						val.TicketStatus = 'closed'
					}
					return val
				});

			}
		}
	}
</script>

<style scoped>
	.separator {
		border-top: 1px solid #cccccc;
		margin-top: 20px;
		height: 20px;
	}

	.jiange {
		height: 10px;
	}

	.title {
        height: 30px;
        line-height: 30px;
        font-size: 16px;
    }

    .title > .iconfont {
    	padding-right: 5px;
    }

</style>

