import { Bill } from './billEntity';

export type User = {
  Id: string;
  Auth0Id: string;
  Salary: number;
  Bills: Bill[];
};
