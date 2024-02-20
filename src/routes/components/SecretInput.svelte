<script lang="ts">
	import { enhance } from '$app/forms';
	import AlertContainer from '$lib/common/alerts/AlertContainer.svelte';
	import InfoAlert from '$lib/common/alerts/InfoAlert.svelte';
	import ErrorAlert from '$lib/common/alerts/ErrorAlert.svelte';
	import SuccessAlert from '$lib/common/alerts/SuccessAlert.svelte';

	let showLoading = false;
	let showSuccess = false;
	let errorMessage = '';
</script>

<form
	method="POST"
	action="?/createSecret"
	use:enhance={() => {
		showLoading = true;

		return async ({ result }) => {
			setTimeout(() => {
				showLoading = false;
			}, 2000);

			if (result.status == 400) {
				errorMessage = 'Secret is required';

				setTimeout(() => {
					errorMessage = '';
				}, 3000);

				return;
			} else if (result.status == 200) {
				showSuccess = true;

				setTimeout(() => {
					showSuccess = false;
				}, 3000);
			} else if (result.status == 500) {
				errorMessage = 'Server error';

				setTimeout(() => {
					errorMessage = '';
				}, 3000);
			}
		};
	}}
>
	<textarea
		name="secret"
		class="textarea textarea-primary w-full min-h-40 my-4 text-lg focus:outline-none"
		placeholder="Your secret goes here..."
	></textarea>
	<button type="submit" class="btn btn-primary">Share secret</button>
</form>

<AlertContainer>
	{#if showLoading}
		<InfoAlert>Creating secret...</InfoAlert>
	{/if}
	{#if showSuccess}
		<SuccessAlert>Secret created!</SuccessAlert>
	{/if}
	{#if errorMessage}
		<ErrorAlert>{errorMessage}</ErrorAlert>
	{/if}
</AlertContainer>
