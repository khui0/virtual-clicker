<script lang="ts">
  import { title } from "$lib/store";
  title.set("History");

  import HistoryList from "$lib/HistoryList.svelte";
</script>

<div class="h-full">
  <HistoryList></HistoryList>
</div>
