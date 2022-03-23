<script>
    import Head from "$lib/components/Head.svelte";

    import SongList from "$lib/components/SongList/SongList.svelte";
    import SongPlayer from "$lib/components/SongPlayer.svelte";

    let play;

    function handlePlay(e) {
        play(e.detail);
    }
</script>

<Head />

<SongList on:playSong={handlePlay} />
<SongPlayer bind:play />
