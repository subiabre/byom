<script>
	import {
		onMount,
		onDestroy,
		createEventDispatcher,
		afterUpdate,
	} from "svelte";
	import PulseEmitter from "../AnimatedItems/PulseEmitter.svelte";

	export let hasNext = true;
	export let isLoading = false;

	let element;
	let observer;

	const dispatch = createEventDispatcher();

	function handleIntersections(entries) {
		const entry = entries[0];
		if (entry.isIntersecting && hasNext) {
			dispatch("loadNext");
		}
	}

	function createObserver() {
		observer = new IntersectionObserver(handleIntersections, {
			threshold: 0.1,
		});
	}

	function removeObserver() {
		if (typeof observer !== "undefined" && !isLoading) {
			observer.disconnect();
		}
	}

	function reloadObserver() {
		if (typeof observer !== "undefined" && !isLoading) {
			observer.observe(element);
		}
	}

	onMount(() => {
		createObserver();
	});

	onDestroy(() => {
		removeObserver();
	});

	afterUpdate(() => {
		reloadObserver();
	});
</script>

{#if !isLoading}
	<li bind:this={element}>
		<h3>This is the end, my friend.</h3>
		{#if hasNext}
			<p>But there is more! Scroll down to load.</p>
		{:else}
			<p>There is nothing more. Go get more music.</p>
		{/if}
	</li>
{:else}
	<li>
		<h3>Here comes the sun.</h3>
		<p>Fetching data. Just wait a second.</p>
		<PulseEmitter />
	</li>
{/if}

<style>
	li {
		padding: 1vh;
		color: white;
	}

	li h3 {
		margin: 0;
	}
</style>
