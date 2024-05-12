<script lang="ts">
  import symbols from "$lib/symbols.json";

  interface Symbol {
    alias: string;
    string: string;
  }
</script>

{#each symbols as symbol}
  <li>
    <button class="inline-flex justify-between">
      <span>{symbol.string}</span>
      <span>{symbol.alias.join(", ")}</span>
    </button>
  </li>
{/each}
