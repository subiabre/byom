<script>
    import api from "$lib/utils/api";
    import { afterUpdate, createEventDispatcher } from "svelte";
    import SongPicture from "../Song/SongPicture.svelte";

    export let song = {
        id: 0,
        title: "",
        album: "",
        artist: "",
        metadata: {
            playtime: 0,
            totaltracks: 0,
            tracknumber: 0,
        },
    };

    const dispatch = createEventDispatcher();

    let albumData = "";
    let picture = api.picture(song.id);

    function playSong() {
        dispatch("playSong", song);
    }

    afterUpdate(() => {
        picture = api.picture(song.id);
        albumData = `${song.album} - ${song.metadata.tracknumber}/${song.metadata.totaltracks} (${song.metadata.playtime})`;
    });
</script>

<li style="--picture:url({picture})" on:click={playSong}>
    <SongPicture width="25%" {song} />
    <div class="data">
        <h4 title={song.title} class="title">{song.title}</h4>
        <p title={albumData}>{albumData}</p>
        <p title={song.artist}>{song.artist}</p>
    </div>
</li>

<style>
    :root {
        --img-size: 10vh;
    }

    li {
        width: calc(100% - 2vh);
        min-width: 300px;
        margin: 1vh;
        float: left;
        font-family: Arial, Helvetica, sans-serif;
        color: white;
        box-shadow: 0 0 1em #030303;
        background-image: var(--picture);
        background-size: 100% auto;
        background-position: center;
        display: flex;
    }

    li:hover {
        cursor: pointer;
        box-shadow: 0 0 1em #333;
    }

    .data {
        flex: 100%;
        max-width: calc(75% - 2em);
        padding: 1em;
        background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0.9) 60%,
            rgba(0, 0, 0, 0.7) 100%
        );
    }

    .data p,
    div h4 {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-shadow: 1px 1px 4px black;
    }

    p {
        margin: 0;
        font-size: 0.8em;
        color: #a6a6a6;
    }

    .title {
        margin: 0 0 1em 0;
        color: white;
        font-weight: lighter;
    }
</style>
