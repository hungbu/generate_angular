import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CommonListComponent } from '../../../shared/compoment/list/common-list.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  imports: [CommonListComponent]
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  links: any = {};
  meta: any = { links: {} }; // Initialize meta.links to avoid undefined errors

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(page: number = 1, perPage: number = 10): void {
    this.apiService.getProducts(page, { perPage }).subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.data)) {
          this.products = response.data;
          this.links = response.links;
          this.meta = response.meta;
        } else {
          console.warn('Unexpected API response:', response);
          this.products = [];
        }
      },
      error: (err) => {
        console.error('Failed to fetch products:', err);
      },
    });
  }

  handleEdit(product: any): void {
    console.log('Editing product:', product);
  }

  handleDelete(product: any): void {
    console.log('Deleting product:', product);
  }

  handleSearch(searchTerm: string): void {
    console.log('Searching for products:', searchTerm);
    // You can integrate the search with the API if needed.
  }

  handlePageChange(page: number): void {
    this.fetchProducts(page, this.meta.per_page);
  }

  handlePerPageChange(perPage: number): void {
    this.fetchProducts(1, perPage);
  }
}
