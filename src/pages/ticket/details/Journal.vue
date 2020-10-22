<template>
	<div class="box" @click="open = !open">
		<div class="content-box" :style="styles">
			<div v-html="html"></div>
		</div>
		<div class="time">
			<span>{{time}}</span>
			<span style="position: absolute; right: 20px">{{contacts}}&nbsp;[{{company}}]</span>
		</div>
		<div :style=" 'background-color:' + color + ';' " class="left"></div>
	</div>
</template>

<script>
	export default {
		props:{
			color: {
				type:String,
				default: 'yellow'
			},
			dataTime: {
				type: String,
				default: ''
			},
			contacts: {
				type: String,
				default: ''
			},
			company: {
				type: String,
				default: ''
			},
			html: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				open: false
			}
		},
		computed: {
			styles() {
				if (this.open) return 'max-height: 100%';
				else return ''
			},
			time() {
				let a = this.dataTime;
				
				let b = a.replace("T"," ");

				const index = b.indexOf(".");

				return b.slice(0,index)
			}
		},
		methods: {
			
		},

		mounted() {
			
		}

	}
</script>


<style scoped>
	.time {
		height: 20px;
		box-sizing: border-box;
		padding-left: 30px;
		font-size: 12px;
		display: inline-block;
	}
	.box {
		background-color: #FFF;
		border-radius: 10px;
		position: relative;
		margin-bottom: 10px;
	}
	.content-box {
		min-height: 90px;
		max-height: 90px;
		height: 100%;
		box-sizing: border-box;
		padding: 5px 15px 5px 30px;
		overflow: hidden;
		margin-bottom: 5px;
		text-align: justify;
		text-justify: newspaper;
		word-break: break-all;
	}
	.left {
		height: 100%;
		width: 15px;
		position: absolute;
		top: 0px;
		left: 0px;
		border-radius: 10px 0 0 10px;
	}
	
</style>