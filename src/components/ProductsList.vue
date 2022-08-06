<template>
	<main class='ml-8'>
		<div v-if='products.length' class='flex justify-end'>
			<super-select
				:options='options'
				@select='sortProducts'
				:selected='selected.name' />
		</div>
		<ul class='grid grid-cols-3 gap-4 z-10'>
			<product-item
				v-for='product in products'
				:key='product._id'
				:product='product'
			/>
		</ul>
		<div v-if='!products.length' class='my-8'>
			<p class='text-center'>Список продуктов пуст.</p>
		</div>
	</main>
</template>

<script>
import ProductItem from '@/components/ProductItem'
import { mapGetters } from 'vuex'
import { actionTypes, getterTypes, mutationTypes } from '@/store/modules/products'
import SuperSelect from '@/components/SuperSelect'

export default {
	name: 'ProductsList',
	data() {
		return {
			options: [
				{ name: 'По имени', value: 'name' },
				{ name: 'По цене min', value: 'min' },
				{ name: 'По цене max', value: 'max' },
			],
			selected: { name: 'По умолчанию', value: 'default' },
		}
	},
	components: {
		SuperSelect,
		ProductItem,
	},
	computed: {
		...mapGetters({
			products: getterTypes.products,
		}),
	},
	methods: {
		sortProducts(option) {
			this.selected = option
			if (this.selected.value === 'name') {
				this.$store.commit(mutationTypes.sortByName)
			}
			if (this.selected.value === 'min') {
				this.$store.commit(mutationTypes.sortByMinPrice)
			}
			if (this.selected.value === 'max') {
				this.$store.commit(mutationTypes.sortByMaxPrice)
			}
		},
	},
	mounted() {
		this.$store.dispatch(actionTypes.initializationApp)
	},
}
</script>


