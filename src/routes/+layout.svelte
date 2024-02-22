<script lang="ts">
	import '$lib/css/app.css';
	import { inject } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights';

	injectSpeedInsights();
	inject();
</script>

<div class="w-full flex items-center justify-center">
	<div class="text-center m-8 w-1/2">
		<h1 class="text-3xl font-bold">ShareMySecret</h1>

		<slot />
	</div>
</div>
