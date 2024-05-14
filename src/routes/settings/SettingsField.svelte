<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import BiCheck from "~icons/bi/check";

  interface Option {
    name: string;
    value: string;
  }

  export let title: string;
  export let type: "checkbox" | "select" | "text" | "button";
  export let value: string = "";
  export let options: Option[] = [];
  export let maxlength: number | undefined = undefined;
  export let placeholder: string = "";
  export let text: string = "";

  let checkbox: HTMLInputElement;

  $: value,
    (() => {
      if (checkbox) {
        checkbox.checked = value === "true";
      }
    })();

  const dispatch = createEventDispatcher();
</script>

<div class="default-border rounded-btn p-2 bg-base-200">
  <h2 class="font-bold mx-1">{title}</h2>
  {#if type === "checkbox"}
    <label class="label cursor-pointer items-start justify-normal gap-2">
      <input
        type="checkbox"
        class="checkbox"
        bind:this={checkbox}
        on:input={() => {
          value = checkbox.checked ? "true" : "false";
        }}
      />
      <span class="label-text text-neutral-content"><slot></slot></span>
    </label>
  {:else if type === "select"}
    <label class="label cursor-pointer flex-col items-start justify-normal gap-2">
      <span class="label-text text-neutral-content"><slot></slot></span>
      <select class="select select-bordered select-sm w-full max-w-xs" bind:value>
        {#each options as option}
          <option value={option.value}>{option.name}</option>
        {/each}
      </select>
    </label>
  {:else if type === "text"}
    <label class="label cursor-pointer flex-col items-start justify-normal gap-2">
      <span class="label-text text-neutral-content"><slot></slot></span>
      <div class="flex flex-row gap-2">
        <input
          type="text"
          class="input input-bordered input-sm w-full max-w-xs"
          bind:value
          {maxlength}
          {placeholder}
        />
        <button
          class="btn btn-sm btn-square shadow-none"
          on:click={() => {
            dispatch("save", {
              value,
            });
          }}><BiCheck></BiCheck></button
        >
      </div>
    </label>
  {:else if type === "button"}
    <div class="label flex-col items-start justify-normal gap-2">
      <span class="label-text text-neutral-content"><slot></slot></span>
      <button class="btn btn-sm btn-neutral shadow-none" on:click>{text}</button>
    </div>
  {/if}
</div>
