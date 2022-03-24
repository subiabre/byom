<script>
    import { title } from "$lib/stores/title";

    let displayTitle;

    title.subscribe(value => {
        displayTitle = value;
    });
</script>

<svelte:head>
    <title>{displayTitle}</title>
</svelte:head>
