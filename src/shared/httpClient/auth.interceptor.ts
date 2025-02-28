import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, from, throwError } from 'rxjs';
import { ERROR_PERMISSION, UNEXPECTED_ERROR } from '../define/constant';
import { environment } from '../../environments/environment';


export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //const url = 'http://127.0.0.1:8000/api';
    const url = environment.apiUrl;
    console.log('APIUrl', url);

    let sessionToken = localStorage.getItem('sessionToken');
    //console.log('sessionToken', sessionToken);

    if (sessionToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });
    }

    request = request.clone({
      url: url + request.url,
    });

    let result = next.handle(request);

    return result.pipe(
      catchError((err: HttpErrorResponse) => {
        from(this._handleError(request, next, err));
        const error = err?.error ? err.error : err;
        return throwError(error);
      })
    );
  }

  protected async _handleError(
    request: HttpRequest<unknown>,
    next: HttpHandler,
    err: HttpErrorResponse
  ) {
    let e = err ? err?.error : err;

    if (err.status === 401 && !e?.message) {
      (err.error as unknown) = Object.assign(err.error, {
        message: ERROR_PERMISSION.message,
        code: ERROR_PERMISSION.code,
      });
    } else if (!e?.message) {
      (err.error as unknown) = Object.assign(err.error, {
        message: UNEXPECTED_ERROR.message,
        code: UNEXPECTED_ERROR.code,
      });
    }

    if (err?.error instanceof Blob) {
      const er = await (err.error as Blob).text();
      e = this.parseJsonString(er) || e;
    }

    if (err.status === 401 && e?.sec === 201) {
      from(this._handle401Error(request, next, err));
    }

    return throwError(e);
  }

  protected async _handle401Error(
    request: HttpRequest<unknown>,
    next: HttpHandler,
    err: HttpErrorResponse
  ) {
    let e = err ? err?.error : err;
    if (err?.error instanceof Blob) {
      const er = await (err.error as Blob).text();
      e = this.parseJsonString(er) || e;
    }

    return throwError(e);
  }

  private parseJsonString(str: string) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return false;
    }
  }
}