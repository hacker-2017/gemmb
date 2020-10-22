<template>
	<div>
		<van-nav-bar :title="language.t1">
			<span @click="back" slot="left" style="padding: 10px;" class="iconfont icon-shangyibu"></span>
		</van-nav-bar>

		<scroll-view class="content"
			:style=" 'height:' + height + 'px;' "
			:scroll-y="true"
		>
			<div class="title">{{language.t1}}</div>
			<div class="details" 
				:style=" 'background-color:' + color + ';' "
			>
				<div>
					<span>{{language.t2}}:&nbsp;</span><span>{{id}}</span>
					<span v-if="!type" style="display: inline-block;margin-left: 50px;">
						{{language.t3}}:&nbsp;P{{priority}}
					</span>

					<span v-if="type" style="display: inline-block;margin-left: 50px;">
						{{language.t10}}: {{type}}
					</span>
				</div>
				<div>
					<span>{{language.t4}}:&nbsp;{{status}}</span>
				</div>
				<div>
					<span >{{language.t5}}:&nbsp;</span>
					<span 
						@click="linkDevice"
						style="text-decoration: underline;">{{name.DeviceName}}</span>
				</div>
				
			</div>

			<div class="progress-box">
				<div style="height: 20px;box-sizing: border-box;padding-top: 5px;">
					<div style="width: 50px;float: left;">
						<span>Response</span>
					</div>
					<div style="width: 65px;float: right;" v-if="Response">
						<span>{{language.t6}}&nbsp;&nbsp;</span><span class="iconfont icon-bofang"></span>
					</div>
					<div style="width: 65px;float: right;" v-if="!Response">
						<span>{{language.t7}}&nbsp;&nbsp;</span><span class="iconfont icon-zanting"></span>
					</div>
				</div>
				<div class="progress">
					<div style="width: 100%;box-sizing: border-box;padding-top: 5px;">
						<van-progress 
							:percentage="currResponse" 
							:show-pivot="false" 
							:stroke-width="8"
						/>
					</div>
				</div>
			</div>

			<div class="progress-box">
				<div style="height: 20px;box-sizing: border-box;padding-top: 5px;">
					<div style="width: 50px;float: left;">
						<span>Resolution</span>
					</div>
					<div style="width: 65px;float: right;" v-if="Resolution">
						<span>{{language.t6}}&nbsp;&nbsp;</span><span class="iconfont icon-bofang"></span>
					</div>
					<div style="width: 65px;float: right;" v-if="!Resolution">
						<span>{{language.t7}}&nbsp;&nbsp;</span><span class="iconfont icon-zanting"></span>
					</div>
				</div>
				<div class="progress">
					<div style="width: 100%;box-sizing: border-box;padding-top: 5px;">
						<van-progress 
							:percentage="currResolution" 
							:show-pivot="false" 
							:stroke-width="8"
						/>
					</div>
				</div>
			</div>

			<!--工单日志-->
			<div 
				class="title"
				v-show="ticketJournal.length>0"
			>{{language.t8}}</div>

			<Journal 
				v-for="(item , index) in ticketJournal" :key="index"

				:contacts="item.CreatedBy.Name"
				:company="item.CreatedBy.CustomerTag"
				:html="item.Html" 
				color="yellow"
				:dataTime="item.CreatedLocalTime"
			/> 
			<!--设备告警-->

			<div v-if="setType=='故障'">
				<div 
					class="title"
					v-show="alertItems.length>0"
				>{{language.t9}}</div>
				
				<Report 
					v-for="(item, index) in alertItems"
					:key="index"
					color="red"
					:dataTime="item.DeviceLocalTime"
					:html="item.Notes"
				/>
			</div>
			

		</scroll-view>
	</div>
</template>

<script>
	import Journal from './Journal.vue'
	import Report from './report.vue'
	import { relation, journal, report, singleTicket } from '@/api/api-ticket'
	export default {
		components: {
			Journal, Report
		},
		onUnload() {
			this.id = "";
			this.color = "";
			this.status = "";
			this.priority = ""
			this.type = ""
			this.name='';
			this.alertItems = [];
			this.ticketJournal = [];
			this.Response = true;
			this.Resolution = true;
			this.currResponse = 0;
			this.currResolution = "";

			this.setType = "";
		},
		onLoad(data) {
			this.id = data.id;
			this.color = data.color;
			this.status = data.status;
			this.priority = data.priority;
			this.type = data.type;
			this.alertItems = [];
			this.ticketJournal = [];
			this.Response = true;
			this.Resolution = true;
			this.currResponse = 0;
			this.currResolution = 0;

			this.setType = data.setType;

		
		},
		data() {
			return {
				id: '',
				color: '',
				status: '',
				priority: '',
				//工单日志
				ticketJournal: [],
				//设备告警
				alertItems: [],
				type: '',
				//关联设备
				name:'',
				Response:true,
				Resolution:true,

				currResponse:0,
				currResolution:0,

				//工单类型
				setType: ''
			}
		},
		computed:{
			height() {
				return wx.getSystemInfoSync().windowHeight - 65
			},
			language() {
				return this.$t("ticketDetils");
			}
		},
		async mounted() {
			this.ticketJournal = await journal(this.id);
	
			const data = await report(this.id);
			this.alertItems = data.DeviceAlertItems;
	
			
			if (this.alertItems.length>0) {
				this.name = this.alertItems[0]
			}
			const single = await singleTicket(this.id);
			try{
				this.Response = single.ResponseTimer.Running;
			}catch(err){
				console.log("异常")
			}
			try{
				this.Resolution = single.ResolutionTimer.Running;
			}catch(err){
				console.log("异常")
			}
			try{
				const bb = (single.ResponseTimer.ElapsedMinutes/single.ResponseTimer.BreachMinutes)*100;


				this.currResponse = bb>100?100:bb;
			}catch(err){
				console.log("异常")
			}
			try{
				const aa = (single.ResolutionTimer.ElapsedMinutes/single.ResolutionTimer.BreachMinutes)*100;
				this.currResolution = aa > 100 ? 100:aa;

			}catch(err){
				console.log("异常")
			}

		},
		methods: {
			back() {
				wx.navigateBack({ delta: 1 })
			},
			linkDevice() {
				console.log(this.name)

				const ip = this.name.IPAddress;
				const name = this.name.DeviceName;
			
				const id = this.name.DeviceId;

				const locationId = this.name.LocationId

				const color = this.name.SeverityHtmlColor;

				wx.navigateTo({url:`/pages/monitor/details/main?id=${id}&name=${name}&ip=${ip}&color=${color}&locationId=${locationId}`})
			}
		},
	}
</script>


<style scoped>
	
	.content {
		padding: 10px;
		box-sizing: border-box;
	}
	.title {
		height: 40px;
		line-height: 40px;
	}
	.details {
		height: 99px;
		border-radius: 10px;
		margin-bottom: 20px;
		color: white;
		box-sizing: border-box;
		padding-left: 20px;
		position: relative;
	}

	.details > div {
		height: 33px;
		line-height: 33px;
	}

	.progress-box {
		height: 45px;
		background-color: #FFF;
		border-radius: 10px;
		padding: 0 10px 0 10px;
		box-sizing: border-box;
		font-size: 12px;
		margin-bottom: 10px;
	}
	.progress-box  .iconfont {
		font-size: 12px;
	}
	.progress {
		height: 25px;

	}
	.progress div {
		height: 25px;
		float: left;
	}
</style>