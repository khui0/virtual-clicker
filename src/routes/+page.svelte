<script lang="ts">
  import { settings } from "$lib/store";
  import Clicker from "$lib/Clicker.svelte";

  settings.subscribe(() => {
    if ($settings.code) {
      document.title =
        $settings.show_code_in_title === "true"
          ? `Virtual Clicker - ${$settings.code}`
          : "Virtual Clicker";
    }
  });
</script>

<Clicker></Clicker>
