<template>
	<div class="block" @click="onclick">
		<div 
			:style=" 'background-color:' +  color   " 
			class="block-in1">
		</div>
		<div class="block-in2">
			<div>{{language.b4}}: <span style="color: #00BAFF;">{{ID}}</span></div>
			<div>{{language.b6}}: <span>{{status}}</span></div>
		</div>
		<div class="block-in3">
			<div>{{language.b3}}:&nbsp;<span :style=" 'color:'+color ">{{type}}</span></div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			ID: {
				type: String,
				default: ''
			},
			status: {
				type: String,
				default: 'open'
			},
			type: {
				type: String,
				default: ''
			},
			color: {
				type: String,
				default: 'red'
			},
			setType: {
				type: String,
				default: ''
			}
		},
		computed: {
			language() {
				return this.$t("block");
			}
		},
		methods: {
			onclick() {
				wx.navigateTo({
					url: `/pages/ticket/details/main?id=${this.ID}&status=${this.status}&type=${this.type}&color=${this.color}&setType=${this.setType}`
				})
			}
		}
	}
</script>

<style scoped>
	.block {
		margin-bottom: 10px;
		position: relative;
		box-sizing: border-box;
		height: 60px;
		background-color: #FFF;
		border-radius: 10px;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
	}
	.block > div {
		position: absolute;
		height: 60px;
		top: 0;
	}
	.block-in1 {
		width: 15px;
		border-radius: 10px 0 0 10px;
		left: 0;
	}
	.block-in2 {
		width: 160px;
		left: 15px;
	}
	.block-in2 > div {
		height: 30px;
		line-height: 30px;
		box-sizing: border-box;
		padding-left: 10px;
	}
	.block-in3 {
		left: 175px;
		width: 120px;
		height: 30px;
		line-height: 30px;
	}
	.block-in4 {
		width: 70px;
		right: 0px;

	}

	.block-in4 > div {
		height: 30px;
	}

	.block-in4  > .text {
		font-size: 8px;
		line-height: 20px;
		text-align: center;
	}

	.block-in4 > .iconfont {
		font-size: 25px;
	}

	.block-in4 > div:nth-of-type(1) {
		text-align: center;
		line-height: 40px;
	}
 
</style>