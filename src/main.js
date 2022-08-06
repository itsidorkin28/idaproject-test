import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './index.scss'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

const options = {
	timeout: 2000,
}

Vue.use(Vuelidate)
Vue.use(Toast, options)

new Vue({
	store,
	render: h => h(App),
}).$mount('#app')
