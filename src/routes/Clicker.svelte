<script lang="ts">
  import { onMount } from "svelte";
  import { settings, resubmission, type Resubmission } from "$lib/store";
  import { click } from "./submit";
  import toast from "svelte-french-toast";
  import "mathlive";

  // Components
  import Modal from "$lib/components/Modal.svelte";
  import LetterInput from "./LetterInput.svelte";
  import SymbolsList from "./SymbolsList.svelte";
  import Mathfield from "./Mathfield.svelte";

  // Icons
  import BiQuestionCircle from "~icons/bi/question-circle";
  import BiX from "~icons/bi/x";
  import BiCursorText from "~icons/bi/cursor-text";
  import BiPlusSlashMinus from "~icons/bi/plus-slash-minus";
  import BiChevronDown from "~icons/bi/chevron-down";

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
  let mathfieldValue: string;
  // Used to get and set the cursor selection
  let textarea: HTMLTextAreaElement;

  let mathfieldEnabled: boolean = $settings.equation_default === "true";
  let letter: string;

  onMount(() => {
    // Prompt user to enter seat code
    if (!$settings.code) {
      codeModal.show();
    }
  });

  $: $resubmission, resubmit($resubmission);

  // Set clicker state to resubmission
  function resubmit(data: Resubmission | null) {
    if (data === null) return;
    questionInputValue = data.question;
    switch (data.mode) {
      case "text": {
        mathfieldEnabled = false;
        letter = "";
        textareaValue = data.response;
        break;
      }
      case "math": {
        mathfieldEnabled = true;
        letter = "";
        mathfieldValue = data.response;
        break;
      }
      case "letter": {
        const match = data.response.match(/CHOICE ([A-E])/)?.[1].toLowerCase();
        if (match) letter = match;
        break;
      }
    }
    resubmission.set(null);
  }

  // Validate and set seat code
  function saveSeatCode(e: Event) {
    const regex: RegExp = /^[1-9][1-6][1-5]$/;
    if (regex.test(codeModalValue)) {
      $settings.code = codeModalValue;
      toast.success(`Seat code is now ${codeModalValue}`);
    } else {
      e.preventDefault();
      toast.error("Seat code isn't possible");
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
      toast.error("Question cannot be blank");
      return;
    }
    switch (mode) {
      case "text": {
        if (!textareaValue) {
          toast.error("Response cannot be blank");
          return;
        }
        response = textareaValue;
        break;
      }
      case "math": {
        if (!mathfieldValue) {
          toast.error("Equation cannot be blank");
          return;
        }
        response = mathfieldValue;
        break;
      }
      case "letter": {
        response = "CHOICE " + letter.toUpperCase();
        break;
      }
    }
    click(questionInputValue, response, mode);
    toast.success("Response submitted!");
    // Reset input fields
    questionInputValue = "";
    textareaValue = "";
    mathfieldValue = "";
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
        class="input input-bordered w-full bg-base-200 shadow-sm"
        bind:value={questionInputValue}
      />
      <label class="swap swap-rotate btn btn-square">
        <input type="checkbox" class="outline-none" bind:checked={mathfieldEnabled} />
        <div class="swap-off fill-current"><BiCursorText></BiCursorText></div>
        <div class="swap-on fill-current"><BiPlusSlashMinus></BiPlusSlashMinus></div>
      </label>
      <details class="dropdown dropdown-end">
        <summary class="btn btn-square focus"><BiChevronDown></BiChevronDown></summary>
        <div
          class="dropdown-content z-[1] shadow-lg bg-base-200 rounded-box w-52 mt-1 overflow-hidden"
        >
          <ul class="menu max-h-80 p-2 overflow-auto flex-nowrap styled-scrollbar">
            <SymbolsList
              on:click={(e) => {
                if (mathfieldEnabled) return;
                textarea.setRangeText(
                  e.detail.string,
                  textarea.selectionStart,
                  textarea.selectionEnd,
                  "end",
                );
                textarea.focus();
              }}
            ></SymbolsList>
          </ul>
        </div>
      </details>
    </div>
    <div>
      {#if letter === ""}
        {#if !mathfieldEnabled}
          <textarea
            class="block textarea textarea-bordered resize-none w-full h-28 bg-base-200 shadow-sm"
            placeholder="Response"
            bind:this={textarea}
            bind:value={textareaValue}
            on:keydown={submitKeybind}
          ></textarea>
        {:else}
          <Mathfield bind:value={mathfieldValue} on:keydown={submitKeybind}></Mathfield>
        {/if}
      {:else}
        <div
          class="textarea textarea-bordered rounded-btn py-4 flex flex-row items-center gap-2 bg-base-200 shadow-sm"
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
      <a href="/locator" class="btn btn-square"><BiQuestionCircle></BiQuestionCircle></a>
    </div>
    <form method="dialog" class="flex gap-2">
      <button class="btn btn-sm flex-1">Cancel</button>
      <button class="btn btn-sm flex-1" on:click={saveSeatCode}>Save</button>
    </form>
  </Modal>
</div>
