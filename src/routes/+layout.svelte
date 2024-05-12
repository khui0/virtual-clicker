<script lang="ts">
  import { onMount } from "svelte";
  import { title } from "$lib/store";
  import Title from "$lib/Title.svelte";

  import { Toaster } from "svelte-french-toast";
  import RecentClicks from "$lib/RecentClicks.svelte";

  import BiList from "~icons/bi/list";
  import BiInputCursorText from "~icons/bi/input-cursor-text";
  import BiGear from "~icons/bi/gear";
  import BiClockHistory from "~icons/bi/clock-history";

  const version: string = import.meta.env.PACKAGE_VERSION;

  let sidebarVisible: boolean;

  onMount(() => {
    document.addEventListener("keyup", (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        sidebarVisible = !sidebarVisible;
      }
    });
  });
</script>

<svelte:head>
  <title>Virtual Clicker {$title ? "- " + $title : ""}</title>
</svelte:head>

<div class="drawer lg:drawer-open min-h-full">
  <input id="sidebar" type="checkbox" class="drawer-toggle" bind:checked={sidebarVisible} />
  <div class="drawer-content flex flex-col relative">
    <div class="m-3 flex flex-row gap-4 items-center lg:hidden">
      <button
        class="btn btn-square"
        on:click={() => {
          sidebarVisible = true;
        }}><BiList></BiList></button
      >
      <Title></Title>
    </div>
    <div class="p-5 pt-0 lg:pt-5 h-full"><slot></slot></div>
  </div>
  <div class="drawer-side">
    <label for="sidebar" aria-label="close sidebar" class="drawer-overlay"></label>
    <div class="flex flex-col p-4 w-80 h-full bg-base-200 text-base-content">
      <div class="mb-5 mx-auto hidden lg:block">
        <Title></Title>
      </div>
      <ul class="menu p-0 rounded-btn border-input">
        <li><a href="/"><BiInputCursorText></BiInputCursorText> Clicker</a></li>
        <li><a href="/history"><BiClockHistory></BiClockHistory> History</a></li>
        <li><a href="/settings"><BiGear></BiGear> Settings</a></li>
      </ul>
      <h2 class="text-xl font-bold my-2">Recent clicks</h2>
      <RecentClicks></RecentClicks>
      <p class="text-neutral-content mt-auto">{version}</p>
    </div>
  </div>
</div>

<Toaster></Toaster>
