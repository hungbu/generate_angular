import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http';
import { FileUploadService } from './file-upload.service';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class FileUploadComponent {
  files: File[] = [];
  uploadProgress: { [key: string]: number } = {};
  isDragging = false;
  fileControl = new FormControl<File[]>([]);
  @Output() uploadComplete = new EventEmitter<File[]>();

  constructor(private uploadService: FileUploadService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.addFiles(Array.from(input.files));
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer?.files) {
      this.addFiles(Array.from(event.dataTransfer.files));
    }
  }

  private addFiles(files: File[]): void {
    this.files = [...this.files, ...files];
    this.fileControl.setValue(this.files);
  }

  removeFile(file: File): void {
    this.files = this.files.filter(f => f.name !== file.name);
    this.fileControl.setValue(this.files);
  }

  uploadFiles(): void {
    this.files.forEach(file => {
      if (!this.uploadProgress[file.name]) {
        const formData = new FormData();
        formData.append('file', file);
        this.uploadService.upload(formData)
          .pipe(
            finalize(() => {
              delete this.uploadProgress[file.name];
              this.fileControl.setValue(this.files);
            })
          )
          .subscribe({
            next: (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.uploadProgress[file.name] = Math.round(100 * event.loaded / event.total);
              }
            },
            error: (error) => {
              console.error('Upload failed:', error);
              delete this.uploadProgress[file.name];
            }
          });
      }
    });
  }

  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}