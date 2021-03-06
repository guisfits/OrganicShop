import { Component, Input } from '@angular/core';

import { Product } from '../models/product';

@Component({
	// tslint:disable-next-line:component-selector
	selector: "product-card",
	templateUrl: "./product-card.component.html",
	styleUrls: ["./product-card.component.css"]
})
export class ProductCardComponent {
	@Input("product") product: Product;
	// tslint:disable-next-line:no-input-rename
	@Input("show-actions") showActions: boolean;

	constructor() {}
}
