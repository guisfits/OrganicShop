import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
	providedIn: "root"
})
export class ProductService {
	constructor(private db: AngularFireDatabase) {}

	list() {
		return this.db.list("/products").snapshotChanges();
	}

	get(productId) {
		return this.db.object("/products/" + productId).valueChanges();
	}

	create(product) {
		return this.db.list("/products").push(product);
	}

	update(productId, product) {
		return this.db.object("/products/" + productId).update(product);
	}

	delete(productId) {
		return this.db.object("/products/" + productId).remove();
	}
}
