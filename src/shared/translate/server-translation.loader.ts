import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ServerTranslationLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    const apiUrl = environment.apiUrl;
    return this.http.get(`${apiUrl}/translations/${lang}.json`);
  }
}