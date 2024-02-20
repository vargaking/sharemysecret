<script lang="ts">
	export let data: any;
</script>

<h2 class="text-lg">Someone shared a secret with you!</h2>
<div class="mockup-window bg-base-300 my-10">
	<div class="flex justify-center px-4 py-16 bg-base-200">{data.secret}</div>
</div>
