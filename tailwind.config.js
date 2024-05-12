import daisyui from "daisyui";
import Typography from "@tailwindcss/typography";
import Scrollbar from "tailwind-scrollbar";

/** @type {import("tailwindcss").Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  plugins: [
    daisyui,
    Typography(),
    Scrollbar({
      nocompatible: true,
      preferredStrategy: "pseudoelements",
    }),
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  daisyui: {
    themes: [
      {
        dark: {
          primary: "#479df8",
          "primary-content": "#ffffff",
          secondary: "#479df8",
          "secondary-content": "#ffffff",
          accent: "#479df8",
          neutral: "#3f3f3f",
          "neutral-content": "#cfcfcf",
          "base-100": "#181818",
          "base-200": "#222222",
          "base-300": "#313131",
          "base-content": "#ffffff",

          "--rounded-box": "0.75rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        },
        light: {
          primary: "#479df8",
          "primary-content": "#2c2c2c",
          secondary: "#479df8",
          "secondary-content": "#2c2c2c",
          accent: "#479df8",
          neutral: "#dcdcdc",
          "neutral-content": "#525252",
          "base-100": "#eeeeee",
          "base-200": "#fafafa",
          "base-300": "#d4d4d4",
          "base-content": "#2c2c2c",

          "--rounded-box": "0.75rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        },
      },
    ],
  },
};
