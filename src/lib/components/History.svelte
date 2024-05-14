<script lang="ts">
  import { liveQuery } from "dexie";
  import { db } from "$lib/db";
  import type { Click } from "$lib/db";
  import { resubmission } from "$lib/store";
  import * as mathlive from "mathlive";
  import { createEventDispatcher } from "svelte";
  import { goto } from "$app/navigation";

  import BiCursorText from "~icons/bi/cursor-text";
  import BiPlusSlashMinus from "~icons/bi/plus-slash-minus";
  import BiListUl from "~icons/bi/list-ul";
  import BiArrowReturnLeft from "~icons/bi/arrow-return-left";

  const dispatch = createEventDispatcher();

  let list: HTMLDivElement;

  let history = liveQuery(() => db.history.toArray());

  function resubmit(click: Click) {
    resubmission.set({
      mode: click.mode,
      question: click.question,
      response: click.response,
    });
    goto("/");
  }

  history.subscribe(() => {
    mathlive.renderMathInElement(list);
  });
</script>

<div
  role="list"
  class="flex flex-col gap-2 overflow-auto flex-1 mb-2 styled-scrollbar"
  bind:this={list}
>
  {#if $history && $history.length > 0}
    {#each [...$history].reverse() as click}
      <div
        class="flex flex-row gap-2 items-center default-border px-3 py-2 rounded-btn relative group bg-base-200"
      >
        <div class="flex flex-col gap-2 items-center w-11">
          <div class="badge badge-neutral">{click.code}</div>
          <span class="text-neutral-content text-xs text-nowrap"
            >{click.date.toLocaleTimeString("en-US", {
              timeStyle: "short",
            })}
          </span>
        </div>
        <div class="flex flex-col flex-1 overflow-hidden">
          <div class="flex flex-row gap-2 items-center min-w-0">
            <h3 class="flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
              {click.question}
            </h3>
            {#if click.mode === "text"}
              <BiCursorText></BiCursorText>
            {:else if click.mode === "math"}
              <BiPlusSlashMinus></BiPlusSlashMinus>
            {:else if click.mode === "letter"}
              <BiListUl></BiListUl>
            {/if}
          </div>
          <p class="text-neutral-content overflow-hidden whitespace-nowrap text-ellipsis">
            {#if click.mode === "math"}
              {@html mathlive.convertLatexToMarkup(click.response)}
            {:else if click.mode === "letter"}
              <h3
                class="w-8 h-8 border border-neutral-content flex items-center justify-center rounded-full"
              >
                {(click.response && click.response.match(/CHOICE ([A-E])/)?.[1]) || ""}
              </h3>
            {:else}
              {click.response}
            {/if}
          </p>
        </div>
        <button
          class="absolute right-0 m-2 btn btn-neutral btn-square opacity-0 group-hover:opacity-100 transition-opacity"
          on:click={() => {
            resubmit(click);
            dispatch("resubmit");
          }}
        >
          <BiArrowReturnLeft></BiArrowReturnLeft>
        </button>
      </div>
    {/each}
  {:else}
    <div
      class="flex flex-row gap-2 items-center default-border px-3 py-2 rounded-btn relative group bg-base-200"
    >
      <h3>Submitted clicks will appear here</h3>
    </div>
  {/if}
</div>
