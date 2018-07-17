import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import 'rxjs/add/operator/catch';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).catch(error => {
            if (error instanceof HttpErrorResponse) {
                  const applicationError = error.headers.get('Applicaiton-Error');
                  if (applicationError) {
                    return Observable.throw(applicationError);
                  }
                  const serverError = error.error;
                  let modelStateErrors = '';
                  if (serverError && typeof serverError === 'object') {
                    for (const key in serverError) {
                      if (serverError[key]) {
                        modelStateErrors += serverError[key] + '\n';
                      }
                    }
                  }
                  return Observable.throw(modelStateErrors || serverError || 'Server error');
            }
        });
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
