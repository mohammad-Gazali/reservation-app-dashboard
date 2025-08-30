import { HttpInterceptorFn } from '@angular/common/http';

const BASE_URL = 'http://localhost:8000';

export const requestUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const url = req.url.startsWith('http')
    ? req.url
    : `${BASE_URL}${req.url}`;

  return next(
    req.clone({
      url,
    })
  );
};
