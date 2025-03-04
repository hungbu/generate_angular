import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiService } from '../../service/api.service';
import { FileUploadComponent } from '../../../shared/upload/upload.component';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FileUploadComponent,
  ],
  providers: [TranslateService],
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent {
  productForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(0),
    categoryId: new FormControl(''),
  });

  constructor(private apiService: ApiService) {}

  onSubmit(): void {
    const formData = this.productForm.value;
    this.apiService.createProduct(formData).subscribe({
      next: () => {
        alert('Product added successfully!');
        this.productForm.reset();
      },
      error: (err) => {
        console.error('Failed to add product:', err);
      },
    });
  }
}