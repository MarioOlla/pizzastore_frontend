import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('login')) {
      console.log('Auth token'+this.authService.getUserToken());
      request = request.clone(
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${this.authService.getUserToken()}`}
          )
        }
      )
    }
    return next.handle(request);
  }
}
