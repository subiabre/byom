<script>
    import api from "$lib/utils/api";
    import { title } from "$lib/stores/title";
    export const play = (song) => playSong(song);

    let player;
    let stream;

    async function playSong(song) {
        title.update(value => `${song.title} @ Byom`);
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
