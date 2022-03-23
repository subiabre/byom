<script>
    import SongList from "$lib/components/SongList/SongList.svelte";
    import SongPlayer from "$lib/components/SongPlayer.svelte";

    let play;

    function handlePlay(e) {
        play(e.detail);
    }
</script>

<SongList on:playSong={handlePlay}/>
<SongPlayer bind:play />

<style>
    :global(body) {
        background-color: #030303;
    }
</style>
