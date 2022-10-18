import { Router} from '@angular/router';
import { Component, OnInit, VERSION } from '@angular/core';
import {AuthService} from './services';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Angular Store';
    version = VERSION.full;

    constructor(
        private authService: AuthService,
        private router: Router) {

    }

    get isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }

    login() {
        this.router.navigateByUrl('/login').then();
    }

    logout() {
        this.authService.logout();
        this.router.navigateByUrl('/home').then();
    }

    ngOnInit() {
    }
}
