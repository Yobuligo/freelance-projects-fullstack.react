import { Op } from "sequelize";
import { DateTime } from "../core/date/DateTime";
import { Duration } from "../core/date/Duration";
import { Project } from "../model/sequelize/Project";
import { Task } from "../model/sequelize/Task";
import { ISession } from "../shared/model/ISession";
import { ITimeSheet } from "../shared/model/ITimeSheet";
import { TaskInfo } from "../shared/services/TaskInfo";

export class ReportRepo {
  async findTimeSheets(
    session: ISession,
    from: Date,
    to: Date
  ): Promise<ITimeSheet[]> {
    const fromDate = this.getFromStart(from);
    const toDate = this.getToEnd(to);

    const timeSheets: ITimeSheet[] = [];
    const projects = await Project.findAll({
      where: { userId: session.userId },
      include: [
        {
          model: Task,
          where: {
            startedAt: { [Op.gte]: fromDate },
            stoppedAt: { [Op.lte]: toDate },
          },
        },
      ],
    });

    projects.forEach((model) => {
      const project = model.toJSON();
      let duration: Duration = new Duration(0);
      project.tasks.forEach((task) => {
        const taskDuration = TaskInfo.toDuration(task);
        duration = Duration.sum(duration, taskDuration);
      });

      // create copy of project to not transfer the tasks again
      const timeSheet: ITimeSheet = {
        durationInMilliseconds: duration.totalMilliseconds,
        project: {
          id: project.id,
          tasks: [],
          title: project.title,
          userId: project.userId,
          createdAt: project.createdAt,
          updatedAt: project.updatedAt,
        },
        from: fromDate as unknown as Date,
        to: toDate as unknown as Date,
      };
      timeSheets.push(timeSheet);
    });
    return timeSheets;
  }

  private getFromStart(date: Date): string {
    return `${DateTime.toDate(date)}T00:00:00.000`;
  }

  private getToEnd(date: Date): string {
    return `${DateTime.toDate(date)}T23:59:59.999`;
  }
}
