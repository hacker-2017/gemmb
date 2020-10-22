import Vue from 'vue'
import App from './App'

import store from '@/store/main'


//注册全局组件
import Title from '@/components/app-title/index.vue'
import Footer from '@/components/app-footer/index.vue'
import Loading from '@/components/app-loading/index.vue'
import Header from '@/components/app-header/index.vue'

Vue.component("app-title", Title);
Vue.component("app-footer", Footer);
Vue.component("app-loading", Loading);
Vue.component("app-header", Header);

import '@/assets/font/iconfont.css'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()


Date.prototype.format = function(fmt) { 
     var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt; 
}        