import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID, TransferState} from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { makeStateKey } from '@angular/core';
import { ERROR_PERMISSION, UNEXPECTED_ERROR } from '../define/constant';
import { environment } from '../../environments/environment';

// Define a state key for storing the session token
const SESSION_TOKEN_KEY = makeStateKey<string>('sessionToken');

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private transferState: TransferState
  ) {
    // Check if the current platform is the browser
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const url = environment.apiUrl;
    console.log('APIUrl', url);

    // Retrieve the session token from TransferState or localStorage
    let sessionToken: string | null = null;
    if (this.isBrowser) {
      // On the browser, use localStorage
      sessionToken = localStorage.getItem('sessionToken');
    } else {
      // On the server, use TransferState
      sessionToken = this.transferState.get<string>(SESSION_TOKEN_KEY, '');
    }

    // Add Authorization header if sessionToken exists
    if (sessionToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });
    }

    // Prepend API base URL to the request URL
    request = request.clone({
      url: url + request.url,
    });

    // Handle the HTTP request and catch errors
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        return this._handleError(request, next, err);
      })
    );
  }

  protected _handleError(
    request: HttpRequest<unknown>,
    next: HttpHandler,
    err: HttpErrorResponse
  ): Observable<never> {
    let e = err?.error ? err.error : err;

    // Handle 401 Unauthorized errors
    if (err.status === 401 && !e?.message) {
      (err.error as unknown) = Object.assign(err.error, {
        message: ERROR_PERMISSION.message,
        code: ERROR_PERMISSION.code,
      });
    } else if (!e?.message) {
      // Handle unexpected errors
      (err.error as unknown) = Object.assign(err.error, {
        message: UNEXPECTED_ERROR.message,
        code: UNEXPECTED_ERROR.code,
      });
    }

    // Handle Blob responses
    if (err?.error instanceof Blob) {
      const blobText = err.error.text();
      blobText.then((text) => {
        e = this.parseJsonString(text) || e;
      });
    }

    // Handle specific 401 errors with custom logic
    if (err.status === 401 && e?.sec === 201) {
      return this._handle401Error(request, next, err);
    }

    return throwError(() => e);
  }

  protected _handle401Error(
    request: HttpRequest<unknown>,
    next: HttpHandler,
    err: HttpErrorResponse
  ): Observable<never> {
    let e = err?.error ? err.error : err;

    // Handle Blob responses for 401 errors
    if (err?.error instanceof Blob) {
      const blobText = err.error.text();
      blobText.then((text) => {
        e = this.parseJsonString(text) || e;
      });
    }

    return throwError(() => e);
  }

  private parseJsonString(str: string): any {
    try {
      return JSON.parse(str);
    } catch (e) {
      return false;
    }
  }
}