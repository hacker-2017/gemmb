<template>
	<div>
		<!--导航栏-->
		<app-header :title="title"/>

		<div class="select-block">
			<div
				@click="onChange('0')"
				:class="{ active : active == 0 }"
				:style=" 'width:'+ (screenWidth - 20)/3 + 'px' " >
				<span class="iconfont icon-chaoshiguzhanggongdan"></span>{{language.t1}}
			</div>
			<div 
				@click="onChange('1')"
				:class="{ active : active == 1 }"
				:style=" 'width:'+ (screenWidth - 20)/3 + 'px' " >
				<span class="iconfont icon-xiugai"></span>{{language.t2}}
			</div>
			<div 
				@click="onChange('2')"
				:class="{ active : active == 2 }"
				:style=" 'width:'+ (screenWidth - 20)/3 + 'px' " >
				<span class="iconfont icon-daichuliguzhanggongdan"></span>{{language.t3}}
			</div>
		</div>

		<app-loading :default-height="height" @Refresh="refresh">

			<!-- 故障工单 -->
			<div v-show="active==0">
				<div 
					style="height: 30px;text-align: center;" 
					v-show=" criticalTicket.length==0">{{language.t5}}</div>

				<my-block
					@critical="criticalDetils" 
					v-for="(item, index) of criticalTicket" :key="index"
					:ID="item.TicketId" 
					:status="item.TicketStatus" 
					:priority="item.Priority"
					:color="item.PriorityHtmlColor"
					:setType="item.setType"
				/>
			</div>

			<!-- 变更工单 -->
			<div v-show="active==1">
				<div 
					style="height: 30px;text-align: center;" 
					v-show=" changeTickets.length==0">{{language.t5}}</div>

				<change-block 
					v-for="(item, index) of changeTickets" :key="index"
					:ID="item.TicketId" 
					:status="item.TicketStatus" 
					:type="language.t4"
					:color="item.PriorityHtmlColor"
					:setType="item.setType"
				/>
			</div>


			<!-- 请求工单 -->
			<div v-show="active==2">

				<div 
					style="height: 30px;text-align: center;" 
					v-show=" requestTicket.length==0">{{language.t5}}</div>

				<my-block
					@critical="criticalDetils" 
					v-for="(item, index) of requestTicket" :key="index"
					:ID="item.TicketId" 
					:status="item.TicketStatus" 
					:priority="item.Priority"
					:color="item.PriorityHtmlColor"
					:setType="item.setType"
				/>
			</div>

			
		</app-loading>

		<app-footer :active="2"/>
	</div>
</template>

<script>
	import MyBlock from './block/index.vue'
	import ChangeBlock from './change-block/index.vue'
	import { hitchTicket, changeTicket, requestTicket } from '@/api/api-ticket'

	export default {
		components: {
			MyBlock, ChangeBlock
		},
		data() {
			return {
				show: true,
				active: 0,
				criticalTicket: [],
				changeTickets: [],
				requestTicket: [],
			}
		},

		computed: {
			height() {
				return wx.getSystemInfoSync().windowHeight - 64 - 65 -60
			},
			screenWidth() {
				return wx.getSystemInfoSync().windowWidth;
			},
			language() {
				return this.$t("ticket");
			},
			title() {
				return this.$t("index").title5;
			}


		},
		watch:{
			active(n) {
				if (n == 0) this.criticalData();
				if (n == 1) this.changeData();
				if (n == 2) this.requestData();
			}
		},
		methods: {
			criticalDetils(data) {
				wx.navigateTo({
					url: `/pages/ticket/details/main?id=${data.id}&status=${data.status}&priority=${data.priority}&color=${data.color}&setType=${data.setType}`
				})
			},
			onChange(type) {
				this.active = type
			},
			async fetchData() {
				this.criticalData()
			},

			//故障工单数据
			async criticalData() {
				const resp = await hitchTicket();
		
				this.criticalTicket = resp.TicketSearchResults.filter(val => {
					val.setType="故障"

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
					val.setType="变更"
					if (val.TicketStatus <= 2) {
						val.TicketStatus = 'open'
					}else {
						val.TicketStatus = 'closed'
					}

					switch(val.TicketType) {
						case 0: 
							val.TicketType = "标准"
							break;
						case 1:
							val.TicketType = "标准"
							break;
						case 2:
							val.TicketType = "标准"
							break;
					}
					return val
				})
			},
			//请求工单数据
			async requestData() {
				const resp = await requestTicket();
				this.requestTicket = resp.TicketSearchResults.filter(val => {
					val.setType="请求"
					if (val.TicketStatus <= 2) {
						val.TicketStatus = 'open'
					}else {
						val.TicketStatus = 'closed'
					}
					return val
				});

			},
			refresh() {
				if (this.active == 0) {
					this.criticalData();
				}
				if (this.active == 1) {
					this.changeData();
				}
				if (this.active == 2) {
					this.requestData();
				}
			}
		},
		mounted() {
			this.fetchData();
		},

	}
</script>


<style scoped>
	.select-block {
		height: 60px;
	}

	.select-block > div {
		display: inline-block;
		height: 50px;
		margin-top: 10px;
		background-color: #FFF;
		line-height: 50px;
		text-align: center;
		margin-left: 5px;
		border-radius: 10px;
		box-sizing: border-box;
	}

	.select-block  .iconfont {
		padding-right: 5px;
	}

	.active {
		border:1px #5CB85C solid;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
	}

</style>