<script lang="ts">
  import { resetSettings, settings } from "$lib/store";
  import { title } from "$lib/store";
  title.set("Settings");
  import toast from "svelte-french-toast";

  import SettingsField from "$lib/SettingsField.svelte";
  import Confirm from "$lib/Confirm.svelte";
  import { db } from "$lib/db";

  let confirm: Confirm;

  interface Option {
    name: string;
    value: string;
  }

  const themes: Option[] = [
    { value: "auto", name: "Auto" },
    { value: "dark", name: "Dark" },
    { value: "light", name: "Light" },
  ];

  let seatCodeInputValue: string = $settings.code || "";

  // Validate and set seat code
  function validateSeatCode(e: Event) {
    const regex: RegExp = /^[1-9][1-6][1-5]$/;
    if (regex.test(seatCodeInputValue)) {
      $settings.code = seatCodeInputValue;
      toast.success(`Seat code is now ${seatCodeInputValue}`);
    } else {
      e.preventDefault();
      toast.error("Seat code isn't possible");
    }
  }
</script>

<div class="h-full flex flex-col gap-2">
  <SettingsField
    type="text"
    title="Seat code"
    maxlength={3}
    placeholder="000"
    bind:value={seatCodeInputValue}
    on:save={validateSeatCode}
    >Your 3-digit seat code. <a href="/locator" class="link">Need help?</a></SettingsField
  >
  <SettingsField type="select" title="Theme" options={themes} bind:value={$settings.theme}
    >Select a theme</SettingsField
  >
  <SettingsField
    type="checkbox"
    title="Start in equation editor"
    bind:value={$settings.equation_default}
    >Controls if equation input is enabled by default</SettingsField
  >
  <SettingsField
    type="checkbox"
    title="Show seat code in title"
    bind:value={$settings.show_code_in_title}
    >Controls whether seat code is shown in window title</SettingsField
  >
  <SettingsField
    type="button"
    title="Clear history"
    text="Clear"
    on:click={() => {
      const result = confirm.prompt(
        "Are you sure you want to clear your history?",
        "This action cannot be undone!",
        "Clear",
      );
      result.then(() => {
        db.history.clear();
        toast.success("Cleared history");
      });
    }}>Erases your click history. This action cannot be undone!</SettingsField
  >
  <SettingsField
    type="button"
    title="Reset settings"
    text="Reset"
    on:click={() => {
      const result = confirm.prompt(
        "Are you sure you want to reset all settings?",
        "This action cannot be undone!",
        "Reset",
      );
      result.then(() => {
        resetSettings();
        toast.success("Reset settings");
      });
    }}>Reverts all settings to their default values. This action cannot be undone!</SettingsField
  >
</div>

<Confirm bind:this={confirm}></Confirm>
