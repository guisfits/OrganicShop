import { ProductService } from "./../../product.service";
import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../../category.service";
import { Router } from "@angular/router";
import "rxjs/add/operator/map";

@Component({
	selector: "app-product-form",
	templateUrl: "./product-form.component.html",
	styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent {
	categories$;
	constructor(
		private router: Router,
		private categoryService: CategoryService,
		private productService: ProductService
	) {
		this.categories$ = this.categoryService.getCategories();
	}

	save(product) {
		this.productService.create(product);
		this.router.navigate(["/admin/products"]);
	}
}
