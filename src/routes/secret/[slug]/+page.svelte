<script lang="ts">
	export let data: any;
</script>

<h2 class="text-lg">Someone shared a secret with you!</h2>
<div class="mockup-window bg-base-300 my-10">
	<div class="flex justify-center px-8 py-6 bg-base-200 text-left">{data.secret}</div>
</div>
