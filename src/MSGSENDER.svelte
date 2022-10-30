<script>
    export let messages = [];
    export let typing = false;
    let thisMSG = '';
    import 'boxicons';
    import { ayuda, makeMessage } from './logic.js';

    async function enviar (e) {
        if (e.keyCode !== 13 && e !== 'botón' || thisMSG.length < 1) return;
        let processingMSG = thisMSG;
        thisMSG = '';
        messages = [... messages, makeMessage({reply: processingMSG}, 'Tú', './img/DGETI_logo.svg')];
        typing = 'Asistente';
        let reply = await ayuda(processingMSG.toLowerCase());
        setTimeout(async () => {
            messages = [... messages, makeMessage(reply)];
            typing = false;
        }, 1000);
    }
</script>

<div class="flex flex-row my-2">
    <input
        class="outline-none mr-2 inline text-xl float-left px-2 flex-grow flex-col bg-gray-900 text-white overflow-y-auto w-full rounded-full"
        bind:value={thisMSG}
        type="text"
        placeholder="Escribe un mensaje"
        on:keyup={enviar}
    >
    <button
        class="bg-dgeti grid place-items-center float-right inline w-12 h-12 rounded-full focus:outline-none"
        on:click={() => enviar('botón')}
    >
        <box-icon color="white" name="send"></box-icon>
    </button>
</div>
