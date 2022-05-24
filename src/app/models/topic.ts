import { Note } from "./note";

export interface Topic {
  id: number;
  createdBy: string;
  name: string;
  description: string;
  note: Note[];
}