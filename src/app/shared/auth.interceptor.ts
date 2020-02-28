import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {

  private headers = new HttpHeaders().set('Authorization', 'token');

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const reqCloned = req.clone({headers: this.headers});

    return next.handle(reqCloned);
  }
}


