<script>
export default {
		data () {
			return {
				name: ''
			}
		},
		methods: {
			submit () {
				console.log('submitted');
				this.$axios
					.post('/post', {
						name: this.name
					})
					.then(res => console.log(res.data));
			}
		}
	}
</script>

<template>
  <div class="post">
	<h1>FORM</h1>
	<form @submit.prevent>
	  <label>input:
		<input v-model="name" placeholder="name" type="text" @keyup.enter="submit">
	  </label>
	  <button type="submit" @click="submit">
			submit
	  </button>
	</form>
  </div>
</template>

<style>
  * {
	font-family: 'Courier';
  }
</style>
