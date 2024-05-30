import { renderDate } from "../../shared/utils/renderDate";

class LogDefault {
  error(text: string) {
    console.error(this.renderText(text));
  }

  info(text: string) {
    console.info(this.renderText(text));
  }

  warn(text: string) {
    console.warn(this.renderText(text));
  }

  private renderText(text: string): string {
    return `[APP ${renderDate(new Date())}]: ${text}`;
  }
}

export const Log = new LogDefault();
