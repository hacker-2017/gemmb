<template>
	<div class="block" @click="deviceMore">
		<div class="block-left" :style=" 'background-color:' + color + ';'  ">
			<span>{{severityText}}</span>
		</div>
		<div class="block-middle">
			<div>
				{{language.b1}}:
				<span style="color: #00BAFF;text-decoration: underline;">
				{{name}}
				</span>
			</div>
			<div>ip: {{ip}}</div>
			<div>{{language.b2}}: {{location}}</div>
		</div>
		<div class="block-right">
			<div style="height: 20px;line-height: 20px;">
				<span>{{language.b3}}: {{type}}</span>
			</div>
			<div><span class="iconfont" :class="icon"></span></div>
		</div>
	</div>
</template>


<script>
	export default {
		props: {
			deviceId: {
				type: Number,
				require:true
			},
			name: {
				type: String,
				default: ''
			},
			ip: {
				type: String,
				default: ''
			},
			location: {
				type: String,
				default: ''
			},
			type: {
				type: String,
				default: ''
			},
			color: {
				type: String,
				default: ''
			},
			severity: {
				type: Number
			},
			locationId: {
				type: Number
			}
		},
		mounted() {
			
		},
		computed: {
			severityText() {
				if (this.severity==0) return 'Critical';
				if (this.severity==3) return 'Warning';
				if (this.severity==2) return 'Minor';
				if (this.severity==1) return 'Major';
				if (this.severity==4) return 'Normal';
			},
			icon() {
				return `icon-${this.type}`
			},
			language() {
				return this.$t("block");
			}
		},
		methods: {
			deviceMore() {
				wx.navigateTo({url:`/pages/monitor/details/main?id=${this.deviceId}&name=${this.name}&ip=${this.ip}&location=${this.location}&type=${this.type}&color=${this.color}&locationId=${this.locationId}`})
			}
		}
	}
</script>


<style scoped>
	.block {
		height: 65px;
		background-color: #FFF;
		border-radius: 5px;
		box-sizing: border-box;
		padding: 4px 0px 4px 5px;
		font-size: 12px;
		margin-bottom: 10px;
	}

	.block > div {
		float: left;
	}

	.block-left {
		width: 20%;
		border-radius: 5px;
		height: 53px;
		margin-top: 2px;
		color: #FFF;
		font-size: 16px;
		line-height: 53px;
		text-align: center;
	}

	.block-middle {
		width: 58%;
		height: 57px;
		box-sizing: border-box;
		padding: 0 10px 0 10px;
	}

	.block-middle > div { 
		height: 19px;
		line-height: 19px;
		text-align: left;
		overflow: hidden;
	}

	.block-right {
		height: 100%;
		width: 22%;
		position: relative;
	}

	.iconfont {
		font-size: 20px;
		position: absolute;
		top: 30px;
		right: 20px;
	}


</style>


