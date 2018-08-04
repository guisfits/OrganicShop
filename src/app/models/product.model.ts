import { AngularFireAction } from 'angularfire2/database';
import { DataSnapshot } from 'angularfire2/database/interfaces';

import { Product } from './product';

export class ProductModel implements Product {
	key: string;
	title: string;
	price: number;
	category: string;
	imageUrl: string;

	mapFromDataSnapshot(product: AngularFireAction<DataSnapshot>): Product {
		this.key = product.key;
		this.title = product.payload.val().title;
		this.price = product.payload.val().price;
		this.category = product.payload.val().category;
		this.imageUrl = product.payload.val().imageUrl;

		return this;
	}
}
