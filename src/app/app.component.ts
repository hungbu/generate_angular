import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'upload-angular';

  constructor(private translate: TranslateService) {
    // Set the default language
    this.translate.setDefaultLang('en');
  }

  onUploadComplete(files: File[]): void {
    console.log('Uploaded files:', files);
  }
}
