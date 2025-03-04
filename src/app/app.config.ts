import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AuthInterceptor } from '../shared/httpClient/auth.interceptor';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { ServerTranslationLoader } from '../shared/translate/server-translation.loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // Provide routes here
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: TranslateLoader,
      useFactory: (http: HttpClient) => new ServerTranslationLoader(http),
      deps: [HttpClient]
    },
    TranslateService // Provide TranslateService globally
  ],
};