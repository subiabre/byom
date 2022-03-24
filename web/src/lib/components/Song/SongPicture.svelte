<script>
    import api from "$lib/utils/api";
    import { afterUpdate } from "svelte";

    export let song;
    export let width;

    let picture;

    afterUpdate(() => {
        picture = api.picture(song.id);
    });
</script>

<div style="--width: {width}; --picture:url({picture});" class="img" alt={`Picture for ${song.title}`} title={song.title} />
<style>
    .img {
        width: var(--width);
        background-image: var(--picture);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        background-color: rgba(0, 0, 0, 1);
    }
</style>
