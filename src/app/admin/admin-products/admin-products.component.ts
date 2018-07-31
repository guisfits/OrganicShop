import { ProductService } from "./../../product.service";
import { Component, OnInit } from "@angular/core";
import { timingSafeEqual } from "crypto";

@Component({
	selector: "app-admin-products",
	templateUrl: "./admin-products.component.html",
	styleUrls: ["./admin-products.component.css"]
})
export class AdminProductsComponent implements OnInit {
	products$;
	constructor(private productService: ProductService) {}

	ngOnInit() {
		this.products$ = this.productService.getAll().map(changes => {
			return changes.map(c => ({
				key: c.payload.key,
				value: c.payload.val()
			}));
		});

		console.log(this.products$);
	}
}
