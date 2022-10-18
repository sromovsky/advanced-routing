import { Observable } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FavouriteService, ProductService} from '../../services';
import {Product} from '../product.interface';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {

    @Input() product: Product;
    product$: Observable<Product>;

    @Output() favouriteAdded = new EventEmitter<Product>();

    constructor(
        private favouriteService: FavouriteService,
        private productService: ProductService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    deleteProduct(id: number) {
        if (window.confirm('Are you sure to delete this product ?')) {
            this.productService
                .deleteProduct(id)
                .subscribe(
                    () => {
                        console.log('Product deleted.');
                        this.productService.clearCache();
                        this.router.navigateByUrl('/products');
                    },
                    error => console.log('Could not delete product. ' + error),
                    () => console.log('Delete Product Complete.')
                );
        }
    }

    addToFavourites(product: Product) {
        this.favouriteAdded.emit(product);
        this.favouriteService.addToFavourites(product);
    }

    ngOnInit() {
        const id = this.route.snapshot.params.id;
        if (id) {
            this.product$ = this.productService.getProductById(id);
        }
    }

}
