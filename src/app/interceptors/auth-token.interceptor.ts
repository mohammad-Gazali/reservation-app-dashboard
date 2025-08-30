import { HttpHeaders, HttpInterceptorFn } from "@angular/common/http";
import { AUTH_TOKEN_KEY } from "@shared/constants";

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  const request = token ? req.clone({
    headers: new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })
  }) : req;

  return next(request);
}