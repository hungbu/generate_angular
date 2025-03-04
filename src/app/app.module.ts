import { NgModule, ApplicationRef, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
// Import APP_INITIALIZER and the initialization function
import { APP_INITIALIZER } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';
import { AuthInterceptor } from '../shared/httpClient/auth.interceptor';
import { ServerTranslationLoader } from '../shared/translate/server-translation.loader';
import { routes } from './app.routes';

// Initialization function to set the default language
export function appInitializerFactory(translate: TranslateService) {
  return () => {
    translate.setDefaultLang('en'); // Set default language
    return translate.use('en').toPromise();  // Load and set the language
  };
}

@NgModule({
  declarations: [
    // ProductListComponent  <-- NO!  Standalone components are NOT declared in modules.
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppComponent, // Import standalone component
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new ServerTranslationLoader(http),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    // Use APP_INITIALIZER to load translations before app startup
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService],
      multi: true
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // Provide routes here
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {
  ngDoBootstrap(appRef: ApplicationRef) {
    appRef.bootstrap(AppComponent);
  }
}