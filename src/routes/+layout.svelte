<script lang="ts">
  import Wordmark from "$lib/Wordmark.svelte";

  import BiList from "~icons/bi/list";

  const version: string = import.meta.env.PACKAGE_VERSION;

  let sidebarVisible: boolean;
</script>

<div class="drawer lg:drawer-open min-h-full">
  <input id="sidebar" type="checkbox" class="drawer-toggle" bind:checked={sidebarVisible} />
  <div class="drawer-content flex flex-col items-center justify-center relative">
    <div class="absolute top-0 left-0 m-3 flex flex-row gap-4 items-center lg:hidden">
      <button
        class="btn btn-square"
        on:click={() => {
          sidebarVisible = true;
        }}><BiList></BiList></button
      >
      <Wordmark></Wordmark>
    </div>
    <slot></slot>
  </div>
  <div class="drawer-side">
    <label for="sidebar" aria-label="close sidebar" class="drawer-overlay"></label>
    <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      <div class="mb-5 mx-auto hidden lg:block">
        <Wordmark></Wordmark>
      </div>
      <li><a href="/">Clicker</a></li>
      <li><a href="/">History</a></li>
      <li><a href="/">Settings</a></li>
      <p class="text-neutral-content mt-auto">{version}</p>
    </ul>
  </div>
</div>
