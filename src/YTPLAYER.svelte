<script>
    import { onMount } from 'svelte';

    import YouTubePlayer from 'youtube-player';
    export let link = '';

    link = link.match(/[^=\/]+$/i)[0];
    let id = ((new Date).getTime() + Math.floor(Math.random()*20)).toString().slice(-6);
    let player;

    onMount(()=>{
        player = YouTubePlayer(id, {
            videoId: link
        });
    });
</script>
<div id={id} class="w-full rounded-lg"></div>