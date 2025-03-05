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

  currentPage: number = 1;
  perPage: number = 10;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(page: number = 1, perPage: number = this.perPage): void {
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

  onPageChanged(page: number): void {
    this.loadProducts(page);
  }

  onPerPageChanged(perPage: number): void {
    //reset current page to 1
    this.currentPage = 1;
    this.loadProducts(this.currentPage, perPage)
  }
}
