<script lang="ts">
  const letters: string[] = ["a", "b", "c", "d", "e"];

  export let value: string = "";
</script>

<div class="join w-full">
  {#each letters as letter}
    <button
      class="btn btn-sm join-item flex-1"
      on:click={() => {
        value = letter;
      }}>{letter.toUpperCase()}</button
    >
  {/each}
</div>
