<script>
	import Asistente from './AI.svelte';
	import Tailwind from './Tailwind.svelte';
	import FOOTER from './FOOTER.svelte';
	import CREDITS from './CREDITS.svelte';
	import LOGO from './LOGO.svelte';
	import LOADING from './LOADING.svelte';
	import { fade, fly } from 'svelte/transition';
	import { databaseLoad, makeMessage, isStudent, databaseQueries } from './logic.js';
	let logo = './icon.png';
	let visible = false;
	let opt = 0;
	let typing = false;
	let sel = ["Descargar", "Modo de demostración", "Sobre el proyecto"];
	let saludos = [{reply:'¡Bienvenido al Asistente de CETis25! Prueba a saludarle.'}, {reply:'Buenos días. Esta es la sala de chat del Asistente de CETis25. Intenta llamar su atención con alguna pregunta interesante.'}];
	setTimeout(function(){
		visible = true;
	}, 1000);


	let messages = [
        makeMessage(saludos[Math.floor(Math.random()*saludos.length)], 'David', './img/david.jpg'),
		makeMessage({ reply: 'Hola, alumno/a.' })
    ];

	async function sendQuery (q) {
        messages = [... messages, makeMessage({reply: q.originalQuery}, 'Tú', './img/DGETI_logo.svg')];
        typing = 'Asistente';
        setTimeout(async () => {
            messages = [... messages, makeMessage(q)];
            typing = false;
        }, 1000);
    }
</script>

<style>
	main {
		min-height: 80vh
	}
</style>

<Tailwind />
{#await databaseLoad()}
	<div class="w-full h-screen bg-black justify-center place-items-center flex flex-col" out:fade>
		<LOGO bind:logo />
		<LOADING />
	</div>
{:then data}
	{#if visible}
	<nav in:fly="{{ y: -9000, duration: 1000 }}" class="cursor-default z-50 w-full shadow-2xl flex sticky top-0 place-content-center py-3 px-8 bg-black flex-row text-white">
		<div class="font-oswald text-lg xl:text-xl inline outline-none">
			<button class="focus:outline-none" on:click={() => opt = null}>
				<img src={logo} alt="logo" class="h-10 flex-auto inline self-center">
				<p class="lg:pl-5 sm:pl-2 inline self-center">
					Asistente 25
				</p>
			</button>
		</div>
		<div class="font-roboto flex-grow flex-shrink text-right xl:text-xl mr-8 h-full">
			<ul class="pt-1.5 space-x-8 h-full">
				{#each sel as selection, i}
					{#if !isStudent || (sel !== 2 && sel !== 3)}
						<li class="inline h-full">
							<button
								class="h-full
									focus:outline-none
									font-bold
									border-black
									border-2
									hover:text-dgeti
									rounded"
								on:click={() => opt = i}>
								{selection}
							</button>
						</li>
					{/if}
				{/each}
			</ul>
		</div>
	</nav>
	<main class="flex flex-wrap gap-2 p-8 justify-center place-items-center h-full {opt === 0 ? 'bg-black' : ''}" in:fade="{{ duration: 1000 }}">
		{#if opt === 0}
			<div class="flex flex-col place-items-center flex-wrap gap-6">
				<div class="flex-grow text-4xl text-white font-oswald rounded-lg flex place-items-center">Disponible en</div>
				<div class="flex flex-row flex-wrap gap-6">
					<div class="flex-grow text-4xl text-white font-oswald rounded-lg flex place-items-center">
						<p class="mr-2">Windows</p>
						<a href="https://asistente25.herokuapp.com/api/download/win32"><button
							class="focus:outline-none hover:bg-blue-500 bg-dgeti p-2 rounded-lg"
						>
							Descargar
						</button></a>
					</div>
				</div>
			</div>
		{:else if opt === 1}
			<Asistente bind:messages bind:typing />
			
			<div class="bg-gray-800 text-white rounded-lg font-oswald h-full p-2 flex-shrink" in:fly="{{ y: 100, duration: 1000}}">
				<h3 class="text-4xl text-center">
					Preguntas disponibles
				</h3>
				{#await databaseQueries()}
					<LOADING />
				{:then data}
					<ul class="text-2xl">
						{#each data as question}
							<li>
								<button on:click={() => sendQuery(question)} class="hover:underline focus:outline-none">{question.originalQuery}</button>
							</li>
						{/each}
					</ul>
					<h3 class="text-4xl text-center mt-2">
						¡Tus profesores le enseñarán más cosas al asistente!
					</h3>
				{/await}
			</div>
		{:else if opt === 2}
			<CREDITS />
		{:else}
			<LOGO bind:logo />
		{/if}
	</main>
	<FOOTER/>
	{:else}
	<div class="w-full h-screen bg-black justify-center place-items-center flex flex-col" out:fade>
		<LOGO bind:logo />
		<LOADING />
	</div>
	{/if}
{/await}
