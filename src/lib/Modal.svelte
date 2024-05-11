<script lang="ts">
  let modal: HTMLDialogElement;

  export function show() {
    modal.showModal();
  }

  export let title: string;
</script>

<dialog class="modal" bind:this={modal}>
  <div class="modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 class="font-bold text-lg">{title}</h3>
    <p class="py-4"><slot></slot></p>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
