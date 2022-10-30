<script>
    import { afterUpdate } from 'svelte';
    import { fade } from 'svelte/transition';
    import YTPLAYER from './YTPLAYER.svelte';
    import LOADING from './LOADING.svelte';
    import Recommended from './Recommended.svelte';
    import Message  from './render.svelte';
    import { isImage } from './logic.js';
    export let messages = [];
    export let typing = false;
    let caja;

    afterUpdate(() => caja.scrollTo(0, caja.scrollHeight));
</script>

<style>
    .msgbox {
        height: 60vh;
    }
</style>

<div bind:this={caja} class="flex msgbox flex-col bg-gray-900 text-white overflow-y-auto overscroll-none w-full rounded-lg xl:text-xl">
    {#each messages as msg, i}
        <div in:fade class="flex inline block gap-4 border-t-2 p-4 border-gray-800">
            <img alt="perfil" class="w-12 h-12 rounded-full" src={msg.poster.pfp}>
            <div>
                <p class="text-gray-500">{msg.poster.name}</p>
                <Message message={msg.content}/>
                {#if msg.attachments}
                    <div class="flex flex-wrap my-2 gap-2">
                        {#each msg.attachments as file}
                            {#if file.includes('youtube.com') || file.includes('youtu.be')}
                                <YTPLAYER link={file}></YTPLAYER>
                            {:else}
                                {#await isImage(file)}
                                    <div class="flex h-24 w-64 bg-black rounded-lg justify-center place-items-center opacity-25"><LOADING /></div>
                                {:then data}
                                    {#if data === true}
                                        <!-- svelte-ignore a11y-missing-attribute -->
                                        <img src={file} class="h-48 rounded-lg"/>
                                    {:else}
                                        <p class="text-blue-500 hover:text-blue-200"><a href={file}>{file}</a></p>
                                    {/if}
                                {/await}
                            {/if}
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
        {#if i === (messages.length-1) && msg.poster.name === "Asistente" && typeof msg.theme === 'string'}
            <Recommended bind:msg bind:messages bind:typing />
        {/if}
    {/each}
    {#if typing !== false}
        <div in:fade class="flex flex-grow border-t-2 p-4 border-gray-800 bg-typing">
            <div class="text-gray-500">
                {typing} está escribiendo...
            </div>
        </div>
    {/if}
</div>
