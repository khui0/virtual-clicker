import { writable, type Writable } from "svelte/store";

export const title: Writable<string> = writable("");
