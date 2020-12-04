
import { Http } from '@status/codes';

export default class BaseError extends Error {
  public code: number;
  public status: number;
  public error: any;

  constructor(
    message: string,
    status: Http = Http.InternalServerError,
    error ?: any
  ) {
    super();
    this.message = message;
    this.status = status;
    this.error = error;
    Error.captureStackTrace(this, BaseError);
  }
}
