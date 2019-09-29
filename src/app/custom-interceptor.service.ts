import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class CustomInterceptorService implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler){
  const authReq = req.clone({headers: req.headers.set('Access-Control-Allow-Origin', '*')});
    return next.handle(authReq);
  }
}
