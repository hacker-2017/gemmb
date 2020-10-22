<template>
	<van-nav-bar :title="title" :left-arrow="leftArrow"/>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: 'GNC基础架构监控平台'
			},
			leftArrow: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
			
			}
		}
	}
</script>