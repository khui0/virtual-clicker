import { settings } from "./store";
import { db } from "./db";

type Mode = "letter" | "math" | "text";

let code: string;

settings.subscribe((value) => {
  code = value.code || "";
});

const URL: string = import.meta.env.VITE_FORM_URL;
const codeField: string = import.meta.env.VITE_FORM_CODE;
const questionField: string = import.meta.env.VITE_FORM_QUESTION;
const answerField: string = import.meta.env.VITE_FORM_ANSWER;

export function click(question: string, response: string, mode: Mode) {
  if (!code) return;
  const fields = {
    [codeField]: code,
    [questionField]: question,
    [answerField]: response,
  };
  const params = new URLSearchParams(fields).toString();
  fetch(URL + params, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  storeClick(code, question, response, mode);
}

async function storeClick(code: string, question: string, response: string, mode: Mode) {
  try {
    await db.history.add({
      code,
      mode,
      question,
      response,
      date: new Date(),
    });
  } catch (error) {
    console.error(error);
  }
}
