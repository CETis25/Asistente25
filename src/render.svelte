<script>
    export let message = '';
    export let displayMode = false;

    import { renderMessage } from './render.js';

    $: returnableMessage = renderMessage(message, displayMode);
</script>

<svelte:head>
	<link rel="stylesheet" href="../katex/katex.css">
</svelte:head>
<p class="whitespace-pre-wrap">
    {@html returnableMessage}
</p>