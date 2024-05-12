<script lang="ts">
  import { settings } from "$lib/store";
  import { title } from "$lib/store";
  title.set("Settings");

  import SettingsField from "$lib/SettingsField.svelte";

  interface Option {
    name: string;
    value: string;
  }

  const themes: Option[] = [
    { value: "auto", name: "Auto" },
    { value: "dark", name: "Dark" },
    { value: "light", name: "Light" },
  ];
</script>

<div class="h-full flex flex-col gap-2">
  <SettingsField
    type="text"
    title="Seat code"
    bind:value={$settings.code}
    on:input={(e) => {
      console.log(e.detail.value);
    }}>Your 3-digit seat code</SettingsField
  >
  <SettingsField type="select" title="Theme" options={themes}>Select a theme</SettingsField>
  <SettingsField type="checkbox" title="Start in equation editor"
    >Controls if equation input is enabled by default</SettingsField
  >
  <SettingsField type="select" title="Theme" options={themes}>Select a theme</SettingsField>
  <SettingsField type="checkbox" title="Start in equation editor"
    >Controls if equation input is enabled by default</SettingsField
  >
  <SettingsField type="select" title="Theme" options={themes}>Select a theme</SettingsField>
  <SettingsField type="checkbox" title="Start in equation editor"
    >Controls if equation input is enabled by default</SettingsField
  >
</div>
