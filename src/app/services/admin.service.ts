import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class AdminService {

    constructor(private http: HttpClient) { }

    private baseUrl = 'http://your_rest_api.net/api/profile';
    private storageKey = 'auth_token';

    getProfile(): Observable<string> {

        const authToken = localStorage.getItem(this.storageKey);
        const headers = {Authorization: `Bearer ${authToken}` };

        if (environment.demo) {

            // Demo mode
            return of('Secured info!');

        } else {

            // Real server call here!
            return this
                .http
                .get<string>(this.baseUrl, { headers });
        }
    }

}
