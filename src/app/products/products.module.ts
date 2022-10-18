import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { OrderBy } from './orderBy.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductInsertComponent } from './product-insert/product-insert.component';
import {FavouriteService, ProductService} from '../services';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ProductsRoutingModule
    ],
    exports: [ProductListComponent],
    declarations: [
        ProductsComponent,
        ProductDetailComponent,
        ProductListComponent,
        OrderBy,
        ProductInsertComponent
    ],
    providers: [ProductService, FavouriteService],
})
export class ProductsModule { }
