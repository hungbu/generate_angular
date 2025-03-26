import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, HostListener, ElementRef } from '@angular/core'; // Added HostListener, ElementRef
import { MatButtonModule } from '@angular/material/button'; // Keep for prev/next buttons
//import { MatIcon } from '@angular/material/icon';         // Keep for prev/next icons
// Remove MatSelectModule if no longer needed elsewhere
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  imports: [CommonModule, MatButtonModule, TranslateModule], // Removed MatSelectModule
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {

  @Input() meta: any;
  @Input({ required: true }) maxVisiblePages: number = 7;
  @Output() pageChanged = new EventEmitter<number>();
  @Output() perPageChanged = new EventEmitter<number>();

  perPage: number = 20; // Default, will be overridden
  perPageOptions: number[] = [5, 10, 20, 50, 100]; // Define options here
  isPerPageDropdownOpen = false; // State for the custom dropdown

  constructor(private elementRef: ElementRef) { } // Inject ElementRef

  // Close dropdown if clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isPerPageDropdownOpen = false;
    }
  }

  ngOnInit(): void {
    if (this.meta && this.meta.per_page) {
       this.perPage = this.meta.per_page;
    }
  }

  get pages(): (number | string)[] {
    // ... (keep the existing pages getter logic from the previous answer)
    if (!this.meta || this.meta.last_page <= 1) return [];
    const currentPage = this.meta.current_page;
    const totalPages = this.meta.last_page;
    const maxVisible = this.maxVisiblePages;
    if (totalPages <= maxVisible) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const firstPage = 1;
    const lastPage = totalPages;
    const pagesToShow: (number | string)[] = [];
    pagesToShow.push(firstPage);
    let startMiddle: number, endMiddle: number;
    if (currentPage <= Math.ceil(maxVisible / 2)) {
        startMiddle = 2; endMiddle = maxVisible - 2;
    } else if (currentPage >= totalPages - Math.floor(maxVisible / 2) + 1) {
        startMiddle = totalPages - maxVisible + 3; endMiddle = totalPages - 1;
    } else {
        const middleSpread = Math.floor((maxVisible - 4) / 2);
        startMiddle = currentPage - middleSpread; endMiddle = currentPage + middleSpread;
        if ((maxVisible-4) % 2 !== 0) endMiddle++;
    }
    if (startMiddle > 2) pagesToShow.push('...');
    for (let i = startMiddle; i <= endMiddle; i++) { if (i > firstPage && i < lastPage) pagesToShow.push(i); }
    if (endMiddle < totalPages - 1) pagesToShow.push('...');
    pagesToShow.push(lastPage);
    return pagesToShow;
  }

  loadPage(page: number | null): void {
    if (page !== null && page !== undefined && page >= 1 && page <= this.meta?.last_page) {
      this.pageChanged.emit(page);
    }
  }

  togglePerPageDropdown(): void {
    this.isPerPageDropdownOpen = !this.isPerPageDropdownOpen;
  }

  selectPerPage(newPerPage: number): void {
    if (this.perPage !== newPerPage) {
      this.perPage = newPerPage;
      this.perPageChanged.emit(newPerPage);
      // Conventionally, reset to page 1 when changing items per page
      // this.loadPage(1); // Let parent component handle this if preferred
    }
    this.isPerPageDropdownOpen = false; // Close dropdown after selection
  }
  // --- End Methods for Custom Dropdown ---


  trackByFn(index: number, item: any): any {
    return index;
  }

  isNumber(item: number | string): item is number {
    return typeof item === 'number';
  }
}