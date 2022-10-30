<script>
    import { findRecommendations } from './logic.js';
    export let msg;
    export let messages;
    export let typing;
    let arrayOfQuestions = findRecommendations(msg.theme, { exclude: msg.content });
    import { makeMessage } from './logic.js';

    async function enviar (r) {
        messages = [... messages, makeMessage({reply: r.originalQuery}, 'Tú', './img/DGETI_logo.svg')];
        typing = 'Asistente';
        setTimeout(async () => {
            messages = [... messages, makeMessage(r)];
            typing = false;
        }, 1000);
    }
</script>
{#if arrayOfQuestions.length > 0}
    <div class="w-full py-2 font-oswald flex place-items-center justify-center bg-dgeti flex-col shadow-inner mb-12">
        <h1>
            Preguntas relacionadas
        </h1>
        <div class="justify-center w-full flex flex-row gap-5 font-sans">
            {#each arrayOfQuestions as recommendation}
                <button on:click={() => enviar(recommendation)} class="hover:underline focus:outline-none">{recommendation.originalQuery}</button>
            {/each}        
        </div>
    </div>
{/if}