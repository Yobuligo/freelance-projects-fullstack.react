import { Note } from "../model/sequelize/Note";
import { INote } from "../shared/model/INote";
import { Repository } from "./core/Repository";

export class NoteRepo extends Repository<INote> {
  constructor() {
    super(Note);
  }
}
