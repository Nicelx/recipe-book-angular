import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "./../shared/data-storage.service";
import * as fromApp from "../store/app.reducer";
import { map } from "rxjs/operators";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
	isAuthenticated = false;
	private userSub: Subscription;

	constructor(
		private dataStorageService: DataStorageService,
		private authSercice: AuthService,
		private store: Store<fromApp.AppState>
	) {}

	ngOnInit() {
		this.userSub = this.store
			.select("auth")
			.pipe(map((authState) => authState.user))
			.subscribe((user) => {
				this.isAuthenticated = !!user;
			});
	}

	ngOnDestroy(): void {
		this.userSub.unsubscribe();
	}

	onLogout() {
		this.authSercice.logout();
	}

	onSaveData() {
		this.dataStorageService.storeRecipes();
	}

	onFetchData() {
		this.dataStorageService.fetchRecipes().subscribe();
	}
}
