import { writable, type Writable } from "svelte/store";
import { browser } from "$app/environment";

interface Settings {
  [key: string]: string;
}

export interface Resubmission {
  mode: "letter" | "math" | "text";
  question: string;
  response: string;
}

const storedSettings = browser && localStorage.getItem("settings");

const defaultSettings: Settings = {
  theme: "auto",
  show_code_in_title: "true",
};

export const title: Writable<string> = writable("");

// Initialize store with default settings
export const settings: Writable<Settings> = writable(
  (storedSettings && JSON.parse(storedSettings)) || defaultSettings,
);

export function resetSettings() {
  settings.set(defaultSettings);
}

settings.subscribe((value) => {
  if (browser) {
    return (localStorage.settings = JSON.stringify(value));
  }
});

export const resubmission: Writable<Resubmission | null> = writable(null);
