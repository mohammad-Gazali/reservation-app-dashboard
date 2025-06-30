import { HttpInterceptorFn } from "@angular/common/http";
import { authTokenInterceptor } from "./auth-token.interceptor";
import { errorHandlerInterceptor } from "./error-handler.interceptor";

export const interceptors: HttpInterceptorFn[] = [
  authTokenInterceptor,
  errorHandlerInterceptor, 
]