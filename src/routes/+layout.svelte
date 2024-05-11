<script lang="ts">
  import { title } from "$lib/store";
  import Title from "$lib/Title.svelte";
  import { onMount } from "svelte";

  import BiList from "~icons/bi/list";

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
  {#if $title}
    <title>Virtual Clicker - {$title}</title>
  {:else}
    <title>Virtual Clicker</title>
  {/if}
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
    <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      <div class="mb-5 mx-auto hidden lg:block">
        <Title></Title>
      </div>
      <li><a href="/">Clicker</a></li>
      <li><a href="/history">History</a></li>
      <li><a href="/settings">Settings</a></li>
      <p class="text-neutral-content mt-auto">{version}</p>
    </ul>
  </div>
</div>
