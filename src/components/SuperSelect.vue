<template>
	<div class='super-select' @click.stop>
		<p
			class='border shadow cursor-pointer text-[#B4B4B4] text-xs flex justify-center items-center'
			@click='areOptionsVisible = !areOptionsVisible'>
			{{ selected }}
			<svg class='ml-[0.3rem]' width='8' height='6' viewBox='0 0 8 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
				<path d='M7.48532 1.24264L4.24268 4.48528L1.00003 1.24264' stroke='#B4B4B4' />
			</svg>
		</p>

		<div
			v-if='areOptionsVisible'
			class='options'>
			<p
				class='text-xs'
				v-for='option in options'
				:key='option.value'
				@click='selectOption(option)'>
				{{ option.name }}
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SuperSelect',
	props: {
		options: {
			type: Array,
			default() {
				return []
			},
		},
		selected: {
			type: String,
			default: 'По умолчанию',
		},
	},
	data() {
		return {
			areOptionsVisible: false,
		}
	},
	methods: {
		selectOption(option) {
			this.$emit('select', option)
			this.areOptionsVisible = false
		},
		hideSelect() {
			this.areOptionsVisible = false
		},
	},
	mounted() {
		document.addEventListener('click', this.hideSelect)
	},
	beforeDestroy() {
		document.removeEventListener('click', this.hideSelect)
	},
}
</script>

<style scoped lang='scss'>
.super-select {
	@apply relative w-[8rem] flex flex-col justify-center items-center text-center mb-4;

	p {
		@apply m-0 w-full bg-[#FFFEFB] px-4 py-2.5;
	}

	.options {
		@apply w-full bg-[#FFFEFB] border shadow absolute top-8 right-0 z-50;

		p:hover {
			@apply bg-gray-200 cursor-pointer;
		}
	}

}
</style>
