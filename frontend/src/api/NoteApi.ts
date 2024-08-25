import { INote, NoteRouteMeta } from "../shared/model/INote";
import { EntityRepository } from "./core/EntityRepository";

export class NoteApi extends EntityRepository<INote> {
  constructor() {
    super(NoteRouteMeta);
  }
}
