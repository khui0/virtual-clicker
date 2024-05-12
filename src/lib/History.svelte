<script>
  import { liveQuery } from "dexie";
  import { db } from "./db";

  import BiCursorText from "~icons/bi/cursor-text";
  import BiPlusSlashMinus from "~icons/bi/plus-slash-minus";
  import BiListUl from "~icons/bi/list-ul";

  let history = liveQuery(() => db.history.toArray());
</script>

<div role="list" class="flex flex-col gap-2 overflow-auto flex-1 mb-2 styled-scrollbar">
  {#if $history}
    {#each [...$history].reverse() as click}
      <div class="flex flex-col border-input px-3 py-2 rounded-btn">
        <div class="flex flex-row gap-2 items-center">
          <div class="badge badge-neutral">{click.code}</div>
          <h3 class="flex-1">{click.question}</h3>
          {#if click.mode === "text"}
            <BiCursorText></BiCursorText>
          {:else if click.mode === "math"}
            <BiPlusSlashMinus></BiPlusSlashMinus>
          {:else if click.mode === "letter"}
            <BiListUl></BiListUl>
          {/if}
        </div>
        <p>
          <span class="text-neutral-content"
            >{click.date.toLocaleTimeString("en-US", {
              timeStyle: "short",
            })}</span
          >
          {click.response}
        </p>
      </div>
    {/each}
  {/if}
</div>
