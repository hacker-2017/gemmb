<template>
	<van-tabbar :active="active" :active-color="activeColor">
		<van-tabbar-item v-for="(item, index) in tabBar" :key="index" 
			@click="activeIndex(item.path,index)">
			<van-icon class="iconfont" :class="item.iconName" slot="icon-active"/>
			<van-icon class="iconfont" :class="item.iconName" slot="icon"/>
			<span>{{ language[item.title] }}</span>
		</van-tabbar-item>
	</van-tabbar>
</template>

<script>
	export default {
		props: {
			activeColor: {
				type: String,
				default: '#2e7dcc'
			},
			active: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				tabBar: [
					{	
						title: 'home',
						iconName: 'icon-home',
						path: 'index'
					},
					{
						title: 'monitor',
						iconName: 'icon-jiankong',
						path: 'monitor'
					},
					{
						title: 'ticket',
						iconName: 'icon-gongdan',
						path: 'ticket'
					},
					{
						title: 'setting',
						iconName: 'icon-admin',
						path: 'setting'
					}
				]
			}
		},
		computed: {
			language() {
				return this.$t("tabBar");
			}
		},
		methods: {
			activeIndex(path,index) {
				if (index == this.active) return;
				wx.reLaunch({url: `/pages/${path}/main`}) 
			}
		}
	}
</script>


