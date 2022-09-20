import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "./../shared/data-storage.service";
import { Subscription } from 'rxjs';

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
	isAuthenticated = false;
	private userSub : Subscription;

	constructor(private dataStorageService: DataStorageService, private authSercice: AuthService) {}

	ngOnInit() {
		this.userSub =this.authSercice.user.subscribe(user => {
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
