import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CustomFormsModule } from 'ng2-validation';

import { environment } from '../environments/environment';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AppComponent } from './app.component';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { CategoryService } from './category.service';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductService } from './product.service';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UserService } from './user.service';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';

@NgModule({
	declarations: [
		AppComponent,
		BsNavbarComponent,
		HomeComponent,
		ProductsComponent,
		ShoppingCartComponent,
		CheckOutComponent,
		OrderSuccessComponent,
		MyOrdersComponent,
		AdminProductsComponent,
		AdminOrdersComponent,
		LoginComponent,
		ProductFormComponent,
		ProductFilterComponent,
		ProductCardComponent
	],
	imports: [
		FormsModule,
		BrowserModule,
		CustomFormsModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireAuthModule,
		AngularFireDatabaseModule,
		NgbModule.forRoot(),
		RouterModule.forRoot([
			{
				path: "",
				component: ProductsComponent
			},
			{
				path: "products",
				component: ProductsComponent
			},
			{
				path: "shopping-cart",
				component: ShoppingCartComponent
			},
			{
				path: "login",
				component: LoginComponent
			},
			{
				path: "check-out",
				component: CheckOutComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: "order-success",
				component: OrderSuccessComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: "my/orders",
				component: MyOrdersComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: "admin/products/new",
				component: ProductFormComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: "admin/products/:id",
				component: ProductFormComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: "admin/products",
				component: AdminProductsComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: "admin/orders",
				component: AdminOrdersComponent,
				canActivate: [AuthGuardService]
			}
		])
	],
	providers: [
		AuthService,
		AuthGuardService,
		AdminAuthGuardService,
		UserService,
		CategoryService,
		ProductService
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
