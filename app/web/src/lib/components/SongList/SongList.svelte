<script>
    import api from "$lib/utils/api";
    import SongListItem from "$lib/components/SongList/SongListItem.svelte";
    import SongListLoader from "$lib/components/SongList/SongListLoader.svelte";

    let page = 0;
    let items = [];

    let hasNext = true;
    let isLoading = false;

    let input = "";
    let query = parseInputValues();

    async function fetchData(isSearch = false) {
        isLoading = true;

        const res = await api.request([
            `/music`,
            `?page=${page}`,
            `&title=${query.title}`,
            `&album=${query.album}`,
            `&artist=${query.artist}`,
            `&order[id]=${query.order}`,
        ]);

        const data = res.ok
            ? await res.json()
            : { "hydra:member": [], "hydra:view": {} };

        hasNext = "hydra:next" in data["hydra:view"];
        items = isSearch
            ? data["hydra:member"]
            : [...items, ...data["hydra:member"]];

        isLoading = false;
    }

    function loadNext() {
        page = page + 1;

        fetchData(false);
    }

    function updateSearch() {
        page = 1;
        items = [];
        query = parseInputValues();

        fetchData(true);
    }

    function parseInputValues() {
        const title = input.match(/((?<=\$|^)[^@#$!]{1,})/);
        const album = input.match(/((?<=#)[^@#$!]{1,})/);
        const artist = input.match(/((?<=@)[^@#$!]{1,})/);
        const order = input.match(/((?<=!)[^@#$!]{1,})/);

        return {
            title: title ? title[0].trim() : "",
            album: album ? album[0].trim() : "",
            artist: artist ? artist[0].trim() : "",
            order: order ? order[0].trim() : "",
        };
    }
</script>

<svelte:head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>
<div class="main">
    <input
        type="text"
        placeholder="Search for music..."
        bind:value={input}
        on:input={updateSearch}
    />
    <ul>
        {#each items as item}
            <SongListItem song={item} on:playSong />
        {/each}
        <SongListLoader bind:hasNext bind:isLoading on:loadNext={loadNext} />
    </ul>
</div>

<style>
    :global(body) {
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
        background-color: #191919;
    }

    .main {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }

    input {
        width: calc(100% - 2em);
        margin: 0;
        padding: 1em;
        border: none;
        outline: none;
        color: #bababa;
        font-size: 1.25em;
        background-color: #050505;
    }

    ul {
        height: calc(100% - 4em - 16vh);
        margin: 0;
        padding: 0;
        list-style: none;
        overflow-y: scroll;
        overflow-x: hidden;
        display: grid;
        grid-auto-rows: min-content;
        grid-template-columns: repeat(5, 19.8vw);
    }

    @media only screen and (max-width: 1750px) {
        ul {
            grid-template-columns: repeat(4, 24.75vw);
        }
    }

    @media only screen and (max-width: 1500px) {
        ul {
            grid-template-columns: repeat(3, 32.75vw);
        }
    }

    @media only screen and (max-width: 1200px) {
        ul {
            grid-template-columns: repeat(2, 49.2vw);
        }
    }

    @media only screen and (max-width: 650px) {
        ul {
            grid-template-columns: 98vw;
        }
    }
</style>
