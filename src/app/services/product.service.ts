
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { flatMap, first, catchError, shareReplay, switchMap, delay } from 'rxjs/operators';
import { config } from '../../environments/environment';
import {Product} from '../products/product.interface';

@Injectable()
export class ProductService {

    private baseUrl: string = config.apiUrl;

    private products$: Observable<Product[]>;

    constructor(private http: HttpClient) { }

    deleteProduct(id: number): Observable<any> {
        return this.http
            .delete(`${this.baseUrl}${id}`); // Delete product from the server
    }

    insertProduct(newProduct: Product): Observable<Product> {
        return this.http
            .post<Product>(this.baseUrl, newProduct);
    }

    getProductById(id: number): Observable<Product> {
        return this
            .getProducts()
            .pipe(
                flatMap(products => products),
                first(product => product.id === id),
                catchError(this.handleError)
            );
    }

    getProducts(skip: number = 0, take: number = 10): Observable<Product[]> {

        const url: string = this.baseUrl + `?$skip=${skip}&$top=${take}&$orderby=ModifiedDate%20desc`;

        if (!this.products$) {
            this.products$ = this.http
                .get<any>(url)
                .pipe(
                    delay(2000),
                    shareReplay(),
                    catchError(this.handleError)
                );
        }
        return this.products$;
    }

    getMoreProducts(skip: number = 0, take: number = 10): Observable<Product[]> {
        const url: string = this.baseUrl + `?$skip=${skip}&$top=${take}&$orderby=ModifiedDate%20desc`;

        const combine$: Observable<Product[]> =
            this.products$.pipe(switchMap(
                () => this.http.get<Product[]>(url).pipe(shareReplay()),
                (currentProducts, moreProducts) => currentProducts.concat(moreProducts)
            ));
        this.products$ = combine$.pipe(shareReplay());

        return this.products$;
    }

    clearCache() {
        this.products$ = null;
    }

    private handleError(errorResponse: HttpErrorResponse) {
        // in a real world app, you may send the error to the server using some remote logging infrastructure
        // instead of just logging it to the console
        let errorMsg: string;
        if (errorResponse.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMsg = 'An error occurred:' + errorResponse.error.message;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            errorMsg = `Backend returned code ${errorResponse.status}, body was: ${errorResponse.error}`;
        }
        console.error(errorMsg);
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    }
}
