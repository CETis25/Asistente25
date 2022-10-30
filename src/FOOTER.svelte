<script>
  import { fly } from 'svelte/transition';
  let copyright = new Date().getFullYear();
</script>
<style>
    .footer {
        min-height: 15vh
    }
</style>
<div in:fly="{{ y: 200, duration: 1000 }}" class="bg-black pt-12 footer w-full text-xl text-white text-center">
  © {copyright} CETis No. 25, Tecate, Baja California, México.
</div>
