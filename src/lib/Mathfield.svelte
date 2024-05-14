<script lang="ts">
  import { onMount } from "svelte";
  import { DeferredPromise } from "@open-draft/deferred-promise";
  import { MathfieldElement } from "mathlive";

  const ready = new DeferredPromise();
  let mathfield: MathfieldElement;

  export let value: string;

  $: value,
    (async () => {
      await ready;
      mathfield.value = value;
    })();

  onMount(() => {
    // Remove Mathfield sounds
    MathfieldElement.soundsDirectory = null;
  });
</script>

<math-field
  role="presentation"
  bind:this={mathfield}
  on:keydown
  on:mount={() => {
    ready.resolve("");
  }}
  on:input={() => {
    value = mathfield.value;
  }}
></math-field>

<style>
  math-field {
    @apply w-full rounded-btn bg-base-200 text-base-content px-4 py-2 border border-[var(--fallback-bc,oklch(var(--bc)/0.2))] cursor-text shadow-sm;
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
