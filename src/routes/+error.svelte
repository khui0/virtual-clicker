<script lang="ts">
  import { page } from "$app/stores";
  import { title } from "$lib/store";
  import BiExclamationOctagon from "~icons/bi/exclamation-octagon";

  title.set($page.status.toString());
</script>

<div class="flex flex-col items-center justify-center gap-2 h-full">
  <span class="text-5xl mb-2"><BiExclamationOctagon></BiExclamationOctagon></span>
  <h2 class="text-4xl">{$page.status}</h2>
  <p class="text-neutral-content">{$page.error?.message}</p>
</div>
