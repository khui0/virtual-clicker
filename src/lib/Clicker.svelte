<script lang="ts">
  import { onMount } from "svelte";
  import { settings, resubmission } from "./store";
  import { click } from "./submit";
  import toast from "svelte-french-toast";
  import "mathlive";
  import { MathfieldElement } from "mathlive";
  import { DeferredPromise } from "@open-draft/deferred-promise";

  // Components
  import Modal from "./Modal.svelte";
  import LetterInput from "./LetterInput.svelte";
  import SymbolsList from "./SymbolsList.svelte";

  // Icons
  import BiQuestionCircle from "~icons/bi/question-circle";
  import BiX from "~icons/bi/x";
  import BiCursorText from "~icons/bi/cursor-text";
  import BiPlusSlashMinus from "~icons/bi/plus-slash-minus";
  import BiChevronDown from "~icons/bi/chevron-down";

  const mathfieldReady = new DeferredPromise();

  const descriptions: { [key: string]: string } = {
    "a": "agree, true, yes",
    "b": "disagree, false, no",
    "c": "both, always",
    "d": "neither, never",
    "e": "sometimes, cannot be determined",
  };

  // Seat code modal
  let codeModal: Modal;
  let codeModalValue: string;

  // Restrict code input to integers
  $: codeModalValue,
    (() => {
      codeModalValue = (parseInt(codeModalValue) || "").toString();
    })();

  let questionInputValue: string;
  let textareaValue: string;
  let mathfield: MathfieldElement;

  let mathfieldEnabled: boolean = $settings.equation_default === "true";
  let letter: string;

  onMount(() => {
    // Remove Mathfield sounds
    MathfieldElement.soundsDirectory = null;
    // Prompt user to enter seat code
    if (!$settings.code) {
      codeModal.show();
    }
  });

  resubmission.subscribe(async (click) => {
    if (click === null) return;
    questionInputValue = click.question;
    switch (click.mode) {
      case "text": {
        mathfieldEnabled = false;
        letter = "";
        textareaValue = click.response;
        break;
      }
      case "math": {
        mathfieldEnabled = true;
        letter = "";
        await mathfieldReady;
        mathfield.value = click.response;
        break;
      }
      case "letter": {
        const match = click.response.match(/CHOICE ([A-E])/)?.[1].toLowerCase();
        if (match) letter = match;
        break;
      }
    }
    resubmission.set(null);
  });

  // Validate and set seat code
  function saveSeatCode(e: Event) {
    const regex: RegExp = /^[1-9][1-6][1-5]$/;
    if (regex.test(codeModalValue)) {
      $settings.code = codeModalValue;
      toast.success(`Seat code is now ${codeModalValue}`, { position: "bottom-center" });
    } else {
      e.preventDefault();
      toast.error("Seat code isn't possible", { position: "bottom-center" });
    }
  }

  // Validate and send click to forms
  function submitClick() {
    const mode: "letter" | "math" | "text" =
      letter === "" ? (mathfieldEnabled ? "math" : "text") : "letter";
    let response: string;
    if (!$settings?.code) {
      codeModal.show();
      return;
    }
    if (!questionInputValue) {
      toast.error("Question cannot be blank", { position: "bottom-center" });
      return;
    }
    switch (mode) {
      case "text": {
        if (!textareaValue) {
          toast.error("Response cannot be blank", { position: "bottom-center" });
          return;
        }
        response = textareaValue;
        break;
      }
      case "math": {
        if (!mathfield.value) {
          toast.error("Equation cannot be blank", { position: "bottom-center" });
          return;
        }
        response = mathfield.value;
        break;
      }
      case "letter": {
        response = "CHOICE " + letter.toUpperCase();
        break;
      }
    }
    click(questionInputValue, response, mode);
    toast.success("Response submitted!", { position: "bottom-center" });
    // Reset input fields
    questionInputValue = "";
    textareaValue = "";
    if (mathfield) mathfield.value = "";
    letter = "";
  }

  function submitKeybind(e: KeyboardEvent) {
    const macos = navigator.userAgent.indexOf("Mac OS X") !== -1;
    const control = macos ? e.metaKey : e.ctrlKey;
    if (control && e.key === "Enter") {
      e.preventDefault();
      submitClick();
    }
  }
</script>

<div class="flex items-center justify-center h-full">
  <div class="flex flex-col gap-2 w-[min(100%,600px)]">
    <h2
      class="text-3xl font-bold cursor-pointer w-fit"
      role="presentation"
      on:click={() => {
        codeModal.show();
        codeModalValue = $settings?.code || "";
      }}
    >
      {$settings?.code || "000"}
    </h2>
    <div class="flex flex-row gap-2">
      <input
        type="text"
        placeholder="Question"
        class="input input-bordered w-full bg-base-200"
        bind:value={questionInputValue}
      />
      <label class="swap swap-rotate">
        <input type="checkbox" bind:checked={mathfieldEnabled} />
        <div class="btn btn-square swap-off fill-current"><BiCursorText></BiCursorText></div>
        <div class="btn btn-square swap-on fill-current"><BiPlusSlashMinus></BiPlusSlashMinus></div>
      </label>
      <details class="dropdown dropdown-end">
        <summary class="btn btn-square"><BiChevronDown></BiChevronDown></summary>
        <ul
          class="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52 mt-2 max-h-96 overflow-auto flex-nowrap styled-scrollbar"
        >
          <SymbolsList></SymbolsList>
        </ul>
      </details>
    </div>
    <div>
      {#if letter === ""}
        {#if !mathfieldEnabled}
          <textarea
            class="block textarea textarea-bordered resize-none w-full h-28 bg-base-200"
            placeholder="Response"
            bind:value={textareaValue}
            on:keydown={submitKeybind}
          ></textarea>
        {:else}
          <math-field role="presentation" bind:this={mathfield} on:keydown={submitKeybind}
          ></math-field>
        {/if}
      {:else}
        <div
          class="textarea textarea-bordered rounded-btn py-4 flex flex-row items-center gap-2 bg-base-200"
        >
          <h3
            class="w-8 h-8 border border-neutral-content flex items-center justify-center rounded-full"
          >
            {letter?.toUpperCase() || ""}
          </h3>
          <p>Also means: {descriptions[letter]}</p>
          <button
            class="btn btn-sm btn-circle ml-auto shadow-none"
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

  <Modal title="Seat code" bind:this={codeModal}>
    <div class="flex flex-row gap-2">
      <input
        type="text"
        class="input input-bordered w-full"
        placeholder="000"
        maxlength="3"
        bind:value={codeModalValue}
      />
      <a href="/" class="btn btn-square"><BiQuestionCircle></BiQuestionCircle></a>
    </div>
    <form method="dialog" class="flex gap-2">
      <button class="btn btn-sm flex-1">Cancel</button>
      <button class="btn btn-sm flex-1" on:click={saveSeatCode}>Save</button>
    </form>
  </Modal>
</div>

<style>
  math-field {
    @apply w-full rounded-btn bg-base-200 text-base-content px-4 py-2 border border-[var(--fallback-bc,oklch(var(--bc)/0.2))] cursor-text;
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
