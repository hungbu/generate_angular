import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileUploadComponent } from '../shared/upload/upload.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FileUploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'upload-angular';

  onUploadComplete(files: File[]): void {
    console.log('Uploaded files:', files);
  }
}
