<script lang="ts">
  import { title } from "./store";
  import Logo from "./Logo.svelte";
</script>

<div class="flex flex-row items-center gap-3">
  <a href="/"><Logo></Logo></a>
  <h1 class="text-3xl font-bold">{$title || "Virtual Clicker"}</h1>
</div>
