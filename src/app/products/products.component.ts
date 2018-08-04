import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../models/product';
import { ProductModel } from '../models/product.model';
import { ProductService } from '../product.service';
import { CategoryService } from './../category.service';

@Component({
	selector: "app-products",
	templateUrl: "./products.component.html",
	styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit, OnDestroy {
	products: Product[];
	filteredProducts: Product[];
	categories;
	category: string;

	categorySubscription: Subscription;
	productSubscription: Subscription;

	constructor(
		private productService: ProductService,
		private categoryService: CategoryService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.productSubscription = this.productService
			.list()
			.pipe(
				map(prod =>
					prod.map(p => new ProductModel().mapFromDataSnapshot(p))
				)
			)
			.subscribe(p => (this.products = this.filteredProducts = p));

		this.categorySubscription = this.categoryService
			.list()
			.pipe(
				map(cat =>
					cat.map(c => <any>{ value: c.payload.val(), key: c.key })
				)
			)
			.subscribe(categ => (this.categories = categ));

		this.route.queryParamMap.subscribe(params => {
			this.category = params.get("category");

			this.filteredProducts = this.category
				? this.products.filter(p => p.category === this.category)
				: this.products;
		});
	}

	ngOnDestroy(): void {
		this.categorySubscription.unsubscribe();
		this.productSubscription.unsubscribe();
	}
}
