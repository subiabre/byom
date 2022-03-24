<script>
    import api from "$lib/utils/api";
    import { title } from "$lib/stores/title";
    import SongPicture from "./Song/SongPicture.svelte";

    export const play = (song) => playSong(song);

    let player;
    let stream;
    let song = {
        id: 1,
        title: "",
        album: "",
        artist: "",
        metadata: {
            playtime: 0,
            totaltracks: 0,
            tracknumber: 0,
        },
    };

    async function playSong(data) {
        song = data;
        stream = `${api.root()}/${data.storage.path}`;

        await player.load();
        player.play();

        title.update(() => `${data.title} @ Byom`);
    }
</script>

<div>
    <SongPicture width="10%" {song} />
    <audio bind:this={player} src={stream} controls />
</div>

<style>
    div {
        width: 100%;
        height: 16vh;
        display: flex;
        bottom: 0;
        position: fixed;
        color: white;
        background-color: black;
    }

    div audio {
        flex: auto;
    }
</style>
