<template>
	<div class='app-wrapper'>
		<add-form />
		<div class='products'>
			<products-list />
		</div>
	</div>
</template>

<script>
import AddForm from '@/components/AddForm'
import ProductsList from '@/components/ProductsList'

export default {
	name: 'App',
	components: {
		ProductsList,
		AddForm,
	},
}
</script>

<style scoped lang='scss'>
$bar-width: 25%;

.app-wrapper {
	@apply relative my-8 mx-8;

	div:first-child {
		@apply fixed top-8 left-8;
		width: $bar-width;
		max-width: 350px;

		&::-webkit-scrollbar {
			display: none;
		}
	}

	div:first-child {
		@apply left-0;
	}

	.products {
		@apply min-h-screen;
		margin: 0 0 0 $bar-width;
	}
}
</style>
