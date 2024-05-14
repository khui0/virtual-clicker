<script lang="ts">
  let modal: HTMLDialogElement;

  import BiX from "~icons/bi/x";

  export function show() {
    modal.showModal();
  }

  export let title: string;
</script>

<dialog class="modal" bind:this={modal} on:close>
  <div class="modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><BiX></BiX></button>
    </form>
    <div class="flex flex-col gap-2">
      <h3 class="font-bold text-lg">{title}</h3>
      <slot></slot>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
