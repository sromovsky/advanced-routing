import { Injectable } from '@angular/core';
import {Product} from '../products/product.interface';

@Injectable()
export class FavouriteService {

    constructor() { }

    #favourites: Set<Product> = new Set();

    get favourites(): Set<Product> {
        return this.#favourites;
    }

    addToFavourites(product: Product): void {
        this.#favourites.add(product);
    }

    getFavouritesNb(): number {
        return this.#favourites.size;
    }
}
