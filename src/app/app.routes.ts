import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { CategoryComponent } from './category/category.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { AppComponent } from './app.component';

// Define application routes
export const appRoutes: Routes = [
  { path: '', component: AppComponent },
  // ...add more routes here...
];

export const routes: Routes = [
    {
      path: 'admin',
      component: AdminLayoutComponent, // Parent layout component
      children: [
        { path: 'categories', component: CategoryComponent },
        { path: 'products', component: ProductListComponent },
        { path: 'add-product', component: ProductAddComponent },
      ],
    },
    { path: '', redirectTo: '/admin/products', pathMatch: 'full' }, // Default route
    { path: '**', redirectTo: '/admin/products' }, // Wildcard route
  ];