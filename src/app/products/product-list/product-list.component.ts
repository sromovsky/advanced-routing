import { Observable, EMPTY } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import {FavouriteService, ProductService} from '../../services';
import {Product} from '../product.interface';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {

    get favourites(): number {
        return this.favouriteService.getFavouritesNb();
    }

    constructor(
        private productService: ProductService,
        private favouriteService: FavouriteService,
        private router: Router) { }

    title = 'Products';
    products$: Observable<Product[]>;
    selectedProduct: Product;
    sorter = '-modifiedDate';
    errorMessage: string;

    pageSize = 5;
    start = 0;
    end: number = this.pageSize;
    currentPage = 1;

    message = '';

    firstPage(): void {
        this.start = 0;
        this.end = this.pageSize;
        this.currentPage = 1;
    }

    nextPage(): void {
        this.start += this.pageSize;
        this.end += this.pageSize;
        this.currentPage++;
    }

    previousPage(): void {
        this.start -= this.pageSize;
        this.end -= this.pageSize;
        this.currentPage--;
    }

    loadMore(): void {
        const take: number = this.pageSize * 2;
        const skip: number = this.end + 1;
        this.products$ = this.productService.getMoreProducts(skip, take);
    }

    sortList(propertyName: string): void {
        this.sorter = this.sorter.startsWith('-') ? propertyName : '-' + propertyName;
        this.firstPage();
    }

    onSelect(product: Product): void {
        this.selectedProduct = product;
        this.router.navigateByUrl('/products/' + product.id);
        // this.router.navigateByUrl("/products/" + product.id, { state: product });
    }

    newFavourite(product: Product): void {
        this.message = `Product
                        ${product.name}
                        added to your favourites!`;
    }

    ngOnInit() {
        this.products$ = this
            .productService
            .getProducts()
            .pipe(
                catchError(
                    error => {
                        this.errorMessage = error;
                        return EMPTY;
                    }
                )
            );
    }
}
