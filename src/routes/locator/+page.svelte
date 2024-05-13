<script lang="ts">
  import { settings, title } from "$lib/store";
  import toast from "svelte-french-toast";
  title.set("Locator");

  import DeskGrid from "$lib/DeskGrid.svelte";

  let inactivityTimeout: number;

  let period: number = 1;

  let col: number | null = null;
  let row: number | null = null;

  // Validate and set seat code
  function setSeatCode(code: string) {
    const regex: RegExp = /^[1-9][1-6][1-5]$/;
    if (regex.test(code)) {
      $settings.code = code;
      toast.success(`Seat code is now ${code}`, { position: "bottom-center" });
    } else {
      toast.error("Seat code isn't possible", { position: "bottom-center" });
    }
  }
</script>

<div class="h-full flex flex-col items-center justify-center gap-4">
  <h2 class="text-2xl">
    Period: {period}
  </h2>
  <input type="range" min="1" max="9" class="range max-w-64 mb-3" bind:value={period} />
  <h2 class="text-2xl font-bold mb-3">
    Your seat code is: {period}{col || "?"}{row || "?"}
  </h2>
  <DeskGrid
    on:hover={(e) => {
      col = e.detail.col;
      row = e.detail.row;

      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => {
        col = null;
        row = null;
      }, 5000);
    }}
    on:select={(e) => {
      setSeatCode(`${period}${e.detail.col}${e.detail.row}`);
    }}
  ></DeskGrid>
</div>
