import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { PaginationComponent } from "./pagination/pagination.component";

@Component({
  selector: 'app-common-list',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatButtonModule, TranslateModule,
    MatTableModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatPaginatorModule, MatIconModule,
    PaginationComponent
  ],
  templateUrl: './common-list.component.html',
  providers: [CurrencyPipe]
})
export class CommonListComponent implements OnInit {
  @Input() title: string = 'title';
  @Input() data: any[] = [];
  @Input() links: any = {};
  @Input() meta: any = {};
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onSearch = new EventEmitter<string>();
  @Output() onPageChange = new EventEmitter<number>();
  @Output() onPerPageChange = new EventEmitter<number>();
  displayedColumns: string[] = ['name', 'description', 'price', 'actions'];
  
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  search(event: any): void {
    const searchTerm = event.target.value;
    this.onSearch.emit(searchTerm);
  }

  loadPage(pageNumber: number): void {
    this.onPageChange.emit(pageNumber);
  }

  perPageChanged(value: number): void {
    this.onPerPageChange.emit(value);
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
  }

  edit(item: any): void {
    this.onEdit.emit(item);
  }

  delete(item: any): void {
    this.onDelete.emit(item);
  }
}