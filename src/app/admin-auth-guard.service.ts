import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { CanActivate } from "@angular/router";
import { UserService } from "./user.service";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";

@Injectable()
export class AdminAuthGuardService implements CanActivate {
	constructor(private auth: AuthService, private userService: UserService) {}

	canActivate(): Observable<boolean> {
		return this.auth.user$.map(appuser => true);
	}
}
