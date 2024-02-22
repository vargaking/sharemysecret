<script lang="ts">
	import { enhance } from '$app/forms';
	import AlertContainer from '$lib/common/alerts/AlertContainer.svelte';
	import InfoAlert from '$lib/common/alerts/InfoAlert.svelte';
	import ErrorAlert from '$lib/common/alerts/ErrorAlert.svelte';
	import SuccessAlert from '$lib/common/alerts/SuccessAlert.svelte';
	import { PUBLIC_SITE_URL } from '$env/static/public';

	let showLoading = false;
	let successMessage = '';
	let errorMessage = '';

	let secretUrl = '';
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
				successMessage = 'Secret created successfully';

				secretUrl = `${PUBLIC_SITE_URL}/secret/${result.data.url}`;

				setTimeout(() => {
					successMessage = '';
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
	{#if secretUrl}
		<button
			on:click={() => {
				navigator.clipboard.writeText(secretUrl);

				successMessage = 'Url copied to clipboard!';

				setTimeout(() => {
					successMessage = '';
				}, 3000);
			}}
			type="button"
			class="btn btn-accent">Copy secret url</button
		>
	{:else}
		<button type="submit" class="btn btn-primary">Share secret</button>
	{/if}
</form>

<AlertContainer>
	{#if showLoading}
		<InfoAlert>Creating secret...</InfoAlert>
	{/if}
	{#if successMessage}
		<SuccessAlert>{successMessage}</SuccessAlert>
	{/if}
	{#if errorMessage}
		<ErrorAlert>{errorMessage}</ErrorAlert>
	{/if}
</AlertContainer>
