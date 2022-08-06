<template>
	<div>
		<div class='mb-4 ml-8'>
			<h2 class='font-semibold text-3xl'>Добавление товара</h2>
		</div>
		<div class='container'>
			<form @submit.prevent='onSubmit'>
				<fieldset class='flex flex-col'>

					<label class='required'>Наименование товара</label>
					<input
						type='text'
						v-model.trim='title'
						placeholder='Введите наименование товара'
						required
					/>
					<div class='error' v-if='(!$v.title.minLength)'>Длина наименования должна быть не менее 3
						символов.
					</div>

					<label>Описание товара</label>
					<textarea class='resize-none h-28' v-model.trim='description' placeholder='Введите описание товара'
										maxlength='250' />

					<label class='required'>Ссылка на изображение товара</label>
					<input type='url' v-model='imgUrl' placeholder='Введите ссылку' required />
					<div class='error' v-if='(!$v.imgUrl.url)'>Введите корректную ссылку.</div>

					<label class='required'>Цена товара</label>
					<input type='text' v-model='parseNumber' placeholder='Введите цену' required />
					<div class='error' v-if='(!$v.price.numeric || !$v.price.minValue)'>Введите корректную цену товара.</div>

				</fieldset>
				<button class='btn' :disabled="title === '' || imgUrl === '' || price === ''">Добавить товар</button>
			</form>
		</div>
	</div>

</template>

<script>
import { actionTypes } from '@/store/modules/products'
import { url, required, minLength, maxLength, minValue, numeric } from 'vuelidate/lib/validators'

export default {
	name: 'AddForm',
	data() {
		return {
			title: '',
			description: '',
			imgUrl: '',
			price: '',
		}
	},
	validations: {
		title: { required, minLength: minLength(3) },
		description: { maxLength: maxLength(250) },
		imgUrl: { url, required },
		price: { required, numeric, minValue: minValue(1) },
	},
	computed: {
		parseNumber: {
			get() {
				return this.price.toLocaleString()
			},
			set(value) {
				this.price = +value.replace(/\s/g, '')
			},
		},
	},
	methods: {
		onSubmit() {
			this.$store.dispatch(actionTypes.createProduct, {
				title: this.title,
				description: this.description,
				imgUrl: this.imgUrl,
				price: this.price.toLocaleString('ru-RU'),
			})
		},
	},
}
</script>

<style scoped lang='scss'>
.container {
	@apply bg-[#FFFEFB] shadow-md pr-6 pb-6 pl-6 ml-8 rounded relative;

	label {
		@apply text-[#49485E] text-xs mb-1 mt-4;
	}

	input, textarea {
		@apply w-full rounded shadow py-2.5 px-4 text-xs text-[#3F3F3F];
	}

	.error {
		@apply text-[0.5rem] text-red-500 mt-[0.25rem];
	}

	.required:after {
		color: red;
		content: "*";
	}

	.btn {
		@apply bg-[#7BAE73] text-white w-full rounded-md py-2.5 mt-6 shadow-md
		hover:bg-green-600 transition-colors disabled:bg-[#EEEEEE] disabled:text-[#B4B4B4];
	}

}

</style>
