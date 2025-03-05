import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-dropdown-element',
    templateUrl: './dropdown_element.component.html',
})
export class DropdownElementComponent {
    @Input() options: string[] = [];
    @Input() selectedOption: string = '';
    openDropDown: boolean = false;

    onSelect(option: string) {
        this.selectedOption = option;
    }

    toggleDropDown() {
        // Implement dropdown toggle logic here
    }
}