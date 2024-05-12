<script lang="ts">
  import { liveQuery } from "dexie";
  import { db } from "./db";
  import type { Click } from "./db";
  import { resubmission } from "./store";

  import BiCursorText from "~icons/bi/cursor-text";
  import BiPlusSlashMinus from "~icons/bi/plus-slash-minus";
  import BiListUl from "~icons/bi/list-ul";
  import BiArrowReturnLeft from "~icons/bi/arrow-return-left";
  import { goto } from "$app/navigation";

  let history = liveQuery(() => db.history.toArray());

  function resubmit(click: Click) {
    resubmission.set({
      mode: click.mode,
      question: click.question,
      response: click.response,
    });
    goto("/");
  }
</script>

<div role="list" class="flex flex-col gap-2 overflow-auto flex-1 mb-2 styled-scrollbar">
  {#if $history}
    {#each [...$history].reverse() as click}
      <div
        class="flex flex-row gap-2 items-center default-border px-3 py-2 rounded-btn relative group"
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
            {click.response || "ERROR"}
          </p>
        </div>
        <button
          class="absolute right-0 m-2 btn btn-neutral btn-square opacity-0 group-hover:opacity-100 transition-opacity"
          on:click={() => {
            resubmit(click);
          }}
        >
          <BiArrowReturnLeft></BiArrowReturnLeft>
        </button>
      </div>
    {/each}
  {/if}
</div>
