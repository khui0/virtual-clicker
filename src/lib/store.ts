import { writable, type Writable } from "svelte/store";
import { browser } from "$app/environment";

interface Settings {
  code?: string;
  theme: string;
}

interface Resubmission {
  mode: "letter" | "math" | "text";
  question: string;
  response: string;
}

const initialSettings = browser && localStorage.getItem("settings");

export const title: Writable<string> = writable("");

export const settings: Writable<Settings> = writable(
  (initialSettings && JSON.parse(initialSettings)) || {
    theme: "auto",
  },
);

settings.subscribe((value) => {
  if (browser) {
    return (localStorage.settings = JSON.stringify(value));
  }
});

export const resubmission: Writable<Resubmission | null> = writable(null);
