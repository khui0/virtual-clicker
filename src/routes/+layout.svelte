<script lang="ts">
  import { onMount } from "svelte";
  import { title } from "$lib/store";
  import Title from "$lib/Title.svelte";

  import { Toaster } from "svelte-french-toast";
  import History from "$lib/History.svelte";

  import BiList from "~icons/bi/list";
  import BiInputCursorText from "~icons/bi/input-cursor-text";
  import BiGear from "~icons/bi/gear";
  import BiClockHistory from "~icons/bi/clock-history";
  import { goto } from "$app/navigation";

  const version: string = import.meta.env.PACKAGE_VERSION;

  let sidebarVisible: boolean;

  onMount(() => {
    // Keybinds
    document.addEventListener("keyup", (e: KeyboardEvent) => {
      const active = document.activeElement?.tagName;
      if (e.key == "Escape" && active === "BODY") {
        sidebarVisible = !sidebarVisible;
      }
    });

    document.addEventListener("keydown", (e: KeyboardEvent) => {
      const macos = navigator.userAgent.indexOf("Mac OS X") !== -1;
      const control = macos ? e.metaKey : e.ctrlKey;

      if (control && e.key === ",") {
        e.preventDefault();
        goto("/settings");
      } else if (control && e.key === ".") {
        e.preventDefault();
        goto("/history");
      } else if (control && e.key === "Escape") {
        e.preventDefault();
        goto("/");
      }
    });
  });
</script>

<svelte:head>
  <title>Virtual Clicker {$title ? "- " + $title : ""}</title>
  <meta name="description" content="Student Response System" />
</svelte:head>

<div class="drawer lg:drawer-open min-h-full">
  <input id="sidebar" type="checkbox" class="drawer-toggle" bind:checked={sidebarVisible} />
  <div class="drawer-content flex flex-col relative">
    <div class="p-3 flex flex-row gap-4 items-center lg:hidden sticky top-0 bg-base-100 z-10">
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
  <div class="drawer-side z-20">
    <label for="sidebar" aria-label="close sidebar" class="drawer-overlay"></label>
    <div class="flex flex-col p-4 w-80 h-full bg-base-200 text-base-content">
      <div class="mb-5 mx-auto hidden lg:block">
        <Title></Title>
      </div>
      <div class="grid grid-cols-2 gap-2" role="menu">
        <a href="/" class="btn default-border shadow-none">
          <span class="text-xl"><BiInputCursorText></BiInputCursorText></span>
          <span class="font-normal">Clicker</span>
        </a>
        <a href="/history" class="btn default-border shadow-none">
          <span class="text-xl"><BiClockHistory></BiClockHistory></span>
          <span class="font-normal">History</span>
        </a>
        <a href="/settings" class="btn default-border shadow-none">
          <span class="text-xl"><BiGear></BiGear></span>
          <span class="font-normal">Settings</span>
        </a>
      </div>
      <h2 class="text-xl font-bold my-2">Recent clicks</h2>
      <History></History>
      <p class="text-neutral-content mt-auto">{version}</p>
    </div>
  </div>
</div>

<Toaster></Toaster>
