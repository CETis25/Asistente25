<script>
	export let source;
</script>
<div class="bg-transparent w-64 inline-block">
  <img alt="foto" src={source} class="border-dgeti border-8 rounded-lg inline w-64">
  <div class="text-center bg-transparent w-64"><slot></slot></div>
</div>
