import { Component } from '@angular/core';
import {AdminService} from '../services';

@Component({
    templateUrl: './admin.component.html'
})
export class AdminComponent {
    constructor(private adminService: AdminService) { }

    profile = '';

    getProfile() {
        this.adminService
            .getProfile()
            .subscribe(
                response => this.profile = response
            );
    }
}
