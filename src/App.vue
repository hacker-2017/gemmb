<script>
  import { deviceList ,deviceGroupItems } from '@/api/api-monitor'
  export default {
      async onLaunch() {
    	    if(!wx.getStorageSync("access_token")) {
		          wx.reLaunch({ url: "/pages/login/main" }) 
		      }
  	  },
      async onShow() {
          wx.hideTabBar({});
 	    }
  }
</script>

<style lang="scss">
  @import './assets/styles/common.scss'
</style>
