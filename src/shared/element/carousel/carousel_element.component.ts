import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-carousel-element',
    templateUrl: './carousel_element.component.html',
})
export class CarouselElementComponent {
    @Input() images: string[] = [];
    currentIndex: number = 0;

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    }
}