<script lang="ts">
  import data from "$lib/symbols.json";
  import { createEventDispatcher } from "svelte";

  interface Symbol {
    alias: string[];
    string: string;
  }

  const symbols: Symbol[] = data;

  const dispatch = createEventDispatcher();
</script>

{#each symbols as symbol}
  <li>
    <button
      class="inline-flex justify-between"
      on:click={() => {
        dispatch("click", {
          string: symbol.string,
        });
      }}
    >
      <span>{symbol.string}</span>
      <span>{symbol.alias.join(", ")}</span>
    </button>
  </li>
{/each}
