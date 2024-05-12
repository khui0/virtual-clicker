<script>
  import { liveQuery } from "dexie";
  import { db } from "./db";

  let history = liveQuery(() => db.history.toArray());
</script>

<div role="list" class="flex flex-col gap-2 overflow-auto flex-1">
  {#if $history}
    {#each [...$history].reverse() as click}
      <div class="flex flex-col border-input px-3 py-2 rounded-btn">
        <div class="flex flex-row gap-2">
          <div class="badge badge-neutral">{click.code}</div>
          <h3>{click.question}</h3>
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
