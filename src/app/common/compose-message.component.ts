import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './compose-message.component.html',
    styles: [ ':host { position: absolute; top: 10%; right: 10%; background-color: #EDF8D3; padding: 20px; display: block }' ]
})
export class ComposeMessageComponent {

    details: string;
    sending = false;
    message = '';

    constructor(private router: Router) {}

    send() {
        this.sending = true;
        this.details = 'Sending Message...';

        setTimeout(() => {
            this.sending = false;
            this.clearSideOutlet();
        }, 1000);
    }

    cancel() {
        this.clearSideOutlet();
    }

    clearSideOutlet() {
        // Providing a `null` value to the named outlet
        // clears the contents of the named outlet
        this.router.navigate([{ outlets: { side: null }}]);
    }
}
