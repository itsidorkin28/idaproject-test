import { getItem, setItem } from '@/helpers/persistanceStorage'
import {mutationTypes, actionTypes, getterTypes} from './types/products.types'
const state = {
	products: [
		{
			_id: '1',
			imgUrl: 'https://avatars.mds.yandex.net/get-zen_doc/1131118/pub_5e52719f4ae6635ac2748d1e_5e5271bf11638a2a18c1508f/scale_1200',
			title: 'Гора',
			description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
			price: '2 000',
		},
		{
			_id: '2',
			imgUrl: 'https://avatars.mds.yandex.net/i?id=dd95a2ab3b6f36bb1141c6fdc7f41274-3788222-images-thumbs&ref=rim&n=33&w=480&h=270',
			title: 'Вафля',
			description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
			price: '4 000',
		},
		{
			_id: '3',
			imgUrl: 'https://avatars.mds.yandex.net/get-zen_doc/1131118/pub_5e52719f4ae6635ac2748d1e_5e5271bf11638a2a18c1508f/scale_1200',
			title: 'Банан',
			description: '',
			price: '3 000',
		},
		{
			_id: '4',
			imgUrl: 'https://avatars.mds.yandex.net/i?id=dd95a2ab3b6f36bb1141c6fdc7f41274-3788222-images-thumbs&ref=rim&n=33&w=480&h=270',
			title: 'Арбуз',
			description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
			price: '1 000',
		},
	],
}


const mutations = {
	[mutationTypes.setProducts](state, payload) {
		state.products = payload
	},
	[mutationTypes.createProduct](state, payload) {
		state.products.unshift(payload)
	},
	[mutationTypes.removeProduct](state, payload) {
		const index = state.products.findIndex(product => product._id === payload)
		if (index !== -1) state.products.splice(index, 1)
	},
	[mutationTypes.sortByName](state) {
		state.products.sort((a, b) => a.title.localeCompare(b.title))
	},
	[mutationTypes.sortByMinPrice](state) {
		state.products.sort((a, b) => a.price > b.price ? 1 : -1)
	},
	[mutationTypes.sortByMaxPrice](state) {
		state.products.sort((a, b) => a.price < b.price ? 1 : -1)
	},
}

const actions = {
	[actionTypes.initializationApp](context) {
		const products = getItem('products')
		if (products) {
			context.commit(mutationTypes.setProducts, products)
		} else {
			context.commit(mutationTypes.setProducts, context.state.products)
			setItem('products', context.state.products)
		}
	},
	[actionTypes.createProduct](context, payload) {
		context.commit(mutationTypes.createProduct, payload)
		setItem('products', context.state.products)
		this._vm.$toast.success('Продукт успешно добавлен!')
	},
	[actionTypes.removeProduct](context, payload) {
		context.commit(mutationTypes.removeProduct, payload)
		setItem('products', context.state.products)
		this._vm.$toast.success('Продукт успешно удален!')

	},
}

const getters = {
	[getterTypes.products]: state => {
		return state.products
	},
}

export default {
	state,
	actions,
	mutations,
	getters,
}
