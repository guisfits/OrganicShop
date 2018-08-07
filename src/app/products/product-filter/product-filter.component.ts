import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { CategoryService } from '../../category.service';

@Component({
	// tslint:disable-next-line:component-selector
	selector: "product-filter",
	templateUrl: "./product-filter.component.html",
	styleUrls: ["./product-filter.component.css"]
})
export class ProductFilterComponent implements OnInit {
	categories;
	@Input("category") category: string;

	constructor(private categoryService: CategoryService) {}

	ngOnInit() {
		this.categoryService
			.list()
			.pipe(
				map(cat =>
					cat.map(c => <any>{ value: c.payload.val(), key: c.key })
				)
			)
			.subscribe(categ => (this.categories = categ));
	}
}
