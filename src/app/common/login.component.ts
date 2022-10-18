import { Router } from '@angular/router';
import { Component, ViewChild, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService} from '../services';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit, OnInit {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }
    error = '';

    @ViewChild('username') myInput: ElementRef;

    loginUser(form: NgForm) {
        if (form.valid) {
            this.authService
                .login(form.value.username, form.value.password)
                .subscribe(
                    result => {
                        if (result) {
                            this.router.navigateByUrl('/admin');
                        } else {
                            this.error = 'Invalid username or password!';
                        }
                    }
                );
        }
    }

    ngAfterViewInit(): void {
        this.setFocus();
    }

    setFocus() {
        this.myInput.nativeElement.focus();
    }

    ngOnInit() {
    }
}
