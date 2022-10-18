import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {

    message = '';

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.message = this.route.snapshot.queryParams.reason || 'none';
    }
}
