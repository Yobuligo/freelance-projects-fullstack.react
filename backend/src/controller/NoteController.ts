import { NoteRepo } from "../repository/NoteRepo";
import { INote, NoteRouteMeta } from "../shared/model/INote";
import { EntityController } from "./core/EntityController";

export class NoteController extends EntityController<INote, NoteRepo> {
  constructor() {
    super(NoteRouteMeta, new NoteRepo());
  }
}
