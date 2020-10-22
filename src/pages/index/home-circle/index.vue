<template>
	<div class="home-circle">
		<div class="content">
			<div style="height: 30px;">
				<span class="title" :style="styles" >{{language.v1}}:</span>
				<span class="number" :style="styles">{{ critical }}</span>
			</div>
			<div style="height: 30px;"> 
				<span class="title" :style="styles" >{{language.v2}}:</span>
				<span class="number" :style="styles">{{maintenance}}</span>
			</div>
			<div style="height: 30px;">
				<span class="title" :style="styles" >{{language.v3}}:</span>
				<span class="number" :style="styles">{{monitor}}</span>
			</div>
			<div style="height: 30px;">
				<span class="title" :style="styles" >{{language.v4}}:</span>
				<span class="number" :style="styles">{{titck}}</span>
			</div>	
		</div>
		<!--饼状图-->
		<div class="circle">
			<wux-circle :size="128" :percent="percent" color="#EEAC57">{{language.v5}}:{{ percent }}%</wux-circle>
		</div>
	</div>
</template>

<script>
	import * as API from '@/api/api-home'

	export default {
		props: {
			//进度条
			percent: {
				type: Number,
				default: 0
			},
			//故障
			critical: {
				type: Number,
				default: 0
			},
			//维护中的设备
			maintenance: {
				type: Number,
				default: 0
			},
			//监控中的设备
			monitor: {
				type: Number,
				default: 0
			},
			//处理中的工单
			titck: {
				type: Number,
				default: 0
			}
		},
		computed: {
			styles() {
				return 'line-height: 30px;'
			},
			language() {
				return this.$t("index");
			}
		},		
	}
</script>

<style lang="scss" scoped>
	.home-circle {
		position: relative;
		margin-top: 15px;
		margin-bottom: 30px;
		.content {
			width: 50%;

			& span {
				display: inline-block;
				text-align: right;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}

			.title {
				width: 60%;
			}

			.number {
				text-align: center;
				width: 15%;
				text-decoration: underline;
				margin-left: 5px;
			}

		}

		.circle {
			position: absolute;
			top: 0;
			right: 20px;
		}

	}
</style>


