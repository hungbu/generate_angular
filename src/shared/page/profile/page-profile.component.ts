import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-page-profile',
    templateUrl: './page-profile.component.html',
})
export class PageProfileComponent implements OnInit {
    isProfileInfoModal = false;
    isProfilePasswordModal = false;
    isProfileAddressModal = false;

    constructor() { }

    ngOnInit(): void {
    }

    // Helper functions to manage modal visibility.  Good practice for cleaner template.
    openProfileInfoModal() {
        this.isProfileInfoModal = true;
    }

    closeProfileInfoModal() {
        this.isProfileInfoModal = false;
    }
    openProfileAddressModal() {
        this.isProfileAddressModal = true;
    }
    closeProfileAddressModal() {
        this.isProfileAddressModal = false;
    }
    // You might have open/close for the password modal too, if you implement it.

}