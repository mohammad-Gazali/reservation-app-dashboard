import { HttpInterceptorFn } from "@angular/common/http";
import { authTokenInterceptor } from "./auth-token.interceptor";
import { errorHandlerInterceptor } from "./error-handler.interceptor";
import { requestUrlInterceptor } from "./request-url.interceptor";

export const interceptors: HttpInterceptorFn[] = [
  requestUrlInterceptor,
  authTokenInterceptor,
  errorHandlerInterceptor, 
]