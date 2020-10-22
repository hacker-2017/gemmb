<template>
	<div class="title">
        <span :class="[family, name]"></span>&nbsp;<span>{{value}}</span>
    </div>
</template>

<script>
	export default {
		props: {
			family: {
				type: String,
				default: 'iconfont'
			},
			name: {
				type: String,
				default: ''
			},
			value: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title {
        height: 30px;
        line-height: 30px;
        font-size: 16px;
    }
</style>