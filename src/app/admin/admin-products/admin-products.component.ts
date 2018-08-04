import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from './../../models/product';
import { ProductService } from './../../product.service';

@Component({
	selector: "app-admin-products",
	templateUrl: "./admin-products.component.html",
	styleUrls: ["./admin-products.component.css"]
})
export class AdminProductsComponent implements OnInit, OnDestroy {
	products: Product[];
	filteredProducts: Product[];
	subscription: Subscription;

	constructor(private productService: ProductService) {}

	ngOnInit() {
		this.subscription = this.productService
			.list()
			.pipe(
				map(changes => {
					return changes.map(c => ({
						key: c.payload.key,
						value: <any>c.payload.val()
					}));
				})
			)
			.subscribe(prod => {
				this.products = this.filteredProducts = prod.map(p => {
					return <Product>{
						key: p.key,
						category: p.value.category,
						imageUrl: p.value.imageUrl,
						price: p.value.price,
						title: p.value.title
					};
				});
			});
	}

	filter(query: string) {
		this.filteredProducts = query
			? this.products.filter(p =>
					p.title.toLowerCase().includes(query.toLowerCase())
			  )
			: this.products;
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
