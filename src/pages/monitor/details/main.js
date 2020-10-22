import Vue from 'vue'
import App from './index'

import store from '@/store/main'
import i18n from '@/i18n/main'

const app = new Vue({
	store,
	i18n,
	...App
})
app.$mount()
