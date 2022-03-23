<script>
    import api from "$lib/utils/api";
    export const play = (song) => playSong(song);
    
    let player;
    let stream;

    async function playSong(song) {
        stream = `${api.root()}/${song.storage.path}`;

        await player.load();
        player.play();
    }

</script>

<audio bind:this={player} src={stream} controls />

<style>
    audio {
        width: 100%;
        position: fixed;
        bottom: 0;
    }
</style>
