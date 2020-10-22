<template>
	<div
		@touchstart="touchstart"
		@touchend="touchend"
		@touchmove="touchmove">

		<div class="loading-text" :style="styles">{{ message }}</div>

		<div class="loading-animation" v-show="show">
			<van-loading type="spinner" :size="18"/>
		</div>

		<scroll-view 
			class="content"
			:scroll-y="true"
			:style="'height:' + defaultHeight + 'px;'"
			@click="onClick"
			@scrolltolower="tolower"
			@scroll="onScroll"
		>

			<slot></slot>

		</scroll-view>

	</div>
</template>

<script>
	export default {
		props: {
			distance: {
				type: Number,
				default: 30,
				validator(value) {
			        return value > 20
			    }
			},
			defaultHeight: {
				type: Number,
				default: 600
			}
		},
		data() {
			return {
				touchY: 0,
				height: 0,
				message: ''
			}
		},
		computed: {
			styles() {
				return `height:${this.height}px;line-height:${this.height}px;`
			},
			show() {
				return this.$store.state.loading
			}
		},
		watch: {
			height(val) {
				if (val < 20) {
					this.message = ''; 
					return;
				}
				if (val >= 20 && val < this.distance) {
					this.message = 'pull-to-refresh';
					return;
				}
				if (val >= this.distance) {
					this.message = 'Release update';
					return;
				}
			}
		},
		methods: {
			touchstart(e) {
				this.touchY = e.clientY;
			},
			touchmove(e) {
				if (this.$store.state.loading) {
					return;
				}

				this.height = e.clientY - this.touchY > this.distance 
				? this.distance : e.clientY - this.touchY;
			},
			touchend() {
				if (this.height == this.distance){
					this.$emit('Refresh');
					this.$store.state.loading = true
				}

				this.height = 0 ; 
				this.message = '';
			},

			onClick() {
				this.$emit("onClick")
			},

			tolower() {
				this.$emit("tolower")
			},

			onScroll() {
				this.$emit("onScroll")
			}
		}
		
	}
</script>

<style scoped>
	.content {
		padding: 10px;
		box-sizing: border-box;
		font-size: 14px;
	}
	.loading-text {
		text-align: center;
		font-size: 12px;
	}

	.loading-animation {
		text-align: center;
		height: 18px;
		margin-top: 8px;
	}

</style>