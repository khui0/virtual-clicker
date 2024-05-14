<script lang="ts">
  import SymbolsList from "./SymbolsList.svelte";

  import BiChevronDown from "~icons/bi/chevron-down";
</script>

<details class="dropdown dropdown-end">
  <summary class="btn btn-square focus"><BiChevronDown></BiChevronDown></summary>
  <div class="dropdown-content z-[1] shadow-lg bg-base-200 rounded-box w-52 mt-1 overflow-hidden">
    <ul class="menu max-h-80 p-2 overflow-auto flex-nowrap styled-scrollbar">
      <SymbolsList on:click></SymbolsList>
    </ul>
  </div>
</details>
