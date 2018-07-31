import { ProductService } from "./../../product.service";
import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../../category.service";
import { Router, ActivatedRoute } from "@angular/router";
import "rxjs/add/operator/map";
import "rxjs/add/operator/take";
import { THROW_IF_NOT_FOUND } from "@angular/core/src/di/injector";

@Component({
	selector: "app-product-form",
	templateUrl: "./product-form.component.html",
	styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit {
	categories$;
	id;
	product = {};

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private categoryService: CategoryService,
		private productService: ProductService
	) {}

	ngOnInit(): void {
		this.categories$ = this.categoryService.getCategories().map(cat => {
			return cat.map(c => ({
				key: c.payload.key,
				value: c.payload.val()
			}));
		});

		this.id = this.route.snapshot.paramMap.get("id");
		if (this.id) {
			this.productService
				.get(this.id)
				.take(1)
				.subscribe(p => (this.product = p));
		}
	}

	save(product) {
		if (this.id) {
			this.productService.update(this.id, product);
		} else {
			this.productService.create(product);
		}
		this.router.navigate(["/admin/products"]);
	}

	delete() {
		if (!confirm("Are you sure you want to delete this product?")) {
			return;
		}

		this.productService.delete(this.id);
		this.router.navigate(["/admin/products"]);
	}
}
