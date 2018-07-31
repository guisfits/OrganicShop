import { ProductService } from "./../../product.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
	selector: "app-admin-products",
	templateUrl: "./admin-products.component.html",
	styleUrls: ["./admin-products.component.css"]
})
export class AdminProductsComponent implements OnInit, OnDestroy {
	products: any[];
	filteredProducts: any[];
	subscription: Subscription;

	constructor(private productService: ProductService) {}

	ngOnInit() {
		this.subscription = this.productService
			.list()
			.map(changes => {
				return changes.map(c => ({
					key: c.payload.key,
					category: c.payload.val().category,
					imageUrl: c.payload.val().imageUrl,
					price: c.payload.val().price,
					title: c.payload.val().title
				}));
			})
			.subscribe(prod => {
				this.products = this.filteredProducts = prod;
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
