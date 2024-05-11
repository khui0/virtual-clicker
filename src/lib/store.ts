import { writable, type Writable } from "svelte/store";
import { browser } from "$app/environment";

interface Settings {
  code?: string;
}

export const title: Writable<string> = writable("");

export const settings: Writable<Settings> = writable(
  JSON.parse((browser && localStorage.getItem("settings")) || "{}"),
);

settings.subscribe((value) => {
  if (browser) {
    return (localStorage.settings = JSON.stringify(value));
  }
});
