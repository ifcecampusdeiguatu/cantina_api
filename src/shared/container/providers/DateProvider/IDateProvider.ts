export interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  compareInMinutes(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  compareInDays(start_date: Date, end_date: Date): number;
  addDays(start_date: Date, days: number): Date;
  addHours(hours: number): Date;
  compareIfBefore(start_date: Date, end_date: Date): boolean;
  setHours(start_date: Date, { hours = 0, minutes = 0, seconds = 0 }): Date;
}
