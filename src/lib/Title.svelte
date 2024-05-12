<script lang="ts">
  import { page } from "$app/stores";
  import { title } from "./store";
  import Logo from "./Logo.svelte";
</script>

<div class="flex flex-row items-center gap-3">
  <a href="/" class="active:scale-95 transition-transform"><Logo></Logo></a>
  {#if $page.url.pathname === "/" || !$title}
    <h1 class="text-3xl font-bold">Virtual Clicker</h1>
  {:else}
    <h1 class="text-3xl font-bold">{$title}</h1>
  {/if}
</div>
