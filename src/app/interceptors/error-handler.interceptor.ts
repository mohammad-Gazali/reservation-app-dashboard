import { HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(err => {
      return throwError(() => err);
    }),
  )
}