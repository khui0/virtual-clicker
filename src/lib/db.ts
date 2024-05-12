import Dexie, { type Table } from "dexie";

export interface Click {
  code: string;
  mode: "letter" | "math" | "text";
  question: string;
  response: string;
  date: Date;
}

export class Database extends Dexie {
  history!: Table<Click>;

  constructor() {
    super("database");
    this.version(1).stores({
      history: "++, code, mode, question, response, date",
    });
  }
}

export const db = new Database();
