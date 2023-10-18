import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

export class DayjsProvider implements IDateProvider {
  convertToUTC(date: Date): string {
    return dayjs(date).utc(true).local().format();
  }

  compareInHours(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date);
    const start_date_utc = this.convertToUTC(start_date);

    return dayjs(end_date_utc).diff(start_date_utc, "hours");
  }

  compareInMinutes(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date);
    const start_date_utc = this.convertToUTC(start_date);

    return dayjs(end_date_utc).diff(start_date_utc, "minutes");
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(this.setHours(end_date, {}));
    const start_date_utc = this.convertToUTC(this.setHours(start_date, {}));

    const diff = dayjs(end_date_utc).diff(start_date_utc, "days");

    return diff;
  }

  setHours(start_date: Date, { hours = 0, minutes = 0, seconds = 0 }): Date {
    let date: Date;

    if (hours > 0 || minutes > 0 || seconds > 0) {
      date = this.setHours(start_date, {});
    }

    if (!date) {
      date = start_date;
    }

    return dayjs(date).hour(hours).minute(minutes).second(seconds).toDate();
  }

  addDays(start_date: Date, days: number): Date {
    const start_date_utc = this.convertToUTC(start_date);

    return dayjs(start_date_utc).add(days, "days").toDate();
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, "hours").toDate();
  }

  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }
}
