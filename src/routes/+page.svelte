<script lang="ts">
  import { title } from "$lib/store";
  import Clicker from "$lib/Clicker.svelte";

  title.set("");
</script>

<svelte:head>
  <title>Virtual Clicker</title>
  <meta name="description" content="Student Response System" />
</svelte:head>

<Clicker></Clicker>
