<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Desk from "./Desk.svelte";

  interface Seat {
    col: number;
    row: number;
  }

  const seats: Seat[] = [];

  for (let row = 1; row <= 5; row++) {
    for (let col = 6; col > 0; col--) {
      seats.push({
        col,
        row,
      });
    }
  }

  const dispatch = createEventDispatcher();
</script>

<div class="grid grid-cols-6 place-items-center w-fit min-w-fit gap-x-16 gap-y-6">
  {#each seats as seat}
    <button
      class="w-16 text-base-300 drop-shadow-sm hover:text-neutral active:scale-95 transition-all"
      on:click={() => {
        dispatch("select", {
          col: seat.col,
          row: seat.row,
        });
      }}
      on:pointerover={() => {
        dispatch("hover", {
          col: seat.col,
          row: seat.row,
        });
      }}
      on:pointerout={() => {
        dispatch("unhover");
      }}
    >
      <Desk></Desk>
    </button>
  {/each}
</div>
