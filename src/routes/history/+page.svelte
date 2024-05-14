<script lang="ts">
  import { title } from "$lib/store";
  title.set("History");

  import History from "$lib/components/History.svelte";
</script>

<div class="h-full">
  <History></History>
</div>
