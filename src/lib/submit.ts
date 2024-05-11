import { settings } from "./store";

let code: string;

settings.subscribe((value) => {
  code = value.code || "";
});

const URL: string = import.meta.env.FORM_URL;
const codeField: string = import.meta.env.FORM_CODE;
const questionField: string = import.meta.env.FORM_QUESTION;
const answerField: string = import.meta.env.FORM_ANSWER;

export function click(question: string, response: string) {
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
}
