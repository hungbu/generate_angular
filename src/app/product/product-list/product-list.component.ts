import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../service/api.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, TranslateModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [TranslateService] // Add this line
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  links: any = {};
  meta: any = {};

  constructor(
    private apiService: ApiService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    this.fetchProducts(1);
  }

  fetchProducts(page: number = 1): void {
    this.apiService.getProducts(page).subscribe({
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

  loadPage(url: string | null): void {
    if (!url) return;
    const pageNumber = new URL(url).searchParams.get('page');
    if (pageNumber) {
      this.fetchProducts(Number(pageNumber));
    }
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
  }
}