<script lang="ts">
  import { settings } from "./store";
  import { click } from "./submit";
  import toast from "svelte-french-toast";
  import "mathlive";
  import type { MathfieldElement } from "mathlive";

  // Components
  import Modal from "./Modal.svelte";
  import LetterInput from "./LetterInput.svelte";

  // Icons
  import BiQuestion from "~icons/bi/question";
  import BiX from "~icons/bi/x";

  const descriptions: { [key: string]: string } = {
    "a": "agree, true, yes",
    "b": "disagree, false, no",
    "c": "both, always",
    "d": "neither, never",
    "e": "sometimes, cannot be determined",
  };

  // Seat code modal
  let seatCodeModal: Modal;
  let seatCodeModalValue: string;

  // Restrict seat code input to integers
  $: seatCodeModalValue,
    (() => {
      seatCodeModalValue = parseInt(seatCodeModalValue).toString() || "";
    })();

  let questionInputValue: string;
  let textareaValue: string;
  let mathfield: MathfieldElement;

  let mathfieldEnabled: boolean;
  let letter: string;

  // Validate and set seat code
  function saveSeatCode(e: Event) {
    const regex: RegExp = /^[1-9][1-6][1-5]$/;
    if (regex.test(seatCodeModalValue)) {
      settings.set({ code: seatCodeModalValue });
      toast.success(`Seat code is now ${seatCodeModalValue}`, { position: "bottom-center" });
    } else {
      e.preventDefault();
      toast.error("Seat code isn't possible", { position: "bottom-center" });
    }
  }

  // Validate and send click to forms
  function submitClick() {
    const mode: "letter" | "math" | "text" =
      letter === "" ? (mathfieldEnabled ? "math" : "text") : "letter";
    console.log(mode);
    if (!questionInputValue) {
      toast.error("Question cannot be blank", { position: "bottom-center" });
      return;
    }
    if (mode === "text" && !textareaValue) {
      toast.error("Response cannot be blank", { position: "bottom-center" });
      return;
    }
    if (mode === "math" && !mathfield.value) {
      toast.error("Equation cannot be blank", { position: "bottom-center" });
      return;
    }
    click(questionInputValue, textareaValue);
    toast.success("Response submitted!", { position: "bottom-center" });
    // Reset input fields
    questionInputValue = "";
    textareaValue = "";
    letter = "";
    mathfield.value = "";
  }
</script>

<div class="flex items-center justify-center h-full">
  <div class="flex flex-col gap-2 w-[min(100%,600px)]">
    <h2
      class="text-3xl font-bold text-neutral-content cursor-pointer w-fit"
      role="presentation"
      on:click={() => {
        seatCodeModal.show();
        seatCodeModalValue = $settings?.code || "";
      }}
    >
      {$settings?.code || "000"}
    </h2>
    <div class="flex flex-row gap-2">
      <input
        type="text"
        placeholder="Question"
        class="input input-bordered w-full"
        bind:value={questionInputValue}
      />
      <label class="flex flex-col items-center text-neutral-content text-sm">
        Equation
        <input type="checkbox" class="toggle" bind:checked={mathfieldEnabled} />
      </label>
    </div>
    <div>
      {#if letter === ""}
        {#if !mathfieldEnabled}
          <textarea
            class="block textarea textarea-bordered resize-none w-full h-28"
            placeholder="Response"
            bind:value={textareaValue}
          ></textarea>
        {:else}
          <math-field bind:this={mathfield}></math-field>
        {/if}
      {:else}
        <div class="textarea textarea-bordered rounded-btn py-4 flex flex-row items-center gap-2">
          <h3 class="w-8 h-8 border flex items-center justify-center rounded-full">
            {letter?.toUpperCase() || ""}
          </h3>
          <p>Also means: {descriptions[letter]}</p>
          <button
            class="btn btn-sm btn-circle ml-auto"
            on:click={() => {
              letter = "";
            }}><BiX></BiX></button
          >
        </div>
      {/if}
    </div>
    <LetterInput bind:value={letter}></LetterInput>
    <button class="btn rounded-full" on:click={submitClick}>Submit</button>
  </div>

  <Modal title="Seat code" bind:this={seatCodeModal}>
    <div class="flex flex-row gap-2">
      <input
        type="text"
        class="input input-bordered w-full"
        placeholder="000"
        bind:value={seatCodeModalValue}
        maxlength="3"
      />
      <a href="/" class="btn btn-square"><BiQuestion></BiQuestion></a>
    </div>
    <form method="dialog" class="flex gap-2">
      <button class="btn btn-sm flex-1">Cancel</button>
      <button class="btn btn-sm flex-1" on:click={saveSeatCode}>Save</button>
    </form>
  </Modal>
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

  :global(.toast) {
    @apply bg-base-200 text-base-content;
  }
</style>
