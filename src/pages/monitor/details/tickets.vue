<template>
	<div class="block" @click="myclick">
		<div 
			:style=" 'background-color:' +  color   " 
			class="block-in1">
		</div>

		<div class="content-text">
			<div style="width: 150px;display: inline-block;">
				<span class="font">{{language.t2}}:&nbsp;</span>
				<span 
					:style="styles"
					style="width: 90px;text-decoration: underline;"> 
					{{TicketId}}
				</span>
			</div>
			<span class="font">{{language.t3}}:&nbsp;</span>
			<span style="width: 90px;" :style="styles">{{Priority}}</span>
		</div>
		<div class="content-text">
			<div style="width: 150px;display: inline-block;">
				<span class="font">{{language.t10}}:&nbsp;</span><span style="width: 90px;">{{type}}</span>
			</div>
			<span class="font">{{language.t4}}:&nbsp;</span><span style="width: 90px;">{{TicketState}}</span>
		</div>
		<div class="content-text">
			<span class="font">{{language.t11}}:&nbsp;</span><span>{{time}}</span>
		</div>
		
	</div>
</template>

<script>
	export default {
		props: {
			TicketId: [String,Number],
			TicketType: [String,Number],
			TicketState:[String,Number],
			Priority: [String,Number],
			LocalTime:{
				type:String,
				default: ''
			},
			color: {
				type: String,
				default: 'red'
			}
		},
		computed: {
			language() {
				return this.$t("ticketDetils");
			},
			styles() {
				return `color:${this.color}`
			},
			time() {
				let a = this.LocalTime;
				
				let b = a.replace("T"," ");

				const index = b.indexOf(".");

				return b.slice(0,index)
			},
			type() {
				if(this.TicketType==0){
					return "Incident"
				}
				if(this.TicketType==1){
					return "Problem "
				}
				if(this.TicketType==2){
					return "Change"
				}
				if(this.TicketType==3){
					return "Request "
				}
			}
		},
		methods: {
			myclick() {
				const param = {
					id: this.ID,
					status: this.status,
					priority: this.priority,
					color: this.color
				}
				this.$emit("critical", param)
			}
		}
	}
</script>

<style scoped>
	.block {
		margin-bottom: 10px;
		position: relative;
		box-sizing: border-box;
		height: 100px;
		background-color: #FFF;
		border-radius: 10px;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
		padding: 10px;
		box-sizing: border-box;
	}
	.block-in1 {
		width: 15px;
		border-radius: 10px 0 0 10px;
		left: 0;
		position: absolute;
		height: 100px;
		top: 0;
	}

	.content-text {
		font-size: 14px;
		margin-left: 20px;
		height: 26px;
		line-height: 26px;
	}
	.font {
		color: #999999;
	}
	.content-text > span {
		display: inline-block;
	}
	
</style>