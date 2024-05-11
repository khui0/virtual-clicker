<script lang="ts">
  import { onMount } from "svelte";
  import { settings } from "./store";
  import "mathlive";

  import Modal from "./Modal.svelte";

  let modal1: Modal;

  // settings.set({ code: "354" });

  let mathfieldVisible: boolean;
</script>

<div class="flex items-center justify-center h-full">
  <div class="flex flex-col gap-2 w-[min(100%,600px)]">
    <h2 class="text-3xl font-bold text-neutral-content">{$settings?.code || "000"}</h2>
    <div class="flex flex-row gap-2">
      <input type="text" placeholder="Question" class="input input-bordered w-full" />
      <label class="flex flex-col items-center text-neutral-content text-sm">
        Math
        <input type="checkbox" class="toggle" bind:checked={mathfieldVisible} />
      </label>
    </div>
    <div>
      {#if !mathfieldVisible}
        <textarea
          class="block textarea textarea-bordered resize-none w-full h-28"
          placeholder="Response"
        ></textarea>
      {:else}
        <math-field></math-field>
      {/if}
    </div>
    <div class="join w-full">
      <button class="btn btn-sm join-item flex-1">A</button>
      <button class="btn btn-sm join-item flex-1">B</button>
      <button class="btn btn-sm join-item flex-1">C</button>
      <button class="btn btn-sm join-item flex-1">D</button>
      <button class="btn btn-sm join-item flex-1">E</button>
    </div>
    <button class="btn rounded-full" on:click={()=> {
      modal1.show();
    }}>Submit</button>
  </div>

  <Modal title="testing" bind:this={modal1}>hello</Modal>
</div>

<style>
  math-field {
    @apply w-full rounded-btn bg-base-100 text-base-content px-4 py-2 border border-[var(--fallback-bc,oklch(var(--bc)/0.2))] cursor-text;
    --caret-color: theme(colors.base-content);
    --contains-highlight-background-color: theme(colors.primary);
    --text-font-family: "Figtree", sans-serif;
  }

  math-field:focus {
    @apply outline-[var(--fallback-bc,oklch(var(--bc)/0.2))] outline-offset-2 outline-2 outline-none;
  }

  math-field::part(virtual-keyboard-toggle) {
    @apply text-base-content bg-base-200 transition-colors;
  }

  math-field::part(virtual-keyboard-toggle):hover {
    @apply bg-base-100;
  }

  math-field::part(menu-toggle) {
    display: none;
  }

  math-field::part(content) {
    padding: 0;
  }
</style>
