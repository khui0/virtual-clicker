<script lang="ts">
  import { title, settings } from "$lib/store";
  import Clicker from "$lib/Clicker.svelte";

  title.set($settings.show_code_in_title === "true" ? `${$settings.code}` : "");
</script>

<Clicker></Clicker>
