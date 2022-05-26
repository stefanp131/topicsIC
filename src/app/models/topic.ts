import { Note } from "./note";

export interface Topic {
  id: string;
  createdBy: string;
  name: string;
  description: string;
  note: Note[];
}