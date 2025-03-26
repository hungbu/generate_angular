import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select'; // Import MatSelectChange
import { TranslateModule } from '@ngx-translate/core';

@Component({
    imports: [CommonModule, MatSelectModule, MatIcon, MatButtonModule, TranslateModule],
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit {

  @Input() meta: any;  // Input for metadata
  @Output() pageChanged = new EventEmitter<number>(); // Output event for page changes
  @Output() perPageChanged = new EventEmitter<number>(); // Output event for per page changes.

  perPage: number = 20; // Default per page value

  constructor() { }

  ngOnInit(): void {
    if (this.meta && this.meta.per_page) {
       this.perPage = this.meta.per_page;
    }
  }

  loadPage(page: number | null): void {
    if (page !== null && page !== undefined) { // Important null check!
      this.pageChanged.emit(page);
    }
  }

  changePerPage(newPerPage: number): void {
    this.perPageChanged.emit(newPerPage);
  }

  //  Create an array of page numbers for *ngFor.  Much cleaner than [].constructor()
  getPages(): number[] {
    if (!this.meta) {
      return [];
    }
    return Array.from({ length: this.meta.last_page }, (_, i) => i + 1);
  }

  //Added to prevent error in console
  trackByFn(index: number, item: any): any {
    return item; // Or, if 'item' has an ID:  return item.id;
  }
}