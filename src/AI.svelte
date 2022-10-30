<script>
    import MSGBOX from './MSGBOX.svelte';
    import MSGSENDER from './MSGSENDER.svelte';
    import { fly } from 'svelte/transition';
    export let messages;
    export let typing;
</script>

<div class="w-full xl:w-1/2 xl:flex-shrink h-full bg-gray-800 rounded-lg p-2" in:fly="{{ y: 100, duration: 1000}}">
    <div class="w-full h-full flex-col">
        <MSGBOX bind:messages bind:typing />
        <MSGSENDER bind:messages bind:typing />
    </div>
</div>
