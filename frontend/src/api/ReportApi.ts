import { DateTime } from "../core/services/date/DateTime";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { ITimeSheet, TimeSheetRouteMeta } from "../shared/model/ITimeSheet";
import { Repository } from "./core/Repository";

export class ReportApi extends Repository<any> {
  constructor() {
    super({ path: "/reports" });
  }

  findTimeSheets(dateTimeSpan: IDateTimeSpan): Promise<ITimeSheet[]> {
    return this.get(`${this.url}${TimeSheetRouteMeta.path}`, {
      from: DateTime.toDate(dateTimeSpan.from),
      to: DateTime.toDate(dateTimeSpan.to),
    });
  }
}
