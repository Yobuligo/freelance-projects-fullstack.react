import { ReportRepo } from "../repository/ReportRepo";
import { TimeSheetRouteMeta } from "../shared/model/ITimeSheet";
import { createError } from "../shared/utils/createError";
import { Controller } from "./Controller";
import { SessionInterceptor } from "./core/SessionInterceptor";

export class ReportController extends Controller {
  constructor() {
    super();
    this.findTimeSheets();
  }

  private findTimeSheets() {
    this.router.get(
      `/reports${TimeSheetRouteMeta.path}`,
      SessionInterceptor(async (req, res) => {
        const reportRepo = new ReportRepo();
        const from = req.query.from?.toString();
        const to = req.query.to?.toString();
        if (!from || !to) {
          return res.status(400).send(createError("Invalid date type"));
        }
        
        const timeSheets = await reportRepo.findTimeSheets(
          req.session,
          new Date(from),
          new Date(to)
        );
        res.status(200).send(timeSheets);
      })
    );
  }
}
